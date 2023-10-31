import { QuestionCard } from "@/components/organisms";
import * as Actions from "../../../../../lib/actions";
import { Props } from "./types";
import Link from "next/link";

export const TopAnswers = async ({ userId }: Props) => {
  const userAnswer = await Actions.getUserAnswers({
    userId: userId,
    page: 1,
    pageSize: 10,
  });
  return (
    <>
      {userAnswer.answers.map((item) => {
        return (
          <Link href={`/question/${item._id}`}>
            <QuestionCard
              _id={item._id}
              key={item.question.title}
              title={item.question.title}
              user={{
                name: item.question.author.name,
                picture: item.question.author.picture,
                clerkId: item.question.author.clerkId,
              }}
              createdAt={item.question.createdAt}
              feedBack={{
                answers: item.question.answers.length,
                view: item.question.views,
                votes: item.question.upvotes.length,
              }}
              tags={item.question.tags}
            />
          </Link>
        );
      })}
    </>
  );
};
