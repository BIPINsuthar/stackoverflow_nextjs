import React from "react";
import { QuestionCard } from "@/components/organisms";

import * as Actions from "../../../lib/actions";

const Home = async () => {
  const Questions = await Actions.getAllQuestion();
  console.log(Questions);
  return (
    <div className="flex flex-1 flex-col gap-4">
      {Questions?.map((item) => {
        return (
          <QuestionCard key={item.title} title={item.title} tags={item.tags} />
        );
      })}
    </div>
  );
};

export default Home;
