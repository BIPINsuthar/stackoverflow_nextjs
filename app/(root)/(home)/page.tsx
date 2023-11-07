import React from "react";

import { QuestionCard } from "@/components/organisms";
import {
  Button,
  EmptyQuestions,
  PaginationBox,
  SearchBar,
} from "@/components/molecules";

import * as Actions from "../../../lib/actions";

import Link from "next/link";
import { HomePageSearchParams } from "@/types/shared";
import { Filter } from "./Components/Filter";

const Home = async ({
  searchParams,
}: {
  searchParams: HomePageSearchParams;
}) => {
  const search = searchParams.search;
  const filter = searchParams.filter;

  const result = await Actions.getAllQuestion({
    searchQuery: search,
    filter: filter,
    pageNo: searchParams.page,
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"}>
          <Button title="Ask a Question" width="fit" type="gradient" />
        </Link>
      </div>
      <SearchBar route={"/"} placeholder="Search for questions" />
      <Filter route={"/"} />
      {result?.questions?.map((item) => {
        return (
          <Link href={`/question/${item._id}`}>
            <QuestionCard
              key={item.title}
              title={item.title}
              user={{
                name: item.author.name,
                picture: item.author.picture,
                clerkId: item.author.clerkId,
              }}
              createdAt={item.createdAt}
              feedBack={{
                answers: item.answers.length,
                view: item.views,
                votes: item.upvotes.length,
              }}
              tags={item.tags}
            />
          </Link>
        );
      })}
      {result?.totalQuestions == 0 && <EmptyQuestions />}
      {result?.questions.length != 0 && (
        <PaginationBox
          isNext={result?.isNext ?? false}
          currentPage={searchParams.page ? searchParams.page : 1}
        />
      )}
    </div>
  );
};

export default Home;
