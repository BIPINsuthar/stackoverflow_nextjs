import { Icons } from "@/components/atoms";
import { Props } from "./types";
import moment from "moment";

export const UserInfo = ({ name, picture, date, type }: Props) => {
  const userType = type == "Question" ? "asked" : "answered";
  const formattedDate = moment(date).format("MMM D, YYYY [at] HH:mm");

  return (
    <div className="flex items-center gap-2">
      <Icons uri={picture} size={24} className="rounded-full" />
      <p className="body-semibold text-dark300_light700">
        {name ?? "Philip Martin"}
      </p>
      <p className="small-regular text-light400_light500">
        • {userType} {formattedDate}
      </p>
    </div>
  );
};
