import { QuestionCard } from "@/components/organisms";
import { EmptyQuestions } from "./components/EmptyQuestions";

export default function Collections() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <EmptyQuestions />
    </div>
  );
}
