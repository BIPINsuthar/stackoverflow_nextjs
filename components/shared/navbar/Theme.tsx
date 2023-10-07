"use client";
import React from "react";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@radix-ui/react-menubar";
import Image from "next/image";

import { useTheme } from "@/context";

import * as Constants from "../../../constants";

export const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none z-10">
      <MenubarMenu>
        <MenubarTrigger>
          <Image
            width={16}
            height={16}
            src={`/assets/icons/${mode == "light" ? "sun.svg" : "moon.svg"}`}
            className="cursor-pointer"
            alt="Dev"
          />
        </MenubarTrigger>
        <MenubarContent
          className={`absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 backgroud-light900_dark300`}
        >
          {Constants.themes.map((item) => {
            return (
              <>
                <MenubarItem
                  onClick={() => {
                    setMode(item.value);
                    if (item.value != "system") {
                      localStorage.theme = item.value;
                    } else {
                      localStorage.removeItem("theme");
                    }
                  }}
                  className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 focus:bg-light-800"
                >
                  <Image
                    width={16}
                    height={16}
                    src={item.icon}
                    className=" text-primary-500"
                    alt="Dev"
                  />
                  <p
                    className={`body-semibold  
                        ${
                          mode == item.value
                            ? "text-primary-500"
                            : "text-light-500"
                        }
                        `}
                  >
                    {item.label}
                  </p>
                </MenubarItem>
              </>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
