"use client";
import Image from "next/image";
import { Props } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFormUrl } from "@/lib/utils";

export const SearchBar = ({ route, placeholder }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          const newUrl = removeKeysFormUrl({
            params: searchParams.toString(),
            keys: ["search"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathName, searchParams, query, route]);

  return (
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
        placeholder={placeholder ?? "Search anything globally"}
        className="p-4 rounded-md w-full pl-12 outline-none dark:dark-gradient bg-light-800 placeholder:text-light400_light500 placeholder:text-sm paragraph-regular text-light400_light500"
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
};
