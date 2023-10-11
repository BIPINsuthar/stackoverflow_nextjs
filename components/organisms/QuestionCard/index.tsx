import Image from "next/image";

import * as Molecules from "../../molecules";
import { Icons } from "@/components/atoms";
import { Props } from "./types";

export const QuestionCard = ({ onClick }: Props) => {
  return (
    <section
      onClick={onClick}
      className="flex flex-col gap-6 rounded-lg background-light900_dark200 p-6 light-border-2 border cursor-pointer"
    >
      <h3 className="h3-semibold text-dark200_light900 line-clamp-2">
        The Lightning Component c:LWC_PizzaTracker generated invalid output for
        field status. Error How to solve this
      </h3>
      <div className="flex items-center flex-grow gap-2">
        {["javascript", "reactnative", "nextjs", "nodejs"].map((item) => {
          return <Molecules.Badges.Tag label={item} />;
        })}
      </div>
      <div className="text-dark400_light700 flex items-center justify-between  max-lg:flex-col max-lg:items-start max-lg:gap-2">
        <div className="flex items-center gap-2">
          <Icons type="avatar" />
          <p className="body-medium">Satheesh</p>
          <p className="small-regular">• asked 2 mins ago</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Image
              width={20}
              height={20}
              alt="Avtar"
              src={"/assets/icons/like.svg"}
            />
            <p className="small-medium">1.2k</p>
            <p className="small-regular">Votes</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              width={20}
              height={20}
              alt="Avtar"
              src={"/assets/icons/message.svg"}
            />
            <p className="small-medium">1.2k</p>
            <p className="small-regular">Votes</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              width={20}
              height={20}
              alt="Avtar"
              src={"/assets/icons/eye.svg"}
            />
            <p className="small-medium">1.2k</p>
            <p className="small-regular">Votes</p>
          </div>
        </div>
      </div>
    </section>
  );
};
