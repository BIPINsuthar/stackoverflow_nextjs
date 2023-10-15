import React from "react";

import * as Actions from "../../../../lib/actions";

import { FeedbackCenter, Time, Voting } from "@/components/molecules/Actions";
import { Icons } from "@/components/atoms";
import { UserInfo } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";
import { ParseHtml } from "@/components/shared";

// const Answers = () => {
//   const Filter = [
//     {
//       title: "Newest",
//     },
//     {
//       title: "Recommended Questions",
//     },
//     {
//       title: "Frequent",
//     },
//     {
//       title: "Unanswered",
//     },
//   ];

//   return (

//   );
// };

const Question = async ({ params }) => {
  const question = await Actions.getQuestionById(params?.id);
  console.log("question details", params.id, question);

  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between max-sm:max-md-col">
        <UserInfo
          name={question.auther.name}
          picture={question.auther.picture}
        />
        <div className="flex items-center gap-2 ">
          <Voting type="upVote" count="12" isFilled />
          <Voting type="downVote" count="12" isFilled />
          <Icons type="star-red" size={18} />
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
      {/* <p className="body-regular text-dark400_light700">
        When the user clicks a button for the first time, a spinner is
        displayed, the "close" button is disabled, and a modal popup is shown.
        When the user clicks on a table displayed within the modal popup, the
        table loads data. When the user closes the popup by clicking the "close"
        button, and then clicks the same button again without refreshing the
        page, the data in the table should be the same as it was before. I need
        it so that when the user clicks the button, any changes made stay in
        place even after closing and reopening the popup.
      </p> */}
      <div className="flex gap-2 flex-wrap">
        {question.tags.map((item) => {
          return <Tag label={item.name} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default Question;
