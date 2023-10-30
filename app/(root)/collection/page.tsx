import { EmptyQuestions } from "./components/EmptyQuestions";

import * as Actions from "../../../lib/actions";
import { auth } from "@clerk/nextjs";
import { QuestionCard } from "@/components/organisms";
import Link from "next/link";

const Collections = async () => {
  const { userId } = auth();
  const allQuestions = await Actions.allSavedQuestions({
    userId: userId!,
  });
  console.log("quetion details", allQuestions);
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      {allQuestions?.map((item) => {
        return (
          <Link href={`/question/${item._id}`}>
            <QuestionCard
              title={item.title}
              user={{
                name: item.author.name,
                picture: item.author.picture,
              }}
              createdAt={item.createdAt}
              tags={item.tags}
              feedBack={{
                answers: item.answers.length,
                view: 0,
                votes: item.upvotes.length,
              }}
            />
          </Link>
        );
      })}
      {(allQuestions?.length == 0 || allQuestions == undefined) && (
        <EmptyQuestions />
      )}
    </div>
  );
};

export default Collections;
