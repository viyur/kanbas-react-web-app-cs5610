import { useParams, useNavigate } from "react-router-dom";

// `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions` => QuizQuestions Screen

export default function QuizQuestionsEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>Quiz Questions Editor Screen</div>
      <div>
        <button
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionedit`)
          }
        >
          {" "}
          Add Question
        </button>
      </div>
    </div>
  );
}
