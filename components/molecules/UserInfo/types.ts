export interface Props {
  name: string;
  picture: string;
  date: Date;
  type?: "Question" | "Answer";
}
