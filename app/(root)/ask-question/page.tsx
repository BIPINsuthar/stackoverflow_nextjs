import React from "react";

import { Question } from "./Question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import * as Actions from "../../../lib/actions";

const AskQuestions = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await Actions.getUserById(userId);
  console.log(user);
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <Question userId={user._id} />
    </div>
  );
};

export default AskQuestions;
