import React from "react";

import { QuestionCard } from "@/components/organisms";
import { Button, SearchBar } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";

import * as Actions from "../../../lib/actions";

import Link from "next/link";

const Home = async () => {
  const Questions = await Actions.getAllQuestion();

  const Filter = [
    {
      id: 1,
      title: "Newest",
    },
    {
      id: 2,
      title: "Recommended Questions",
    },
    {
      id: 3,
      title: "Frequent",
    },
    {
      id: 4,
      title: "Unanswered",
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"}>
          <Button title="Ask a Question" width="fit" type="gradient" />
        </Link>
      </div>
      <SearchBar />
      <div className="flex flex-wrap gap-4">
        {Filter.map((item) => {
          return <Tag size="big" key={item.id} label={item.title} />;
        })}
      </div>

      {Questions?.map((item) => {
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
    </div>
  );
};

export default Home;
