import { Molecules } from "@/components";
import { Badges } from "@/components/molecules";
import Image from "next/image";
import Link from "next/link";

export const RightSideBar = () => {
  return (
    <section className="flex pt-10 flex-col gap-10 light-border sticky right-0 top-0 h-screen overflow-y-auto background-light900_dark200 border-l p-4 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[330px] max-xl:hidden custom-scrollbar">
      <div className="flex flex-col gap-6">
        <h3 className="text-dark200_light900 h3-bold font-inter">
          Hot Network
        </h3>
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map((item) => {
            return (
              <Link href={"/"} className="flex-between">
                <p className="text-dark500_light700 body-medium">
                  Would it be appropriate to point out an error in another paper
                  during a referee report?
                </p>
                <Image
                  alt="RightArrow"
                  width={20}
                  height={20}
                  className="invert-colors"
                  src={"/assets/icons/chevron-right.svg"}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-dark200_light900 h3-bold font-inter">
          Popular Tags
        </h3>
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map((item) => {
            return (
              <div className="flex-between" key={item}>
                <Badges.Tag label="Javascript" />
                <p className="small-medium text-dark500_light700">20152+</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
