"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as Molecules from "../../molecules";
import * as Constants from "../../../constants";

export const NavContent = () => {
  const pathName = usePathname();

  return (
    <section className="flex flex-col w-fit p-2 h-full pt-16 max-w-[250px]">
      {Constants.sidebarLinks.map((item) => {
        const isActive = pathName == item.route;

        return (
          <Link href={item.route}>
            <Molecules.ListMenu
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
