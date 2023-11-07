import * as Actions from "../../../lib/actions";
import { auth } from "@clerk/nextjs";
import { QuestionCard } from "@/components/organisms";
import {
  EmptyQuestions,
  PaginationBox,
  SearchBar,
} from "@/components/molecules";
import { CollectionSearchParams } from "@/types/shared";
import { CollectionsFilter } from "./Components/CollectionsFilter";

const Collections = async ({
  searchParams,
}: {
  searchParams: CollectionSearchParams;
}) => {
  const { userId } = auth();

  let results = null;

  if (userId) {
    results = await Actions.allSavedQuestions({
      userId: userId,
      searchQuery: searchParams.search,
      filter: searchParams.filter,
      pageNo: searchParams.page,
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="flex items-center gap-10">
        <SearchBar route={"/collection"} placeholder="Search for questions" />
        <CollectionsFilter />
      </div>
      {results?.questions?.map((item) => {
        return (
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
        );
      })}
      {results?.questions.length == 0 && <EmptyQuestions type="collection" />}
      {results && results?.questions.length != 0 && (
        <PaginationBox
          isNext={results?.isNext ?? false}
          currentPage={searchParams.page ? searchParams.page : 1}
        />
      )}
    </div>
  );
};

export default Collections;
