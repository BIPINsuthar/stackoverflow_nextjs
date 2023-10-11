import { Props } from "./types";

export const Button = ({ title, type, width, onClick, isDisabled }: Props) => {
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      className={`${
        isDisabled
          ? "bg-gray-500"
          : type == "gradient"
          ? "primary-gradient"
          : type == "light"
          ? "light-border-2 border background-light800_dark400"
          : type == "secondary"
          ? "background-light800_dark400"
          : "background-light700_dark400"
      }  items-center px-4 py-2 rounded-lg ${
        width == "fit" ? "w-fit" : "w-full"
      }`}
    >
      <span
        className={`${
          isDisabled
            ? "text-light-700"
            : type == "light"
            ? "text-dark300_light900"
            : type == "secondary"
            ? "primary-text-gradient"
            : "text-dark400_light900"
        } paragraph-medium`}
      >
        {isDisabled ? "Submiting..." : title}
      </span>
    </button>
  );
};
