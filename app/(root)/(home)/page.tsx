import React from "react";
import { QuestionCard } from "@/components/organisms";

import * as Actions from "../../../lib/actions";
import { Button } from "@/components/molecules";

const Home = async () => {
  const Questions = await Actions.getAllQuestion();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button title="Ask a Question" width="fit" type="gradient" />
      </div>
      {Questions?.map((item) => {
        return <QuestionCard key={item.title} title={item.title} />;
      })}
    </div>
  );
};

export default Home;
