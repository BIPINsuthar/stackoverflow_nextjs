"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from "../model";
import { revalidatePath } from "next/cache";
import { User, Question } from "@/types/shared";
import {
  AllSavedQuestionsProps,
  CreateUserProps,
  GetAllUserProps,
  UpdateUserParams,
} from "@/types/action";

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

export async function createUser(userData: CreateUserProps) {
  try {
    connectToDatabase();
    const newUser = await Models.User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
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

export async function getAllUsers(params: GetAllUserProps) {
  try {
    connectToDatabase();

    const { searchQuery, filter, pageNo } = params;

    const pageSize = 1;

    const skip = (pageNo - 1) * pageSize;

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

    const allUsers = await Models.User.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalUsers = await Models.User.countDocuments(query);

    const isNext = totalUsers > skip + allUsers.length;

    return { users: allUsers, isNext };
  } catch (error) {
    throw error;
  }
}

export async function allSavedQuestions(params: AllSavedQuestionsProps) {
  try {
    connectToDatabase();

    const { userId, searchQuery, filter, pageNo } = params;

    let sortOptions = {};

    const pageSize = 1;

    const skip = (pageNo - 1) * pageSize;

    const questionQuery = searchQuery
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

    const user = (await Models.User.findOne({ clerkId: userId }).populate({
      path: "savedQuestions",
      model: Models.Question,
      match: questionQuery,
      options: {
        skip: skip,
        limit: pageSize,
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
    })) as User;

    const totalQuestions = await Models.Question.countDocuments({
      author: user._id,
    });

    const isNext = totalQuestions > skip + user.savedQuestions.length;

    return {
      questions: user.savedQuestions,
      totalQuestions: totalQuestions,
      isNext: isNext,
    } as {
      questions: Question[];
      totalQuestions: number;
      isNext: boolean;
    };
  } catch (error) {
    throw error;
  }
}
