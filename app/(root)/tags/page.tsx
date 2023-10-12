import { GlobalSearch } from "@/components/molecules";
import { TagCard } from "@/components/organisms";

export default function Tags() {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="flex items-center gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return <TagCard key={item} />;
        })}
      </div>
    </section>
  );
}
