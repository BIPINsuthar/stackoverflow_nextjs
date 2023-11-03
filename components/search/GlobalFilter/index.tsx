import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Filter = ["Question", "Answer", "User", "Tag"];
  const [filter, setFilter] = useState("");

  const handleTypeChange = (item: string) => {
    if (item === filter) {
      setFilter("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setFilter(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center border-b light-border2">
      <div className="flex items-center gap-2 p-6">
        <p className="body-semibold pr-4 text-dark400_light800">Type:</p>
        {Filter.map((item) => {
          return (
            <div
              onClick={() => handleTypeChange(item)}
              className={`w-fit cursor-pointer rounded-full px-4 py-2 ${
                item === filter
                  ? "primary-gradient"
                  : "background-light700_dark300"
              }`}
            >
              <p
                className={`${
                  item === filter ? "text-white" : "text-dark500_light700"
                } small-semibold `}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
