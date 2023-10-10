import { CommunityCard, GlobalSearch } from "@/components/molecules";

export default function Communities() {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div>
        <GlobalSearch />
      </div>
      <div>
        <CommunityCard />
      </div>
    </section>
  );
}
