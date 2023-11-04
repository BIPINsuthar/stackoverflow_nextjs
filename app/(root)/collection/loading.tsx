import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="flex items-center gap-10">
        <Skeleton className="w-full h-[57px] rounded-md" />
        <Skeleton className="w-[300px] h-[57px] rounded-md" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-[150px] rounded-md" />
        <Skeleton className="w-full h-[150px] rounded-md" />
        <Skeleton className="w-full h-[150px] rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
