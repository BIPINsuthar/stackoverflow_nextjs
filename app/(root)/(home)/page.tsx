"use client";
import { UserButton } from "@clerk/nextjs";

import * as Context from "../../../context";

export default function Home() {
  const { mode } = Context.useTheme();

  return (
    <div className="bg-light-400">
      {mode}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
