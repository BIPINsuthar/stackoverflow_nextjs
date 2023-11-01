"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from "../model";
import { revalidatePath } from "next/cache";
import {
  User,
  Question,
  CommunityFilter,
  CollectionFilter,
} from "@/types/shared";

export async function deleteUser(clerkId: string) {
  try {
    connectToDatabase();

    const user = await Models.User.findOneAndDelete({
      clerkId: clerkId,
    });
    if (!user) {
      throw new Error("User not found!");
    }
    const userQuestionsIds = await Models.Question.find({
      author: user._id,
    }).distinct("_id");

    //delete user questions
    await Models.Question.deleteMany({ author: user._id });

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

export async function getUserInfo(userId: string) {
  try {
    connectToDatabase();

    const user = await Models.User.findOne({
      clerkId: userId,
    });

    if (!user) throw new Error("User not found!");

    const totalQuestions = await Models.Question.countDocuments({
      author: user._id,
    });
    const totalAnswers = await Models.Answer.countDocuments({
      author: user._id,
    });

    return { user, totalQuestions, totalAnswers } as {
      user: User;
      totalQuestions: number;
      totalAnswers: number;
    };
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

export async function getAllUsers(params: {
  searchQuery: string;
  filter: CommunityFilter;
}) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    let sortOptions = {};

    switch (filter) {
      case "new user":
        sortOptions = { joinedAt: -1 };
        break;
      case "old user":
        sortOptions = { joinedAt: 1 };
        break;
      case "top contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const query = {
      $or: [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          username: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          email: { $regex: new RegExp(searchQuery, "i") },
        },
      ],
    };

    const allUsers = await Models.User.find(query).sort(sortOptions);

    return allUsers;
  } catch (error) {
    throw error;
  }
}

export async function allSavedQuestions(params: {
  userId: string;
  searchQuery?: string;
  filter: CollectionFilter;
}) {
  try {
    connectToDatabase();

    const { userId, searchQuery, filter } = params;

    let sortOptions = {};

    const query = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    switch (filter) {
      case "most recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most viewed":
        sortOptions = { views: -1 };
        break;
      case "most answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

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
        sort: sortOptions,
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
