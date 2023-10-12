import React from "react";
import "./globals.css";
import type { Metadata } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import * as Context from "../context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Dev overflow",
  description: "my first nextjs full stack project",
  icons: {
    icon: "/assets/images/site-log.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
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
              formFieldWarningText: "text-red-600",
            },
          }}
        >
          <Context.ThemeProvider>{children}</Context.ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
