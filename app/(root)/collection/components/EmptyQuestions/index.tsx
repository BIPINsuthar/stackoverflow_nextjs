"use client";
import { Button } from "@/components/molecules";
import { useTheme } from "@/context";
import Image from "next/image";
import Link from "next/link";

export const EmptyQuestions = () => {
  const { mode } = useTheme();

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4">
      <Image
        src={`/assets/images/${
          mode == "dark" ? "dark-illustration.png" : "light-illustration.png"
        }`}
        width={256}
        height={200}
        alt="Image"
      />
      <h2 className="h2-bold text-dark200_light800">
        There’s no question to show
      </h2>
      <p className="body-regular text-dark500_light700 text-center max-w-sm">
        Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡
      </p>
      <Link href={"/ask-question"}>
        <Button title="Ask a Question" type="gradient" width="fit" />
      </Link>
    </section>
  );
};
