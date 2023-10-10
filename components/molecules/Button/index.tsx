import { Props } from "./types";

export const Button = ({ title, type }: Props) => {
  return (
    <button
      className={`${
        type == "secondary"
          ? "background-light800_dark400"
          : "background-light700_dark400"
      }  items-center w-full p-2 rounded-lg`}
    >
      <span
        className={`${
          type == "secondary"
            ? "primary-text-gradient"
            : "text-dark400_light900"
        }`}
      >
        {title}
      </span>
    </button>
  );
};
