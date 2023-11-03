import { FilterType } from "@/types/shared";
import { Model } from "mongoose";

import * as Models from "../model";

export async function globalSearch(params: {
  type: FilterType | null;
  global: string | null;
}) {
  const { global, type } = params;

  const searchQuery = { $regex: global };

  const globalModel: {
    model: Model<any, {}, {}, {}, any, any>;
    searchField: string;
    type: string;
  }[] = [
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
    //send 8 records
    const results = await globalModel.find((item) => item.type === type);

    if (!results) {
      throw new Error("wrong model");
    }

    const output = await results?.model
      .find({
        [results.searchField]: searchQuery,
      })
      .limit(8);

    const finalResults = output?.map((item) => ({
      id: item._id,
      title: item[results.searchField],
      type,
    }));

    return finalResults;
  } else {
    //send each item 2 records

    const finalResults: { id: string; title: string; type: string }[] = [];

    for (const { model, searchField, type } of globalModel) {
      const result = await model
        .find({
          [searchField]: searchQuery,
        })
        .limit(2);

      result.map((item) => {
        finalResults.push({
          id: item._id,
          title: item[searchField],
          type,
        });
      });
    }

    return finalResults;
  }
}
