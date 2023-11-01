"use client";
import { Filter } from "@/components/molecules";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const AnswerFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Options = ["HighestUpvotes", "LowestUpvotes", "Recent", "Old"];

  const [filter, setFilter] = useState("");

  const handleTypeChange = (value: string) => {
    if (value === filter) {
      setFilter("");
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setFilter(value);
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: value.toLocaleLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <Filter
      value={filter}
      options={Options}
      onChange={(value) => handleTypeChange(value)}
    />
  );
};
