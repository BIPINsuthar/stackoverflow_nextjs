"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from "../model";
import { revalidatePath } from "next/cache";
import { User, Question } from "@/types/shared";

export async function deleteUser(clearkId: string) {
  try {
    connectToDatabase();

    const user = await Models.User.findOneAndDelete({
      clearkId: clearkId,
    });
    if (!user) {
      throw new Error("User not found!");
    }
    const userQuestionsIds = await Models.Question.find({
      auther: user._id,
    }).distinct("_id");

    //delete user questions
    await Models.Question.deleteMany({ auther: user._id });

    const deleteUser = await Models.User.findByIdAndDelete(user._id);

    //todo:delete answare as well here using userQuestionId
    return deleteUser;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    connectToDatabase();

    const user = await Models.User.findOne({
      clerkId: userId,
    });

    if (!user) throw new Error("User not found!");

    return user as User;
  } catch (error) {
    throw error;
  }
}

export async function saveQuetion(
  questionId: string,
  userId: string,
  path: string
) {
  try {
    connectToDatabase();

    const user = (await Models.User.findById(userId)) as User;

    if (!user) throw Error("User Not Found!");

    const isQuestionSaved = user.savedQuestions.includes(questionId);

    let updateQuery = {};

    if (isQuestionSaved) {
      updateQuery = { $pull: { savedQuestions: questionId } };
    } else {
      updateQuery = { $addToSet: { savedQuestions: questionId } };
    }

    await Models.User.findByIdAndUpdate(userId, updateQuery, { new: true });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function createUser(userData: Partial<Models.IUser>) {
  try {
    connectToDatabase();
    const newUser = await Models.User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
}

interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<Models.IUser>;
  path: string;
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, path, updateData } = params;

    await Models.User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    connectToDatabase();

    const allUsers = await Models.User.find({}).sort({
      createdAt: -1,
    });

    return allUsers;
  } catch (error) {
    throw error;
  }
}

export async function allSavedQuestions(params: {
  userId: string;
  searchQuery?: string;
}) {
  try {
    connectToDatabase();

    const { userId, searchQuery } = params;

    const query = searchQuery
      ? { title: { $regx: new RegExp(searchQuery, "i") } }
      : {};

    const allSavedQuestions = await Models.User.find(
      {
        clerkId: userId,
      },
      {
        savedQuestions: 1,
        _id: 0,
      }
    ).populate({
      path: "savedQuestions",
      model: Models.Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Models.Tag, select: "_id name" },
        {
          path: "author",
          model: Models.User,
          select: "_id clerkId name picture",
        },
      ],
    });

    return allSavedQuestions[0]?.savedQuestions as Question[] | [];
  } catch (error) {
    throw error;
  }
}
