import { Icons } from "@/components/atoms";
import { Props } from "./types";

export const UserInfo = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Icons uri={picture} size={24} className="rounded-full" />
      <p className="body-semibold text-dark300_light700">
        {name ?? "Philip Martin"}
      </p>
      <p className="small-regular text-light400_light500">
        • answered Aug 6, 2022 at 21:01
      </p>
    </div>
  );
};
