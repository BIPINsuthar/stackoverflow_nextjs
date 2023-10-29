"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as Molecules from "../../molecules";
import * as Constants from "../../../constants";
import { SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@clerk/nextjs";

export const NavContent = () => {
  const pathName = usePathname();

  const { userId } = useAuth();

  return (
    <section className="flex flex-col w-full p-2 h-full pt-16">
      {Constants.sidebarLinks.map((item) => {
        const isActive = pathName == item.route;

        if (item.route == "/profile") {
          if (userId) {
            item.route = `/profile/${userId}`;
          } else {
            return null;
          }
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link href={item.route}>
              <Molecules.ListMenu
                title={item.label}
                icon={item.imgURL}
                isActive={isActive}
              />
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
