"use server";
import { FilterType, GlobalSearchResult } from "@/types/shared";

import * as Models from "../model";

import { connectToDatabase } from "../mongoose";
import { ModelAndTypesProps } from "@/types/action";

export async function globalSearch(params: {
  type: FilterType | null;
  global: string | null;
}) {
  try {
    connectToDatabase();

    const { global, type } = params;

    const searchQuery = { $regex: global, $options: "i" };

    let results: GlobalSearchResult[] = [];

    const modelAndTypes: ModelAndTypesProps[] = [
      {
        model: Models.Question,
        searchField: "title",
        type: "question",
      },
      {
        model: Models.Answer,
        searchField: "content",
        type: "answer",
      },
      {
        model: Models.User,
        searchField: "name",
        type: "user",
      },
      {
        model: Models.Tag,
        searchField: "name",
        type: "tag",
      },
    ];

    if (type) {
      //SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = await modelAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid search Type");
      }

      const queryResults = await modelInfo?.model
        .find({
          [modelInfo.searchField]: searchQuery,
        })
        .limit(8);

      results = queryResults?.map((item) => ({
        id:
          type == "user"
            ? item.clerkId
            : type == "answer"
            ? item.question
            : item._id,
        title:
          type == "answer"
            ? `Answers containig ${global}`
            : item[modelInfo.searchField],
        type,
      }));
      return results;
    } else {
      //SEARCH ACROSS EVERYTHING

      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({
            [searchField]: searchQuery,
          })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            id:
              type == "user"
                ? item.clerkId
                : type == "answer"
                ? item.question
                : item._id,
            title:
              type == "answer"
                ? `Answers containig ${global}`
                : item[searchField],
            type,
          }))
        );
        return results;
      }
    }
  } catch (error) {
    throw error;
  }
}
