"use client";

import { QuestionCard } from "@/components/organisms";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {[1, 2, 3].map((item) => {
        return <QuestionCard />;
      })}
    </div>
  );
}
