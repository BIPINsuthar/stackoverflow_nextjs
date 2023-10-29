"use client";
import Link from "next/link";
import * as Molecules from "../../molecules";
import * as Constants from "../../../constants";
import { usePathname } from "next/navigation";

export const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <section className="flex pt-10 flex-col light-border sticky left-0 top-0 h-screen  background-light900_dark200 border-r p-4 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar">
      {Constants.sidebarLinks.map((item) => {
        const isActive = pathName == item.route;

        return (
          <Link href={item.route} key={item.route}>
            <Molecules.ListMenu
              isLeftSideBar
              title={item.label}
              icon={item.imgURL}
              isActive={isActive}
            />
          </Link>
        );
      })}
    </section>
  );
};
