"use server";
import { Tag } from "@/types/shared";
import * as Models from ".././model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsProps,
  GetTopInteractedTagProps,
  getQuestionsByTagIdProps,
} from "@/types/action";

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

export async function getTopInteractedTags(params: GetTopInteractedTagProps) {
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

export async function getAllTags(params: GetAllTagsProps) {
  try {
    await connectToDatabase();
    const { searchQuery, filter, pageNo = 1, pageSize = 10 } = params;

    const skip = (pageNo - 1) * pageSize;

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

    const query = {
      name: { $regex: new RegExp(searchQuery, "i") },
    };

    const tagList = await Models.Tag.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalTags = await Models.Tag.countDocuments(query);
    const isNext = totalTags > skip + tagList.length;

    return {
      tagList: tagList,
      totalTags: totalTags,
      isNext: isNext,
    };
  } catch (error) {
    throw error;
  }
}

export async function getQuestionByTagId(params: getQuestionsByTagIdProps) {
  try {
    await connectToDatabase();
    const { searchQuery, tagId, filter, pageNo = 1, pageSize = 10 } = params;

    const skip = (pageNo - 1) * pageSize;

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

    const tagDetails = (await Models.Tag.findById(tagId, {
      questions: 1,
      name: 1,
      _id: 0,
    }).populate({
      path: "questions",
      model: Models.Question,
      match: query,
      options: {
        sort: sortOptions,
        skip: skip,
        limit: pageSize + 1,
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
    })) as Tag;

    if (!tagDetails) throw new Error("Tag not found!");

    const isNext = tagDetails.questions.length > pageSize;

    return { tagDetails: tagDetails as Tag, isNext: isNext };
  } catch (error) {
    throw error;
  }
}
