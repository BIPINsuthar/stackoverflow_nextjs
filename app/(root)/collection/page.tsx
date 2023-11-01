import * as Actions from "../../../lib/actions";
import { auth } from "@clerk/nextjs";
import { QuestionCard } from "@/components/organisms";
import { EmptyQuestions, SearchBar } from "@/components/molecules";
import { CollectionSearchParams, SearchParams } from "@/types/shared";
import { CollectionsFilter } from "./Components/CollectionsFilter";

const Collections = async ({
  searchParams,
}: {
  searchParams: CollectionSearchParams;
}) => {
  const { userId } = auth();

  const allQuestions = await Actions.allSavedQuestions({
    userId: userId!,
    searchQuery: searchParams.search,
    filter: searchParams.filter,
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="flex items-center gap-10">
        <SearchBar route={"/collection"} placeholder="Search for questions" />
        <CollectionsFilter />
      </div>

      {allQuestions?.map((item) => {
        return (
          // <Link href={`/question/${item._id}`}>
          <QuestionCard
            title={item.title}
            user={{
              name: item.author.name,
              picture: item.author.picture,
              clerkId: item.author.clerkId,
            }}
            createdAt={item.createdAt}
            tags={item.tags}
            feedBack={{
              answers: item.answers.length,
              view: 0,
              votes: item.upvotes.length,
            }}
          />
          // </Link>
        );
      })}
      {(allQuestions?.length == 0 || allQuestions == undefined) && (
        <EmptyQuestions />
      )}
    </div>
  );
};

export default Collections;
