import Image from "next/image";
import { Country, Tag } from "../Badges";

export const JobCard = () => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border light-border-2">
      <Image
        src={"/assets/icons/avatar.svg"}
        alt="Avtar"
        width={64}
        height={64}
        className="invert-colors"
      />
      <div className="flex flex-col gap-4">
        <div className="flex-between max-lg:flex-col max-lg:items-start max-lg:gap-2">
          <div className="flex items-center gap-3">
            <p className="base-semibold text-dark200_light900">
              Principal Salesforce Developer
            </p>
            <Tag label="Developer" />
          </div>
          <Country />
        </div>
        <p className="body-regular text-dark500_light700">
          About the Company Join AT&T and reimagine the communications and
          technologies that connect the world.
        </p>
        <div className="flex-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/icons/calendar.svg"}
                alt="Avtar"
                width={20}
                height={20}
              />
              <p className="text-light-500 body-medium">full-time</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/icons/calendar.svg"}
                alt="Avtar"
                width={20}
                height={20}
              />
              <p className="text-light-500 body-medium">full-time</p>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="primary-text-gradient body-semibold">View job</p>
            <Image
              src={"/assets/icons/arrow-up-right.svg"}
              alt="Avtar"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
