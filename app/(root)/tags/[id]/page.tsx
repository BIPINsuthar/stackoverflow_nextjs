import React from "react";

import * as Actions from "../../../../lib/actions";
import { QuestionCard } from "@/components/organisms";
import { PaginationBox, SearchBar } from "@/components/molecules";
import { TagFilter } from "../Components/TagFilter";
import { TagQuestionPage } from "@/types/shared";

const TagQuestions = async ({ params, searchParams }: TagQuestionPage) => {
  const results = await Actions.getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    pageNo: searchParams.page,
  });

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">
        {results.tagDetails.name}
      </h1>
      <div className="flex items-center gap-10">
        <SearchBar route={`/tags/${params.id}`} placeholder="Search for tag" />
        <TagFilter type="answer" />
      </div>
      <div className="flex flex-col gap-4">
        {results.tagDetails.questions.map((item) => {
          return (
            <QuestionCard
              createdAt={item.createdAt}
              feedBack={{
                answers: item.answers.length,
                view: item.views,
                votes: item.upvotes.length,
              }}
              title={item.title}
              user={{
                name: item.author.name,
                picture: item.author.picture,
                clerkId: item.author.clerkId,
              }}
              tags={item.tags}
            />
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

export default TagQuestions;
