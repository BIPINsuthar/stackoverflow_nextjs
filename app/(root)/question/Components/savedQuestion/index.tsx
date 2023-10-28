"use client";
import React from "react";
import { Icons } from "@/components/atoms";

import * as Actions from "../../../../../lib/actions";
import { usePathname } from "next/navigation";
import { Props } from "./types";

export const SavedQuestion = ({ questionId, userId, hasSaved }: Props) => {
  const path = usePathname();

  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        await Actions.saveQuetion(questionId, userId!, path);
      }}
    >
      <Icons type={hasSaved ? "star-filled" : "star-red"} size={18} />
    </div>
  );
};
