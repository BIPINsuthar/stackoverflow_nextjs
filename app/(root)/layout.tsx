import React from "react";

import * as Components from "../../components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Components.Shared.NavBar />
      <div className="flex bg-red-500">
        LeftSideBar
        <section>{children}</section>
        RightSideBar
      </div>
    </main>
  );
};

export default Layout;
