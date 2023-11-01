"use client";
import { Icons } from "@/components/atoms";
import { useState } from "react";
import { Props } from "./types";

export const Filter = ({ options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="flex flex-col w-[350px] relative border light-border rounded-md "
    >
      <div className="cursor-pointer  dark:dark-gradient bg-light-800 p-4 ">
        <div className="flex items-center gap-4 ">
          <Icons type="filter" />
          <p className="small-semibold text-dark500_light700 line-clamp-1">
            {value ? value : "Select Item"}
          </p>
          <div className="absolute right-4">
            <Icons type="mingcute-down-line" />
          </div>
        </div>
      </div>
      <div
        className={`z-50 absolute ${
          open ? "visible" : "hidden"
        } border light-border top-16 background-light900_dark200 py-4  rounded-md w-full`}
      >
        {options.map((item) => {
          return (
            <div
              onClick={() => {
                if (onChange) {
                  onChange(item);
                }
              }}
              className={`p-4 ${
                item === value ? "background-light700_dark400" : ""
              } cursor-pointer`}
            >
              <p
                className={`small-semibold ${
                  item === value ? "primary-text-gradient" : "text-light-500"
                }`}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
