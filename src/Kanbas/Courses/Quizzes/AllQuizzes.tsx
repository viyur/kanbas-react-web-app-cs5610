import { Link, useParams } from "react-router-dom";

export default function AllQuizzes() {
  const { cid } = useParams();

  return (
    <div>
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>ALL Quizzes Screen</div>
      <div>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/1`}>Quizzes Details</Link>
      </div>
    </div>
  );
}
