"use client";
import { Icons } from "@/components/atoms";
import { Props } from "./types";

import * as Actions from "../../../../lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const Voting = ({
  count,
  type,
  userId,
  itemId,
  hasupVoted,
  hasdownVoted,
  actionType,
}: Props) => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      Actions.viewQuestion({
        userId: userId ? userId : undefined,
        questionId: itemId,
      });
    }
  }, [userId, itemId, path, router]);

  const icon =
    actionType === "downVote"
      ? hasdownVoted
        ? "filled-down-votes"
        : "downvote"
      : hasupVoted
      ? "filled-up-votes"
      : "upvote";

  const handleVotes = async () => {
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "you must be logged in to perfrom this action",
      });
    }

    if (actionType == "downVote") {
      if (type == "answer") {
        await Actions.downvoteAnswers({
          hasdownVoted,
          hasupVoted,
          path,
          answerId: itemId,
          userId,
        });
      } else {
        await Actions.downvoteQuestions({
          hasdownVoted,
          hasupVoted,
          path,
          questionId: itemId,
          userId,
        });
      }
      return toast({
        title: `Downvote ${!hasdownVoted ? "Successfully" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    } else {
      if (type == "answer") {
        await Actions.upvoteAnswers({
          hasdownVoted,
          hasupVoted,
          path,
          answerId: itemId,
          userId,
        });
      } else {
        await Actions.upvoteQuestions({
          hasdownVoted,
          hasupVoted,
          path,
          questionId: itemId,
          userId,
        });
      }
      return toast({
        title: `Upvote ${!hasupVoted ? "Successfully" : "Removed"}`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    }
  };

  const votes = actionType == "upVote" ? count : count == 0 ? 0 : "-" + count;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleVotes}
    >
      <Icons type={icon} size={18} />
      <div className="h-6 w-6 p-1 rounded-md background-light700_dark400 flex items-center justify-center">
        <p className="subtle-medium text-dark400_light900">{votes}</p>
      </div>
    </div>
  );
};
