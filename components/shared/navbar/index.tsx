import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Theme } from "./Theme";

import * as Templates from "../../templates";

import { GlobalSearch } from "@/components/search/GlobalSearch";

export const NavBar = () => {
  return (
    <nav className="fixed flex-between background-light900_dark200 z-50 w-full gap-5 border-b light-border p-6 shadow-light-300 dark:shadow-none sm:px-12">
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
      <div className="w-full max-w-[600px]">
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-6">
        <Theme />
        <SignedIn>
          {/* 
        formButtonPrimary: "primary-gradient",
              card: "background-light800_dark400",
              headerTitle: "text-dark300_light900",
              headerSubtitle: "text-dark400_light700",
              socialButtonsBlockButton: "primary-gradient",
              dividerLine: "bg-gray-500",
              dividerText: "text-primary-500",
              formFieldLabel: "paragraph-semibold text-dark400_light800",
              formFieldInput: " background-light800_dark300",
              footerActionText: "text-dark400_light700",
              footerActionLink: "primary-text-gradient",
              formFieldWarningText: "text-red-600", */}
          <UserButton
            appearance={{
              variables: {
                colorPrimary: "#ff7000",
              },
              elements: {
                avatarBox: "h-10 w-10",
                userPreviewMainIdentifier: "text-dark300_light900",
                userPreviewSecondaryIdentifier: "text-dark400_light700",
                profileSectionTitleText: "text-dark400_light700",
                userButtonPopoverActionButtonIconBox: "invert-colors",
                userButtonPopoverActionButtonText: "text-dark400_light700",
                internaltd400p: "text-dark400_light700",
                userButtonPopoverActionButtonIcon: "invert-colors",
                userButtonPopoverActionButton__signOut: "invert-colors",
                navbarMobileMenuButtonIcon: "invert-colors bg-grey-500",
                navbarMobileMenuButton: "text-dark400_light700",
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
