import { Props } from "./tyeps";

export const Tag = ({ label }: Props) => {
  return (
    <section className="background-light800_dark300 rounded-md p-2 w-fit">
      <p className="text-light400_light500 subtle-medium">
        {label.toUpperCase()}
      </p>
    </section>
  );
};
