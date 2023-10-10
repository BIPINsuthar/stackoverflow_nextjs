import Image from "next/image";

export const Country = () => {
  return (
    <section className="flex items-center gap-2 background-light800_dark300 rounded-full py-1 px-2 w-fit">
      <Image
        alt="Avatar"
        width={16}
        height={16}
        src={"/assets/icons/avatar.svg"}
      />
      <p className="text-dark400_light700 body-medium">Melbourne, AU</p>
    </section>
  );
};
