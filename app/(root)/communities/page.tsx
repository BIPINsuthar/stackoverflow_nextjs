import { CommunityCard, SearchBar } from "@/components/molecules";

import * as Actions from "../../../lib/actions";

const Communities = async () => {
  const users = await Actions.getAllUsers();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {users.map((item) => {
          return (
            <CommunityCard
              name={item.name}
              picture={item.picture}
              userId={item._id}
              userName={item.username}
              key={item.userName}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Communities;
