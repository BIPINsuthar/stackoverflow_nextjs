import { Tag } from "@/components/molecules/Badges";
import React from "react";

import * as Components from "../../../components";
import { FeedbackCenter, Time, Voting } from "@/components/molecules/Actions";
import { Icons } from "@/components/atoms";
import { UserInfo } from "@/components/molecules";

const Answers = () => {
  const Filter = [
    {
      title: "Newest",
    },
    {
      title: "Recommended Questions",
    },
    {
      title: "Frequent",
    },
    {
      title: "Unanswered",
    },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between max-sm:max-md-col">
        <UserInfo />
        <div className="flex items-center gap-2 ">
          <Voting type="upVote" count="12" isFilled />
          <Voting type="downVote" count="12" isFilled />
          <Icons type="star-red" size={18} />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900">
        How to refresh all the data inside the Datatable and move the data into
        original place after closing the modal popup close button
      </h2>
      <div className="flex items-center gap-4">
        <Time />
        <FeedbackCenter type="Views" count="1.2k" />
        <FeedbackCenter type="Answers" count="900" />
        <FeedbackCenter type="Votes" count="5.2k" />
      </div>

      <p className="body-regular text-dark400_light700">
        When the user clicks a button for the first time, a spinner is
        displayed, the "close" button is disabled, and a modal popup is shown.
        When the user clicks on a table displayed within the modal popup, the
        table loads data. When the user closes the popup by clicking the "close"
        button, and then clicks the same button again without refreshing the
        page, the data in the table should be the same as it was before. I need
        it so that when the user clicks the button, any changes made stay in
        place even after closing and reopening the popup.
      </p>
      <div className="flex gap-2 flex-wrap">
        {Filter.map((item) => {
          return <Tag label={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Answers;
