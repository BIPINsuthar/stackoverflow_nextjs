import React from "react";

import * as Actions from "../../../../lib/actions";

import { FeedbackCenter, Time, Voting } from "@/components/molecules/Actions";
import { Icons } from "@/components/atoms";
import { UserInfo } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";
import { ParseHtml } from "@/components/shared";
import { Answer } from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs";
import { SavedQuestion } from "../Components/savedQuestion";

const Question = async ({ params }) => {
  const { userId: clerkId } = auth();

  const question = await Actions.getQuestionById(params?.id);
  const answerList = await Actions.getAllAnswer(question._id);

  const user = await Actions.getUserById(clerkId!);

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between max-sm:max-md-col">
        <UserInfo
          name={question.author.name}
          picture={question.author.picture}
        />
        <div className="flex items-center gap-2 ">
          <Voting
            itemId={question._id}
            hasdownVoted={question.downvotes.includes(user._id)}
            hasupVoted={question.upvotes.includes(user._id)}
            userId={user._id}
            actionType="upVote"
            count={question.upvotes.length}
          />
          <Voting
            itemId={question._id}
            hasdownVoted={question.downvotes.includes(user._id)}
            hasupVoted={question.upvotes.includes(user._id)}
            userId={user._id}
            actionType="downVote"
            count={question.downvotes.length}
          />
          <SavedQuestion
            questionId={question._id}
            hasSaved={user.savedQuestions?.includes(question._id)}
            userId={user._id}
          />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900">{question.title}</h2>
      <div className="flex items-center gap-4">
        <Time />
        <FeedbackCenter type="Views" count="1.2k" />
        <FeedbackCenter type="Answers" count="900" />
        <FeedbackCenter type="Votes" count="5.2k" />
      </div>
      <ParseHtml data={question.content} />
      <div className="flex gap-2 flex-wrap">
        {question.tags.map((item) => {
          return <Tag label={item.name} key={item._id} />;
        })}
      </div>
      <div>
        {answerList.map((item) => {
          return (
            <div>
              <div className="flex-between max-sm:max-md-col">
                <UserInfo
                  name={item.author.name}
                  picture={item.author.picture}
                />
                <div className="flex items-center gap-2 ">
                  <Voting
                    itemId={item._id}
                    hasdownVoted={item.downvotes.includes(user._id)}
                    hasupVoted={item.upvotes.includes(user._id)}
                    userId={user._id}
                    actionType="upVote"
                    count={item.upvotes.length}
                    type="answer"
                  />
                  <Voting
                    itemId={item._id}
                    hasdownVoted={item.downvotes?.includes(user._id)}
                    hasupVoted={item.upvotes?.includes(user._id)}
                    userId={user._id}
                    actionType="downVote"
                    count={item.downvotes.length}
                    type="answer"
                  />
                </div>
              </div>
              <ParseHtml data={item.content} />
            </div>
          );
        })}
      </div>
      <Answer questionId={question._id} />
    </div>
  );
};

export default Question;
