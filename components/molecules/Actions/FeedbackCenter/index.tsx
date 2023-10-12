import { Icons } from "@/components/atoms";
import { Props } from "./types";

export const FeedbackCenter = ({ count, type }: Props) => {
  const icon = type == "Answers" ? "message" : type == "Views" ? "eye" : "like";

  return (
    <div className="flex items-center gap-1 text-dark400_light700">
      <Icons type={icon} size={16} />
      <p className="small-medium">{count}</p>
      <p className="small-regular">{type}</p>
    </div>
  );
};
