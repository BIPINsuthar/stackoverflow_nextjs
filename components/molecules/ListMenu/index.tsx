import Image from "next/image";
import { Props } from "./types";

export const ListMenu = ({ isActive, title, icon, isLeftSideBar }: Props) => {
  return (
    <div
      className={`p-4 mt-1 flex items-center gap-4 rounded-md w-full hover:primary-gradient ${
        isActive && "primary-gradient"
      }`}
    >
      <Image
        src={icon}
        height={20}
        width={20}
        alt="Calendar"
        className="invert-colors"
      />
      <span
        className={`${
          isActive ? "base-bold" : "base-medium"
        } paragraph-medium text-dark300_light700  ${
          isLeftSideBar && "max-md:hidden"
        }`}
      >
        {title}
      </span>
    </div>
  );
};
