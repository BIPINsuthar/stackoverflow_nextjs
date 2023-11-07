export interface Props {
  type?: "answer" | "question";
  count: number;
  userId: string | null | undefined;
  itemId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  actionType?: "upVote" | "downVote";
}
