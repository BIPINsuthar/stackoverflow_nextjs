import * as Molecules from "../../molecules";
import { Props } from "./types";

import { FeedbackCenter } from "@/components/molecules/Actions";

export const QuestionCard = ({
  onClick,
  title,
  tags,
  user,
  feedBack,
  createdAt,
}: Props) => {
  return (
    <section
      onClick={onClick}
      className="flex flex-col gap-6 rounded-lg background-light900_dark200 p-6 light-border border cursor-pointer"
    >
      <h3 className="h3-semibold text-dark200_light900 line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center flex-grow gap-2">
        {tags?.map((item) => {
          return <Molecules.Badges.Tag key={item.name} label={item.name} />;
        })}
      </div>
      <div className="flex-between max-sm:max-md-col">
        <Molecules.UserInfo
          type="Question"
          name={user.name}
          picture={user.picture}
          date={createdAt}
        />
        <div className="flex items-center gap-2 ">
          <FeedbackCenter type="Views" count={feedBack?.view} />
          <FeedbackCenter type="Answers" count={feedBack?.answers} />
          <FeedbackCenter type="Votes" count={feedBack?.votes} />
        </div>
      </div>
    </section>
  );
};
