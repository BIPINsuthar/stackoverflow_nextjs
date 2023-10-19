export interface Props {
  type?: "answer" | "question";
  count: number;
  isFilled?: boolean;
  userId: string;
  itemId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  actionType?: "upVote" | "downVote";
}
