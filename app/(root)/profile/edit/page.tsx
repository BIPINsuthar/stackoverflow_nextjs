import { EditProfileForm } from "@/components/forms/EditProfile";

import * as Actions from "../../../../lib/actions";
import { auth } from "@clerk/nextjs";

const EditProfile = async ({}) => {
  const { userId } = auth();

  const userDetail = await Actions.getUserInfo(userId!);
  const user = userDetail.user;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <EditProfileForm
        bio={user.bio ?? ""}
        fullName={user.name}
        location={user.location ?? ""}
        portfolioLink={user.portfolioWebsite ?? ""}
        userName={user.username}
      />
    </div>
  );
};

export default EditProfile;
