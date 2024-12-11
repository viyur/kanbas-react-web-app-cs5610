import { Routes, Route, useParams, Link } from "react-router-dom";
import QuizList from "./QuizList";
import QuizDetails from "./QuizDetails";
import QuizDetailsEdit from "./QuizDetailsEdit";
import QuestionEditForm from "./Questions/QuestionEditForm";
import QuizPreview from "./QuizPreview";
import StudentQuiz from "./StudentQuiz";

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
          {/* for preview the quiz content */}
          <Route path=":quizId/Preview" element={<QuizPreview />} />
          {/* for add new quiz question */}
          <Route path=":quizId/questionedit" element={<QuestionEditForm />} />
          {/* for edit existing quiz question */}
          <Route
            path=":quizId/questionedit/:questionId"
            element={<QuestionEditForm />}
          />

          {/* for student taking quiz */}
          <Route path=":quizId/studentquiz" element={<StudentQuiz />} />
        </Routes>
      </div>
    </div>
  );
}
