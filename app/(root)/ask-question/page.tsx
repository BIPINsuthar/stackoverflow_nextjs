import React from "react";

import { Question } from "./Question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AskQuestions = () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <Question />
    </div>
  );
};

export default AskQuestions;
