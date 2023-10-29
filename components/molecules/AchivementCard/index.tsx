import { Icons } from "@/components/atoms";
import Image from "next/image";
import { Props } from "./types";

export const AchivementCard = ({ type }: Props) => {
  const icon =
    type === "Gold"
      ? "gold-medal"
      : type === "Bronze"
      ? "bronze-medal"
      : "silver-medal";

  return (
    <section className="background-light900_dark200 light-border border px-6 py-4 flex itemce gap-4 rounded-lg w-full max-w-[240px] max-sm:max-w-full">
      <Icons type={icon} size={45} />
      <div className="flex flex-col gap-2">
        <p className="paragraph-semibold text-dark200_light900">15</p>
        <p className="body-medium text-dark400_light700">{type} Badges</p>
      </div>
    </section>
  );
};
