import {
  CommunityCard,
  PaginationBox,
  SearchBar,
} from "@/components/molecules";

import * as Actions from "../../../lib/actions";
import Link from "next/link";
import { UserFilter } from "./Components/UserFilter";
import { CommunitySearchParams } from "@/types/shared";

const Communities = async ({
  searchParams,
}: {
  searchParams: CommunitySearchParams;
}) => {
  const results = await Actions.getAllUsers({
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    pageNo: searchParams.page,
  });

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="flex items-center gap-10">
        <SearchBar route={"/communities"} placeholder="Search for user" />
        <UserFilter />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {results.users.map((item) => {
          return (
            <Link href={`profile/${item.clerkId}`} className="cursor-pointer">
              <CommunityCard
                name={item.name}
                picture={item.picture}
                userId={item._id}
                userName={item.username}
                key={item._id}
              />
            </Link>
          );
        })}
      </div>
      <PaginationBox
        isNext={results.isNext}
        currentPage={searchParams.page ? searchParams.page : 1}
      />
    </section>
  );
};

export default Communities;
