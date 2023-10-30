import { Icons } from "@/components/atoms";
import { Props } from "./types";
import Link from "next/link";

export const ProfileLink = ({ title, type, href }: Props) => {
  const icon =
    type === "joined" ? "calendar" : type === "location" ? "location" : "link";

  return (
    <div className="flex items-center gap-2">
      <Icons type={icon} size={20} color="#7B8EC8" className="text-light-500" />
      {href ? (
        <Link className="text-[#1DA1F2]" href={href}>
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700 ">{title}</p>
      )}
    </div>
  );
};
