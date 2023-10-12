import { Icons } from "@/components/atoms";
import { Props } from "./types";

export const Voting = ({ count, type, isFilled }: Props) => {
  const icon = isFilled
    ? type == "downVote"
      ? "filled-down-votes"
      : "filled-up-votes"
    : type === "downVote"
    ? "downvote"
    : "upvote";

  return (
    <div className="flex items-center gap-2">
      <Icons type={icon} size={18} />
      <div className="h-6 w-6 p-1 rounded-md background-light700_dark400 flex items-center justify-center">
        <p className="subtle-medium text-dark400_light900">
          {type == "upVote" ? count : "-" + count}
        </p>
      </div>
    </div>
  );
};
