import { Routes, Route, useParams, Link } from "react-router-dom";
import AllQuizzes from "./AllQuizzes";
import QuizDetails from "./QuizDetails";
import QuizQuestions from "./QuizQuestions";
import QuizDetailsEdit from "./QuizDetailsEdit";

export default function Quizzes() {
  const { cid } = useParams();
  return (
    <div>
      <div>
        <Routes>
          {/* 展示所有 quizzes */}
          <Route path="/" element={<AllQuizzes />} />
          {/* 展示单个 quiz 的详细信息 */}
          <Route path=":quizId" element={<QuizDetails />} />
          {/* 编辑单个 quiz */}
          <Route path=":quizId/Edit" element={<QuizDetailsEdit />} />
          {/* 单个 quiz 的 questions */}
          <Route path=":quizId/Edit/Questions" element={<QuizQuestions />} />
        </Routes>
      </div>
    </div>
  );
}
