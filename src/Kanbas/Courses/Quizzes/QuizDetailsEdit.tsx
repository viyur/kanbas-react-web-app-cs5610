import { Link, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import * as QuizClient from "./client";
import { useEffect, useState } from "react";
import QuizQuestionsEditor from "./Questions/QuizQuestionsEditor";
import QuizEditForm from "./QuizEditForm";
import EditNavigation from "./EditNavigation";

//  `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit` => QuizDetailsEdit Screen
export default function QuizDetailsEdit() {
  const { cid, quizId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role.toUpperCase() === "FACULTY";

  // state variables for the quiz
  const [quiz, setQuiz] = useState<any>({
    title: "New Quiz",
    description: "",
    course: cid,
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "None",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-15",
    availableDate: "2024-12-10",
    untilDate: "2024-12-20",
    assignedTo: "Everyone",
    published: false,
  });

  // function to fetch the quiz
  const fetchQuiz = async () => {
    if (!quizId) {
      console.error("Quiz ID is not available when fetching quiz.");
      return;
    }
    try {
      const quiz = await QuizClient.findQuizById(quizId as string);
      setQuiz(quiz);
    } catch (error: any) {
      setQuiz({});
      console.error(
        "Error fetching quiz:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  // check if the user is a faculty
  if (!isFaculty) {
    return (
      <div>
        <p>Only faculty can edit quizzes</p>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}`}>Back</Link>
      </div>
    );
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{quiz.published === true ? "Published" : "Unpublished"}</div>
      <div className="mt-2 mb-3">
        {" "}
        <EditNavigation />
      </div>

      <Routes>
        <Route
          path="/"
          element={<QuizEditForm quiz={quiz} setQuiz={setQuiz} />}
        />
        <Route path="/questions" element={<QuizQuestionsEditor />} />
      </Routes>
    </div>
  );
}
