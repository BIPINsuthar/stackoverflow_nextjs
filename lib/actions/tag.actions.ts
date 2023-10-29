"use server";
import { Tag } from "@/types/shared";
import * as Models from ".././model";
import { connectToDatabase } from "../mongoose";

export async function getTopInteractedTags(params: {
  userId: string;
  limit?: number;
}) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;

    const user = await Models.User.findById(userId);
    if (!user) throw new Error("User not found!");

    return ["tag1,tag2", "tag3"];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags() {
  try {
    await connectToDatabase();
    const tagList = await Models.Tag.find({});
    return tagList as Tag[];
  } catch (error) {
    throw error;
  }
}

export async function getQuestionByTagId(tagId: string) {
  try {
    await connectToDatabase();
    const tagDetails = await Models.Tag.findById(tagId, {
      questions: 1,
      name: 1,
      _id: 0,
    }).populate({
      path: "questions",
      model: Models.Question,
      options: {
        createdAt: -1,
      },
      populate: [
        {
          path: "author",
          model: Models.User,
          select: "_id clerkId name picture",
        },
        {
          path: "tags",
          model: Models.Tag,
          select: "_id name",
        },
      ],
    });
    if (!tagDetails) throw new Error("Tag not found!");
    return tagDetails as Tag;
  } catch (error) {
    throw error;
  }
}
