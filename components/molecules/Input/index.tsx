import { Props } from "./types";

export const Input = ({ label, type }: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <p className="paragraph-semibold text-dark400_light800">{label}</p>
        <p className="text-red-600">*</p>
      </div>
      {type == "textarea" ? (
        <textarea className="p-4 h-28 border light-border-2 background-light800_dark300 rounded-lg outline-none w-full text-dark300_light800 paragraph-semibold" />
      ) : (
        <input className="p-4 border light-border-2 background-light800_dark300 rounded-lg outline-none w-full text-dark300_light800 paragraph-semibold" />
      )}
    </section>
  );
};
