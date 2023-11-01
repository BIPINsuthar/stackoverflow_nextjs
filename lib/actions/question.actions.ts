"use server";
import { connectToDatabase } from "../mongoose";

import * as Models from "../model";

import { revalidatePath } from "next/cache";
import { HomePageFilter, Question } from "@/types/shared";
import console from "console";

export async function getHotQuestions() {
  try {
    connectToDatabase();
    const hotQuestions = await Models.Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return hotQuestions as Question[];
  } catch (error) {
    throw error;
  }
}

export async function getAllQuestion(params: {
  searchQuery: string;
  filter: HomePageFilter;
  pageNo: string;
}) {
  try {
    connectToDatabase();

    const { searchQuery, filter, pageNo } = params;

    const pageSize = 10;

    const skip = (parseInt(pageNo) - 1) * pageSize;

    let query = {};
    let sort = {};

    switch (filter) {
      case "newest":
        sort = { createdAt: -1 };
        break;
      case "frequent":
        sort = { views: -1 };
        break;
      case "unanswered":
        query = {
          answers: { $size: 0 },
        };
        break;
      default:
        break;
    }

    query = {
      ...query,
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ],
    };

    const questions = await Models.Question.find(query)
      .populate({
        path: "tags",
        model: Models.Tag,
      })
      .populate({
        path: "author",
        model: Models.User,
      })
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    const totalQuestions = await Models.Question.countDocuments(query);

    const hasNextPage = skip + questions.length < totalQuestions;

    return {
      questions,
      totalQuestions: totalQuestions,
      isNext: hasNextPage,
    } as {
      questions: Question[];
      totalQuestions: number;
      isNext: boolean;
    };
  } catch (error) {
    console.log("error while questions data", error);
  }
}

export async function createQuestion(params: {
  title: string;
  content: string;
  tags: string[];
  author: string;
  path: string;
}) {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;

    const question = await Models.Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    //create or find tag and push questionId into tag modal
    for (const tag of tags) {
      const existingTag = await Models.Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: {
            questions: question._id,
          },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    }

    await Models.Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log("creating question", error);
  }
}
export async function updateQuestion(params: {
  questionId: string;
  updateData: Partial<{
    title: string;
    content: string;
    tags: string[];
  }>;
  path: string;
}) {
  try {
    connectToDatabase();
    const { questionId, updateData, path } = params;
    await Models.Question.findByIdAndUpdate(questionId, {
      ...updateData,
      tags: undefined,
    });
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
export async function getQuestionById(questionId: string) {
  try {
    const question = (await Models.Question.findById(questionId)
      .populate({
        path: "tags",
        model: Models.Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: Models.User,
        select: "_id clerkId name picture",
      })) as Question;

    return question;
  } catch (error) {
    console.log("error while getQuestionByid", error);
    throw error;
  }
}

export async function upvoteQuestions(params: {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) {
  try {
    connectToDatabase();
    const { hasdownVoted, hasupVoted, questionId, userId, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      //if already upvoted then remove
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      //if downVoted then remove from the downvotes list and add to upvotes list
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      //if yet not voted then add to upvotes list
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Models.Question.findByIdAndUpdate(
      questionId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!question) throw new Error("Question not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function downvoteQuestions(params: {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) {
  try {
    connectToDatabase();
    const { hasdownVoted, hasupVoted, questionId, userId, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      //if already downvoted then remove
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      //if downVoted then remove from the downvotes list and add to upvotes list
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      //if yet not voted then add to upvotes list
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Models.Question.findByIdAndUpdate(
      questionId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!question) throw new Error("Question not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getUserQuestions(params: {
  userId: string;
  page: number;
  pageSize: number;
}) {
  try {
    const { userId, page = 1, pageSize = 10 } = params;
    connectToDatabase();

    const userQuestionsList = await Models.Question.find({
      author: userId,
    })
      .sort({ views: -1, upvotes: -1 })
      .populate({
        path: "author",
        model: Models.User,
        select: "_id clerkId name picture",
      })
      .populate({
        path: "tags",
        model: Models.Tag,
        select: "_id name",
      });

    return { questions: userQuestionsList } as { questions: Question[] };
  } catch (error) {
    throw error;
  }
}

export async function deleteQuestion(params: {
  questionId: string;
  path: string;
}) {
  try {
    connectToDatabase();
    const { questionId, path } = params;

    await Models.Question.findByIdAndDelete(questionId);
    await Models.Answer.deleteMany({
      question: questionId,
    });
    await Models.Interaction.deleteMany({
      question: questionId,
    });

    await Models.User.findOneAndUpdate(
      { savedQuestions: { $in: [questionId] } },
      {
        $pull: { savedQuestions: questionId },
      }
    );

    await Models.Tag.updateMany(
      {
        questions: questionId,
      },
      {
        $pull: { questions: questionId },
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log("eror", error);
    throw error;
  }
}
