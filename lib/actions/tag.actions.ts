"use server";
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
    connectToDatabase();
    const tagList = await Models.Tag.find({});

    return tagList;
  } catch (error) {
    console.log("getAll tags error", error);
    throw error;
  }
}
