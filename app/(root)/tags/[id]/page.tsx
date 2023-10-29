import React from "react";

import * as Actions from "../../../../lib/actions";
import { QuestionCard } from "@/components/organisms";

// @ts-ignore
const TagQuestions = async ({ params }) => {
  const tagDetail = await Actions.getQuestionByTagId(params.id);

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">{tagDetail.name}</h1>
      <div className="flex flex-col gap-4">
        {tagDetail.questions.map((item) => {
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
              }}
              tags={item.tags}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TagQuestions;
