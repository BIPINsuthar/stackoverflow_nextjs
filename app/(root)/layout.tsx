import React from "react";

import * as Components from "../../components";
import { NavBar } from "@/components/shared";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex bg-red-500">
        LeftSideBar
        <section>{children}</section>
        RightSideBar
      </div>
    </main>
  );
};

export default Layout;
