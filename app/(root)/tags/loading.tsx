import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="flex items-center gap-10">
        <Skeleton className="w-full h-[50px] rounded-md" />
        <Skeleton className="w-[300px] h-[50px] rounded-md" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
        <Skeleton className="w-[250px] h-[200px] rounded-md" />
      </div>
    </section>
  );
};

export default Loading;
