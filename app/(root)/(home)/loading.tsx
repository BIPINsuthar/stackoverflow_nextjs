import { Button } from "@/components/molecules";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <div className="flex w-full flex-1 flex-col gap-6">
      <div className="flex-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"}>
          <Button title="Ask a Question" width="fit" type="gradient" />
        </Link>
      </div>
      <Skeleton className="w-full h-[50px] rounded-md" />
      <div className="flex items-center gap-4">
        <Skeleton className="w-[80px] h-[30px] rounded-md" />
        <Skeleton className="w-[150px] h-[30px] rounded-md" />
        <Skeleton className="w-[100px] h-[30px] rounded-md" />
        <Skeleton className="w-[100px] h-[30px] rounded-md" />
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
