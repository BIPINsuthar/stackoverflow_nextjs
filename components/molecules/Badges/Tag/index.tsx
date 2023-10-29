import { Icons } from "@/components/atoms";
import { Props } from "./tyeps";

export const Tag = ({ label, onDelete, size, isActive }: Props) => {
  return (
    <section
      className={`cursor-pointer background-light800_dark300 flex gap-2 rounded-md w-fit ${
        size == "big" ? "p-2.5" : "p-2"
      }`}
    >
      <p
        className={`${
          isActive ? "primary-text-gradient" : "text-light400_light500"
        } ${size == "big" ? "small-medium" : "subtle-medium"} line-clamp-1`}
      >
        {label.toUpperCase()}
      </p>
      {onDelete && (
        <Icons
          onClick={onDelete}
          type="close"
          size={12}
          className="cursor-pointer invert-colors"
        />
      )}
    </section>
  );
};
