import Image from "next/image";
import { Tag } from "../Badges";

export const CommunityCard = () => {
  return (
    <div className="flex border w-fit items-center light-border-2 h-full max-w-[260px] shadow-light100_dark100 flex-col gap-4 rounded-lg p-4">
      <Image
        src={"/assets/icons/avatar.svg"}
        width={100}
        height={100}
        alt="Avtar"
        className="invert-colors"
      />
      <h3 className="h3-bold text-dark200_light900">David Ramero</h3>
      <p className="body-regular text-dark500_light500">@bobur_mavlonov</p>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        {[1, 2, 3].map((item) => {
          return <Tag key={item} label="Javascript" />;
        })}
      </div>
    </div>
  );
};
