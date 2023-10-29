"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from ".././model";
import { Answer } from "@/types/shared";
import { revalidatePath } from "next/cache";
import { getUserById } from ".";

export async function getAllAnswer(questionId: string) {
  try {
    connectToDatabase();
    console.log("question id", questionId);
    const answerList = await Models.Answer.find({
      questionId: questionId,
    })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return answerList as Answer[];
  } catch (error) {
    throw error;
  }
}

export async function createAnswer(params: {
  clerkId: string;
  questionId: string;
  content: string;
  path: string;
}) {
  try {
    connectToDatabase();
    const { content, questionId, clerkId, path } = params;

    const user = await getUserById(clerkId);

    if (!user) throw new Error("User not found!");

    const newAnswer = (await Models.Answer.create({
      author: user._id,
      question: questionId,
      content: content,
    })) as Answer;

    await Models.Question.findByIdAndUpdate(questionId, {
      $push: {
        answers: newAnswer._id,
      },
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function upvoteAnswers(params: {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) {
  try {
    connectToDatabase();
    const { hasdownVoted, hasupVoted, answerId, userId, path } = params;

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

    const question = await Models.Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!question) throw new Error("Answer not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function downvoteAnswers(params: {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}) {
  try {
    connectToDatabase();
    const { hasdownVoted, hasupVoted, answerId, userId, path } = params;

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

    const question = await Models.Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!question) throw new Error("Answer not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
