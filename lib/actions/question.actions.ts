"use server";

import { connectToDatabase } from "../mongoose";

import * as Models from "../model";
import { revalidatePath } from "next/cache";
import { Question } from "@/types/shared";

export async function getAllQuestion() {
  try {
    connectToDatabase();

    const questions = await Models.Question.find({})
      .populate({
        path: "tags",
        model: Models.Tag,
      })
      .populate({
        path: "auther",
        model: Models.User,
      })
      .sort({ createdAt: -1 });

    return questions as Question[];
  } catch (error) {
    console.log("error while questions data", error);
  }
}

export async function createQuestion(params: {
  title: string;
  content: string;
  tags: string[];
  auther: string;
  path: string;
}) {
  try {
    connectToDatabase();
    const { title, content, tags, auther, path } = params;

    const question = await Models.Question.create({
      title,
      content,
      auther,
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
            question: question._id,
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
