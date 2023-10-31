"use client";
import { Icons } from "@/components/atoms";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { Props } from "./types";
import * as Actions from "../../../../lib/actions";
import { usePathname, useRouter } from "next/navigation";

export const EditDeleteAction = ({ userId, type, itemId }: Props) => {
  const { userId: clerkId } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  const showActionButtons = clerkId && clerkId === userId;

  const handleEditAction = () => {
    router.push(`/question/edit/${itemId}`);
  };

  const handleDeleteAction = async () => {
    if (type == "question") {
      await Actions.deleteQuestion({
        questionId: itemId,
        path: pathName,
      });
    } else if (type == "answer") {
      await Actions.deleteAnswer({
        answerId: itemId,
        path: pathName,
      });
    }
  };

  return (
    showActionButtons && (
      <SignedIn>
        <section className="flex items-center gap-4">
          {type == "question" && (
            <Icons type="edit" onClick={handleEditAction} />
          )}
          <Icons type="trash" onClick={handleDeleteAction} />
        </section>
      </SignedIn>
    )
  );
};
