import React from "react";
import { Icons } from "@/components/atoms";
import { Props } from "./types";
import moment from "moment";

export const Time = ({ date }: Props) => {
  const formattedDate = moment(date).fromNow();

  return (
    <div className="flex items-center gap-1">
      <Icons type="clock" size={14} />
      <p className="small-regular text-dark400_light700">
        Asked {formattedDate}
      </p>
    </div>
  );
};
