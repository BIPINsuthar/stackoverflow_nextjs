"use server";
import { Tag, TagQuestionFilter, TagsFilter } from "@/types/shared";
import * as Models from ".././model";
import { connectToDatabase } from "../mongoose";

export async function getPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Models.Tag.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      {
        $sort: { numberOfQuestions: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return popularTags as {
      name: string;
      _id: string;
      numberOfQuestions: number;
    }[];
  } catch (error) {
    throw error;
  }
}

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

export async function getAllTags(params: {
  searchQuery: string;
  filter: TagsFilter;
}) {
  try {
    await connectToDatabase();
    const { searchQuery, filter } = params;

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = {
          questions: -1,
        };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      default:
        break;
    }

    const tagList = await Models.Tag.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    }).sort(sortOptions);

    return tagList as Tag[];
  } catch (error) {
    throw error;
  }
}

export async function getQuestionByTagId(params: {
  tagId: string;
  searchQuery: string;
  filter: TagQuestionFilter;
}) {
  try {
    await connectToDatabase();
    const { searchQuery, tagId, filter } = params;

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
        break;
    }

    const query = {
      $or: [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ],
    };

    const tagDetails = await Models.Tag.findById(tagId, {
      questions: 1,
      name: 1,
      _id: 0,
    }).populate({
      path: "questions",
      model: Models.Question,
      match: query,
      options: sortOptions,
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
