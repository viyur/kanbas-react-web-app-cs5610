import { Link, useParams } from "react-router-dom";

export default function QuizDetails() {
  const { cid, quizId } = useParams();

  return (
    <div>
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>Quiz Details Screen</div>
      <div>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`}>
          Quiz Details Edit
        </Link>
      </div>
    </div>
  );
}
