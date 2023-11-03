"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFormUrl } from "@/lib/utils";

import { GlobalFilter } from "@/components/search/GlobalFilter";

import { GlobalResult } from "../GlobalResult";

export const GlobalSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFormUrl({
          params: searchParams.toString(),
          keys: ["global", "type"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, searchValue]);

  return (
    <div className="relative flex flex-col gap-10">
      <section className="w-full relative max-lg:hidden light-border border rounded-lg">
        <Image
          src={"/assets/icons/search.svg"}
          width={20}
          height={20}
          className="absolute top-4 left-4 text-light-500"
          alt="serach"
        />
        <input
          value={search}
          placeholder={"Search anything globally"}
          className="p-4 rounded-md w-full pl-12 outline-none dark:dark-gradient bg-light-800 placeholder:text-light400_light500 placeholder:text-sm paragraph-regular text-light400_light500"
          onChange={(e) => {
            setSearch(e.target.value);

            if (!open) setOpen(true);
            if (e.target.value === "" && open) setOpen(false);
          }}
        />
      </section>
      <div
        className={`w-full ${
          open ? "visible" : "hidden"
        } absolute top-16 z-50 h-[417px] max-lg:hidden light-border border rounded-lg dark:bg-dark-400 bg-light-800`}
      >
        <div className="flex flex-col h-full gap-4">
          <GlobalFilter />
          <GlobalResult />
        </div>
      </div>
    </div>
  );
};
