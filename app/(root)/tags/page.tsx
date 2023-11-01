import React from "react";
import { TagCard } from "@/components/organisms";

import * as Actions from "../../../lib/actions";
import Link from "next/link";
import { PaginationBox, SearchBar } from "@/components/molecules";
import { TagSearchParams } from "@/types/shared";
import { TagFilter } from "./Components/TagFilter";

const Tags = async ({ searchParams }: { searchParams: TagSearchParams }) => {
  const results = await Actions.getAllTags({
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    pageNo: searchParams.page ?? 1,
  });

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="flex items-center gap-10">
        <SearchBar route={"/tags"} placeholder="Search for tag" />
        <TagFilter type="tag" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {results.tagList.map((item) => {
          return (
            <Link href={`/tags/${item._id}`}>
              <TagCard
                key={item._id}
                name={item.name}
                totalQuestions={item.questions.length}
              />
            </Link>
          );
        })}
      </div>
      <PaginationBox
        isNext={results?.isNext ?? false}
        currentPage={searchParams.page ? searchParams.page : 1}
      />
    </section>
  );
};

export default Tags;
