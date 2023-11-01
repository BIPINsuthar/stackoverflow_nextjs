import { AchivementCard, Button, ProfileLink } from "@/components/molecules";
import Link from "next/link";

import * as Actions from "../../../../lib/actions";
import { Icons } from "@/components/atoms";
import moment from "moment";
import { TopAnswers } from "../Components/TopAnswers";
import { TopQuestions } from "../Components/TopQuestions";
import { SwitchButton } from "../Components/SwitchButton";

// @ts-ignore
const Profile = async ({ params }) => {
  if (!params.id) return null;
  const userInfo = await Actions.getUserInfo(params.id);

  const user = userInfo.user;

  return (
    <section className="flex flex-1 flex-col gap-8">
      {/* header section */}
      <div className="flex items-start max-md-col gap-4">
        <Icons uri={user.picture} size={140} className="rounded-full" />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex-between max-md-col w-full">
            <h1 className="h1-bold text-dark100_light900">{user.name}</h1>
            <Link href={`/profile/edit`}>
              <Button title="Edit Profile" type="light" width="fit" />
            </Link>
          </div>
          <p className="paragraph-regular text-dark200_light900">
            @{user.username}
          </p>
          <div className="flex items-center gap-4">
            {user.portfolioWebsite && (
              <ProfileLink
                type="profileLink"
                href={user.portfolioWebsite}
                title={user.portfolioWebsite}
              />
            )}
            {user.location && (
              <ProfileLink type="location" title={user.location} />
            )}
            <ProfileLink
              type="joined"
              title={moment(user.joinedAt.toString()).format("MMMM YYYY")}
            />
          </div>
          <p className="paragraph-regular text-dark400_light800">{user.bio}</p>
        </div>
      </div>
      <h3 className="paragram-medium text-dark200_light800 h3-semibold">
        Stars
      </h3>
      <div className="flex items-center gap-4 flex-wrap">
        <section className="background-light900_dark200 light-border border px-6 py-4 flex itemce gap-10 rounded-lg w-full max-w-[240px] max-sm:max-w-full">
          <div className="flex flex-col gap-2">
            <p className="paragraph-semibold text-dark200_light900">
              {userInfo.totalQuestions}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="paragraph-semibold text-dark200_light900">
              {userInfo.totalAnswers}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </section>
        <AchivementCard type="Gold" />
        <AchivementCard type="Silver" />
        <AchivementCard type="Bronze" />
      </div>
      <SwitchButton
        questions={<TopQuestions userId={user._id} />}
        answers={<TopAnswers userId={user._id} />}
      />
    </section>
  );
};

export default Profile;
