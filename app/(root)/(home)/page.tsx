"use client";
import { UserButton } from "@clerk/nextjs";

import * as Context from "../../../context";
import { QuestionCard } from "@/components/organisms";

export default function Home() {
  const { mode } = Context.useTheme();

  return (
    <div className="flex flex-1 flex-col gap-4">
      {[1, 2, 3].map((item) => {
        return <QuestionCard />;
      })}
    </div>
  );
}
