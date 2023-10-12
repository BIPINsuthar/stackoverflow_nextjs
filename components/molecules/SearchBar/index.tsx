import Image from "next/image";

export const SearchBar = () => {
  return (
    <section className="w-full relative max-lg:hidden light-border border rounded-lg">
      <Image
        src={"/assets/icons/search.svg"}
        width={20}
        height={20}
        className="absolute top-4 left-4 text-light-500"
        alt="serach"
      />
      <input
        placeholder="Search anything globally"
        className="p-4 rounded-md w-full pl-12 outline-none dark:dark-gradient bg-light-800 placeholder:text-light400_light500 paragraph-regular text-light400_light500"
      />
    </section>
  );
};
