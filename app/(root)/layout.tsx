import React from "react";

import { LeftSideBar, NavBar, RightSideBar } from "@/components/shared";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex flex-1 min-h-screen">{children}</section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
