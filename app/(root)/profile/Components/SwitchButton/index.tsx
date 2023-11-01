"use client";
import { useState } from "react";
import { Props } from "./types";

export const SwitchButton = ({ questions, answers }: Props) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <section className="flex w-fit rounded-xl items-center">
        <div
          onClick={() => {
            setSelected(0);
          }}
          className={`w-fit cursor-pointer py-4 px-6 rounded-l-xl ${
            selected == 0
              ? "background-light700_dark400"
              : "background-light800_dark300"
          }`}
        >
          <p
            className={`body-semibold  ${
              selected == 0 ? "primary-text-gradient" : "text-light-500"
            }`}
          >
            questions
          </p>
        </div>
        <div
          onClick={() => {
            setSelected(1);
          }}
          className={`w-fit cursor-pointer py-4 px-6 rounded-r-xl ${
            selected == 1
              ? "background-light700_dark400"
              : "background-light800_dark300"
          }`}
        >
          <p
            className={`body-semibold  ${
              selected == 1 ? "primary-text-gradient" : "text-light-500"
            }`}
          >
            Answers
          </p>
        </div>
      </section>
      {selected == 0 ? questions : answers}
    </>
  );
};
