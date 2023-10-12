import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <SignUp />
    </div>
  );
}
