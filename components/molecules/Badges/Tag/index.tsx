import { Icons } from "@/components/atoms";
import { Props } from "./tyeps";

export const Tag = ({ label, onDelete }: Props) => {
  return (
    <section className="background-light800_dark300 flex gap-2 rounded-md p-2 w-fit">
      <p className="text-light400_light500 subtle-medium line-clamp-1">
        {label.toUpperCase()}
      </p>
      {onDelete && (
        <Icons
          onClick={onDelete}
          type="close"
          size={12}
          className="cursor-pointer"
        />
      )}
    </section>
  );
};
