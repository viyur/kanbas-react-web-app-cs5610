import { useParams } from "react-router-dom";

export default function QuizDetailsEdit() {
  return (
    <div>
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>Quiz Details Edit Screen</div>
    </div>
  );
}
