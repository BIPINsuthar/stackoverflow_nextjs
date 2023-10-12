import React from "react";
import { Icons } from "@/components/atoms";

export const Time = () => {
  return (
    <div className="flex items-center gap-1">
      <Icons type="clock" size={14} />
      <p className="small-regular text-dark400_light700">Asked 2 days ago</p>
    </div>
  );
};
