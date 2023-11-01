"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Props } from "./types";

export const PaginationBox = ({ currentPage, isNext }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(currentPage);

  const handleIncreasePage = () => {
    if (isNext) {
      setPage(page + 1);
      const newUrl = formUrlQuery({
        key: "page",
        params: searchParams.toString(),
        value: `${page + 1}`,
      });
      router.push(newUrl);
    }
  };

  const handleDecreasePage = () => {
    if (page != 1) {
      setPage(page - 1);
      const newUrl = formUrlQuery({
        key: "page",
        params: searchParams.toString(),
        value: `${page - 1}`,
      });
      router.push(newUrl);
    }
  };

  return (
    <div className="flex items-center gap-4 self-center">
      <div
        onClick={handleDecreasePage}
        className="py-2 px-4 cursor-pointer background-light700_dark400 border light-border rounded-lg w-fit"
      >
        <p className="body-medium text-dark400_light800">Prev</p>
      </div>
      <div className="primary-gradient py-3 px-6 rounded-lg w-fit">
        <p className="body-medium text-dark400_light800">{page}</p>
      </div>
      <div
        onClick={handleIncreasePage}
        className="py-2 px-4 cursor-pointer background-light700_dark400 border light-border rounded-lg w-fit"
      >
        <p className="body-medium text-dark400_light800">Next</p>
      </div>
    </div>
  );
};
