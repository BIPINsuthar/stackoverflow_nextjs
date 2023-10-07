import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Theme } from "./Theme";

export const NavBar = () => {
  return (
    <nav className="background-light850_dark100 flex items-center justify-between sm:px-12 p-6 w-full shadow-light-300 fixed z-50">
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
        MobileNavigationBar
      </div>
    </nav>
  );
};
