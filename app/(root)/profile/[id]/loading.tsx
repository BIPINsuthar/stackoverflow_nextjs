import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <section className="flex flex-1 flex-col gap-8">
      <div className="flex items-start max-md-col gap-4 ">
        <Skeleton className="h-[140px] w-[180px] rounded-full " />
        <div className="flex flex-col gap-4 w-full">
          <div>
            <div className="flex-between max-md-col w-full">
              <Skeleton className="h-[25px] w-[180px] rounded-md " />
              <Skeleton className="h-[55px] w-[180px] rounded-md " />
            </div>
            <Skeleton className="h-[10px] w-[80px] rounded-md " />
            <div className="w-[180px] flex items-center gap-6 mt-6">
              <Skeleton className="h-[10px] w-[80px] rounded-md " />
              <Skeleton className="h-[10px] w-[80px] rounded-md " />
            </div>
            <Skeleton className="h-[10px] w-[180px] rounded-md mt-4 " />
            <Skeleton className="h-[10px] w-[400px] rounded-md mt-4 " />
          </div>
        </div>
      </div>
      <Skeleton className="h-[10px] w-[80px] rounded-md mt-4 " />
      <div className="flex items-center flex-wrap gap-4">
        <Skeleton className="h-[100px] w-[230px] rounded-md" />
        <Skeleton className="h-[100px] w-[230px] rounded-md" />
        <Skeleton className="h-[100px] w-[230px] rounded-md" />
        <Skeleton className="h-[100px] w-[230px] rounded-md" />
      </div>
      <Skeleton className="h-[40px] w-[200px] rounded-md" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
      </div>
    </section>
  );
};

export default Loading;
