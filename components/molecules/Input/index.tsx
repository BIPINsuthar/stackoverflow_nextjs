import { Props } from "./types";

export const Input = ({
  label,
  type,
  extraText,
  onkeydown,
  onChange,
  value,
  error,
  placeholder,
}: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <p className="paragraph-semibold text-dark400_light800">{label}</p>
        <p className="text-red-600">*</p>
      </div>
      <div className="flex flex-col gap-2">
        {type == "textarea" ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="p-4 h-28 border light-border-2 background-light800_dark300 rounded-lg outline-none w-full text-dark300_light800 paragraph-semibold"
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onkeydown}
            className="p-4 border light-border-2 background-light800_dark300 rounded-lg outline-none w-full text-dark300_light800 paragraph-semibold"
          />
        )}
        {error ? (
          <p className="text-red-600 small-regular">{error}</p>
        ) : extraText ? (
          <p className="text-light-500 body-regular">{extraText}</p>
        ) : null}
      </div>
    </section>
  );
};
