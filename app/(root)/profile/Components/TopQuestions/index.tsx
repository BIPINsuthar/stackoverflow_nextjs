import * as Actions from "../../../../../lib/actions";
import { Props } from "./types";
import { QuestionCard } from "@/components/organisms";

export const TopQuestions = async ({ userId }: Props) => {
  const userQuestion = await Actions.getUserQuestions({
    userId: userId,
    page: 1,
    pageSize: 10,
  });

  return (
    <div className="flex flex-col gap-4">
      {userQuestion.questions.map((item) => {
        return (
          <QuestionCard
            _id={item._id}
            key={item.title}
            title={item.title}
            user={{
              name: item.author.name,
              picture: item.author.picture,
              clerkId: item.author.clerkId,
            }}
            createdAt={item.createdAt}
            feedBack={{
              answers: item.answers.length,
              view: item.views,
              votes: item.upvotes.length,
            }}
            tags={item.tags}
          />
        );
      })}
    </div>
  );
};
