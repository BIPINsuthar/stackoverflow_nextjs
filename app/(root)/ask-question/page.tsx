import { Button } from "@/components/molecules";
import { Input } from "@/components/molecules/Input";

export default function Collections() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <Input label="Question Title" />
      <Input label="Tags" />
      <Button title="Ask a Question" type="gradient" width="fit" />
    </div>
  );
}
