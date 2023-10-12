import { Icons } from "@/components/atoms";

export const UserInfo = () => {
  return (
    <div className="flex items-center gap-2">
      <Icons type="avatar" size={24} />
      <p className="body-semibold text-dark300_light700">Philip Martin</p>
      <p className="small-regular text-light400_light500">
        • answered Aug 6, 2022 at 21:01
      </p>
    </div>
  );
};
