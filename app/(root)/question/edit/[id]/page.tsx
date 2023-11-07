import React from "react";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import * as Actions from "../../../../../lib/actions";
import { Question } from "@/components/forms/Question";

// @ts-ignore
const EditQuestion = async ({ params }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await Actions.getUserById(userId);
  const question = await Actions.getQuestionById(params.id);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">EditQuestion</h1>
      <Question
        userId={user._id}
        questionId={question._id}
        content={question.content}
        tags={question.tags.map((item) => item.name)}
        title={question.title}
        type="edit"
      />
    </div>
  );
};

export default EditQuestion;
