import React from "react";

import { LeftSideBar, NavBar, RightSideBar } from "@/components/shared";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col background-light850_dark100 relative">
      <NavBar />
      <div className="flex pt-24">
        <LeftSideBar />
        <section className="flex flex-1 overflow-y-auto min-h-screen pt-10 p-6 flex-col">
          {children}
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
