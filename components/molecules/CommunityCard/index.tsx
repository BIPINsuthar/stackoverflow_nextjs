import Image from "next/image";
import { Tag } from "../Badges";
import { Props } from "./types";

export const CommunityCard = async ({
  name,
  userName,
  picture,
  userId,
}: Props) => {
  return (
    <div className="flex border w-fit items-center light-border-2 h-fit max-w-[260px] shadow-light100_dark100 flex-col gap-4 rounded-lg p-4">
      <Image
        src={picture}
        width={100}
        height={100}
        alt="Avtar"
        className="invert-colors rounded-full"
      />
      <h3 className="h3-bold text-dark200_light900">{name}</h3>
      <p className="body-regular text-dark500_light500">@{userName}</p>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        {[1, 2, 3].map((item) => {
          return <Tag key={item} label="Javascript" />;
        })}
      </div>
    </div>
  );
};
