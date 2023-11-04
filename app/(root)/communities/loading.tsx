import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="flex items-center gap-10 mt-2">
        <Skeleton className="w-full h-[50px] rounded-md" />
        <Skeleton className="w-[300px] h-[50px] rounded-md" />
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <Skeleton className="w-[250px] h-[250px] rounded-md" />
        <Skeleton className="w-[250px] h-[250px] rounded-md" />
        <Skeleton className="w-[250px] h-[250px] rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
