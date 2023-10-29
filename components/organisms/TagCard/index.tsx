import { Tag } from "@/components/molecules/Badges";
import { Props } from "./types";

export const TagCard = ({ name, totalQuestions }: Props) => {
  return (
    <div className="light-border flex flex-col max-w-[250px] max-sm:max-w-full border rounded-lg gap-4 p-4">
      <Tag label={name} />
      <p className="small-regular text-dark500_light700">
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS
      </p>
      <div className="flex items-center gap-4">
        <p className="body-semibold text-dark400_light500">{totalQuestions}+</p>
        <p className="small-medium text-dark400_light500">Questions</p>
      </div>
    </div>
  );
};
