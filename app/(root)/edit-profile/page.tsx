import { Button } from "@/components/molecules";
import { Input } from "@/components/molecules/Input";

export default function EditProfile() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <Input label="Full Name" />
      <Input label="Username" />
      <Input label="Portfolio link" />
      <Input label="Localtion" />
      <Input label="Bio" type="textarea" />
      <Button title="Submit" type="gradient" width="fit" />
    </div>
  );
}
