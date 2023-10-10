"use client";
import React from "react";

import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

import * as Molecules from "../../molecules";
import * as Organisms from "../../organisms";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={"/assets/icons/search.svg"}
          height={20}
          width={20}
          alt="Humburger"
          className="sm:hidden invert-colors cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark300">
        <SheetClose asChild>
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              width={23}
              height={23}
              src="/assets/images/site-logo.svg"
              alt="Dev"
            />
            <p className="h2-bold font-spaceGrotesk text-dark100_light900">
              Dev
              <span className="text-primary-500">Overflow</span>
            </p>
          </Link>
        </SheetClose>
        <div className="flex flex-col gap-4">
          <Organisms.NavContent />

          <SignedOut>
            <div className="flex flex-col gap-4">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Molecules.Button type="secondary" title="LogIn" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Molecules.Button title="SignUp" />
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
