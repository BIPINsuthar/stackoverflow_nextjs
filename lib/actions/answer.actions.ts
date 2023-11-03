"use server";
import { connectToDatabase } from "../mongoose";
import * as Models from ".././model";
import { Answer, CreateAnswerParams } from "@/types/shared";
import { revalidatePath } from "next/cache";
import { getUserById } from ".";
import {
  DeleteAnswerProps,
  DownvoteAnswerProps,
  GetAllAnswerProps,
  GetUsersAnswerProps,
  UpvoteAnswerProps,
} from "@/types/action";

export async function getAllAnswer(params: GetAllAnswerProps) {
  try {
    connectToDatabase();
    const { filter, questionId } = params;

    let sortOptions = {};

    switch (filter) {
      case "highestupvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestupvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const answerList = await Models.Answer.find({
      question: questionId,
    })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions);

    return answerList as Answer[];
  } catch (error) {
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
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

export async function upvoteAnswers(params: UpvoteAnswerProps) {
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

    const answer = await Models.Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!answer) throw new Error("Answer not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function downvoteAnswers(params: DownvoteAnswerProps) {
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

    const answer = await Models.Answer.findByIdAndUpdate(
      answerId,
      updateQuery,
      {
        new: true,
      }
    );

    if (!answer) throw new Error("Answer not found!");

    //increment auther reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getUserAnswers(params: GetUsersAnswerProps) {
  try {
    const { userId, page = 1, pageSize = 10 } = params;
    connectToDatabase();

    const userAnswersList = await Models.Answer.find({
      author: userId,
    })
      .sort({ upvotes: -1 })
      .populate({
        path: "question",
        model: Models.Question,
        populate: [
          { path: "tags", model: Models.Tag, select: "_id name" },
          {
            path: "author",
            model: Models.User,
            select: "_id clerkId name picture",
          },
        ],
      });

    return { answers: userAnswersList } as { answers: Answer[] };
  } catch (error) {
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerProps) {
  try {
    connectToDatabase();
    const { answerId, path } = params;

    const answer = await Models.Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found!");
    }

    await Models.Answer.deleteOne({ _id: answerId });

    await Models.Question.updateMany(
      {
        _id: answerId,
      },
      {
        $pull: { answers: answerId },
      }
    );

    await Models.Interaction.deleteMany({
      answer: answerId,
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
