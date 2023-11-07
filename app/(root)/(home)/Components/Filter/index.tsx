"use client";
import { useState } from "react";
import { Tag } from "@/components/molecules/Badges";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Props } from "./types";
import { formUrlQuery } from "@/lib/utils";

export const Filter = ({ route }: Props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const Filter = [
    {
      id: 1,
      title: "Newest",
    },
    {
      id: 2,
      title: "Recommended Questions",
    },
    {
      id: 3,
      title: "Frequent",
    },
    {
      id: 4,
      title: "Unanswered",
    },
  ];

  const handleTypeClick = (title: string) => {
    if (selectedItem === title) {
      setSelectedItem("");
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setSelectedItem(title);
      const newUrl = formUrlQuery({
        key: "filter",
        params: searchParams.toString(),
        value: title.toLocaleLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex flex-wrap gap-4">
      {Filter.map((item) => {
        return (
          <Tag
            onClick={() => handleTypeClick(item.title)}
            size="big"
            isActive={item.title === selectedItem}
            key={item.id}
            label={item.title}
          />
        );
      })}
    </div>
  );
};
