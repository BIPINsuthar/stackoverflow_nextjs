import { AchivementCard, Button } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";
import { QuestionCard } from "@/components/organisms";
import Image from "next/image";

export default function Profile() {
  return (
    <section className="flex flex-1 flex-col gap-6">
      {/* header section */}
      <div className="flex items-start">
        <Image
          width={140}
          height={140}
          src={"/assets/icons/avatar.svg"}
          alt="Avtar"
          className="invert-colors"
        />
        <div className="flex flex-col gap-4">
          <div className="flex-between">
            <h1 className="h1-bold text-dark100_light900">Faizan JSM</h1>
            <Button title="Edit Profile" type="light" width="fit" />
          </div>
          <p className="paragraph-regular text-dark200_light900">@faizan</p>
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              src={"/assets/icons/avatar.svg"}
              alt="Avtar"
              className="invert-colors"
            />
            <p className="paragraph-medium text-dark400_light700">
              Mumbai, India
            </p>
          </div>
          <p className="paragraph-regular text-dark400_light800">
            Launch your development career with project-based coaching -
            showcase your skills with practical development experience and land
            the coding career of your dreams. Check out jsmastery.pro
          </p>
        </div>
      </div>

      <p className="paragram-medium text-dark200_light800">Stats</p>
      <div className="flex items-center justify-between gap-4">
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
        <AchivementCard />
      </div>
      <div className="flex items-start gap-6">
        <div className="flex flex-[0.6] flex-col items-center gap-4">
          <h2 className="h2-semibold text-dark200_light900">Top Posts</h2>
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <Button title="Load More" type="secondary" width="fit" />
        </div>
        <div className="flex flex-[0.4] flex-col gap-4">
          <h2 className="h2-semibold text-dark200_light900">Top Tags</h2>
          <div className="flex-between">
            <Tag label="JAVASCRIPTI" />
            <Tag label="JAVASCRIPTI" />
          </div>
        </div>
      </div>
    </section>
  );
}
