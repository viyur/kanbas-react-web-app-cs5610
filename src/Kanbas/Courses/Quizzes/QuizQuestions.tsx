import { useParams } from "react-router-dom";

export default function QuizQuestions() {
  return (
    <div>
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>Quiz Questions Editor Screen</div>
    </div>
  );
}
