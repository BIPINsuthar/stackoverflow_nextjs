import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Theme } from "./Theme";

import * as Templates from "../../templates";
import * as Molecules from "../../molecules";

export const NavBar = () => {
  return (
    <nav className="flex-between background-light900_dark200 z-50 w-full gap-5 border-b light-border p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          width={23}
          height={23}
          src="/assets/images/site-logo.svg"
          alt="Dev"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev
          <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <Molecules.GlobalSearch />
      <div className="flex items-center gap-6">
        <Theme />
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
        <Templates.MobileNav />
      </div>
    </nav>
  );
};
