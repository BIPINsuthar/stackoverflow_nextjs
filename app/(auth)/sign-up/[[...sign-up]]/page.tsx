import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center py-10">
      <SignUp />
    </div>
  );
}
