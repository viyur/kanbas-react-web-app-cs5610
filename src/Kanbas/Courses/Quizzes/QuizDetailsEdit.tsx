import { Link, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTempQuiz, clearTempQuiz } from "./tempQuizReducer";
import * as QuizClient from "./client";
import { useEffect, useState } from "react";
import QuizQuestionsEditor from "./Questions/QuizQuestionsEditor";
import QuizEditForm from "./QuizEditForm";
import EditNavigation from "./EditNavigation";

//  `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit` => QuizDetailsEdit Screen
export default function QuizDetailsEdit() {
  const { cid, quizId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // redux  tempQuiz
  const tempQuiz = useSelector((state: any) => state.tempQuizReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser.role.toUpperCase() === "FACULTY";

  // function to fetch the quiz
  const fetchQuiz = async () => {
    if (!quizId) {
      console.error("Quiz ID is not available when fetching quiz.");
      return;
    }
    try {
      const quiz = await QuizClient.findQuizById(quizId as string);
      dispatch(setTempQuiz({ ...quiz }));
    } catch (error: any) {
      dispatch(clearTempQuiz());
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

  if (!tempQuiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mt-2 mb-3">
        {" "}
        <EditNavigation />
      </div>

      <Routes>
        <Route path="/" element={<QuizEditForm />} />
        <Route path="/questions" element={<QuizQuestionsEditor />} />
      </Routes>
    </div>
  );
}
