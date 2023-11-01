import { Badges } from "@/components/molecules";
import Image from "next/image";
import Link from "next/link";

import * as Actions from "../../../lib/actions";

export const RightSideBar = async () => {
  const hotQuestions = await Actions.getHotQuestions();
  const popularTags = await Actions.getPopularTags();

  return (
    <section className="flex pt-10 flex-col gap-10 light-border sticky right-0 top-0 h-screen background-light900_dark200 border-l p-4 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[330px] max-xl:hidden custom-scrollbar">
      <div className="flex flex-col gap-6">
        <h3 className="text-dark200_light900 h3-bold font-inter">
          Hot Network
        </h3>
        <div className="flex flex-col gap-6">
          {hotQuestions.map((item) => {
            return (
              <Link
                key={item._id}
                href={`/question/${item._id}`}
                className="flex-between"
              >
                <p className="text-dark500_light700 body-medium">
                  {item.title}
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
          {popularTags.map((item) => {
            return (
              <div className="flex-between" key={item._id}>
                <Badges.Tag label={item.name} />
                <p className="small-medium text-dark500_light700">
                  {item.numberOfQuestions}+
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
