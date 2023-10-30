import { AchivementCard, Button } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";
import Image from "next/image";
import Link from "next/link";

import * as Actions from "../../../../lib/actions";
import { Icons } from "@/components/atoms";

// @ts-ignore
const Profile = async ({ params }) => {
  const user = await Actions.getUserById(params.id);
  const questions = await Actions.return(
    <section className="flex flex-1 flex-col gap-6">
      {/* header section */}
      <div className="flex items-start max-md-col gap-4">
        <Icons uri={user.picture} size={140} className="rounded-full" />
        <div className="flex flex-col gap-4">
          <div className="flex-between max-md-col">
            <h1 className="h1-bold text-dark100_light900">{user.name}</h1>
            <Link href={"/edit-profile"}>
              <Button title="Edit Profile" type="light" width="fit" />
            </Link>
          </div>
          <p className="paragraph-regular text-dark200_light900">
            @{user.username}
          </p>
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              src={"/assets/icons/avatar.svg"}
              alt="Avtar"
              className="invert-colors"
            />

            <p className="paragraph-medium text-dark400_light700">
              {user.location ?? "---"}
            </p>
          </div>
          <p className="paragraph-regular text-dark400_light800">{user.bio}</p>
        </div>
      </div>
      <p className="paragram-medium text-dark200_light800">Stars</p>
      <div className="flex items-center gap-4 flex-wrap">
        {/* <AchivementCard /> */}
        <AchivementCard type="Gold" />
        <AchivementCard type="Silver" />
        <AchivementCard type="Bronze" />
      </div>
      <div className="flex items-start gap-6 max-md-col">
        <div className="flex flex-[0.6] flex-col items-center gap-4">
          <h2 className="h2-semibold text-dark200_light900">Top Posts</h2>

          <Button title="Load More" type="secondary" width="fit" />
        </div>
        <div className="flex flex-[0.4] flex-col gap-4">
          <h2 className="h2-semibold text-dark200_light900">Top Tags</h2>
          <div className="flex-between gap-2">
            <Tag label="JAVASCRIPTI" />
            <Tag label="JAVASCRIPTI" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
