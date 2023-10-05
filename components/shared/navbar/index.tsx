"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import * as Context from "../../../context";
import * as Constants from "../../../constants";

export const NavBar = () => {
  const { mode, handleThemeChange } = Context.useTheme();

  return (
    <nav className="background-light850_dark100 flex items-center justify-between sm:px-12 p-6 w-full shadow-light-300">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          width={23}
          height={23}
          src="/assets/images/site-logo.svg"
          alt="Dev"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          Dev
          <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      GlobalSearch
      <div className="flex items-center gap-4">
        {Constants.themes.map((item) => {
          return (
            <Image
              onClick={() => handleThemeChange()}
              width={23}
              height={23}
              src={`/assets/icons/${
                item.value == "dark" ? "sun.svg" : "moon.svg"
              }`}
              alt="Dev"
            />
          );
        })}
        <SignedIn>
          <UserButton
            appearance={{
              variables: {
                colorPrimary: "#ff7000",
              },
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
        {/* MobileNavigationBar */}
      </div>
    </nav>
  );
};
