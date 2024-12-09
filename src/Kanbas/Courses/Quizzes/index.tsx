import { Routes, Route, useParams, Link } from "react-router-dom";
import QuizList from "./QuizList";
import QuizDetails from "./QuizDetails";
import QuizDetailsEdit from "./QuizDetailsEdit";
import QuestionEditForm from "./Questions/QuestionEditForm";

export default function Quizzes() {
  const { cid } = useParams();
  return (
    <div>
      <div>
        <Routes>
          {/* 展示所有 quizzes */}
          <Route path="/" element={<QuizList />} />
          {/* 展示单个 quiz 的详细信息 `/Kanbas/Courses/${cid}/Quizzes/1`*/}
          <Route path=":quizId" element={<QuizDetails />} />
          {/* 编辑单个 quiz `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`*/}
          <Route path=":quizId/Edit/*" element={<QuizDetailsEdit />} />
          {/* for edit questions */}
          <Route path=":quizId/questionedit" element={<QuestionEditForm />} />
          <Route
            path=":quizId/questionedit/:questionId"
            element={<QuestionEditForm />}
          />
        </Routes>
      </div>
    </div>
  );
}
