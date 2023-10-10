import Image from "next/image";

export const AchivementCard = () => {
  return (
    <section className="light-border border px-6 py-4 flex itemce gap-4 rounded-lg w-full max-w-[240px] max-sm:max-w-full">
      <Image
        width={35}
        height={45}
        src={"/assets/icons/gold-medal.svg"}
        alt="Achivement"
      />
      <div className="flex flex-col gap-2">
        <p className="paragraph-semibold text-dark200_light900">15</p>
        <p className="body-medium text-dark400_light700">Gold Badges</p>
      </div>
    </section>
  );
};
