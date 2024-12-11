import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import TrueFalseAnswer from "./TrueFalseAnswer";
import * as QuizClient from "../client";
import * as QuestionClient from "../Questions/client";
import FillBlankAnswer from "./FillBlankAnswer";

export default function QuizPreview() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [questions, setQuestions] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>({});
  const [quiz, setQuiz] = useState<any>({});
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Format date-time to a readable string
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const d = date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const [datetime, year, time] = d.split(", "); // Split date and time
    return `${datetime}, ${year} at ${time}`;
  };

  // function to fetch the lastest attempt by the user with axios
  const fetchLastAttempt = async () => {
    if (!quizId || !currentUser) {
      console.error(
        "Quiz ID/User is not available when fetching last attempt."
      );
      return;
    }
    console.log("quizId", quizId);
    console.log("currentUser._id", currentUser._id);
    try {
      const result = await QuizClient.findLatestQuizAttempt(
        quizId as string,
        currentUser._id as string
      );
      // result {'message', 'attempt'}
      setLastAttempt(result.attempt);
    } catch (error: any) {
      setLastAttempt({});
      console.error("Error fetching last attempt:", error);
    }
  };

  // Function to find the last response for a question
  const findLastResponse = (question: any) => {
    return lastAttempt?.responses?.find(
      (res: any) => res.question === question._id
    );
  };

  // function to Fetch the quiz with axios
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

  // function to Fetch all questions for the quiz with axios
  const fetchQuestions = async () => {
    if (!quizId) {
      console.error("Quiz ID is not available when fetching quiz.");
      return;
    }
    try {
      const questions = await QuizClient.findQuestionsForQuiz(quizId as string);
      setQuestions(questions);
    } catch (error: any) {
      setQuestions([]);
      console.error("Error fetching questions:", error);
    }
  };

  // submit attempt with axios
  const submitAttempt = async () => {
    if (!quizId || !currentUser) {
      console.error("Quiz ID/User is not available when submitting attempt.");
      return;
    }
    try {
      const attemptPayload = {
        quiz: quizId,
        user: currentUser._id,
        responses,
        attemptedAt: new Date().toISOString(), // Add current timestamp
        startedAt: startTime?.toISOString(),
      };
      const attempt = await QuizClient.createQuizAttempt(attemptPayload);
      console.log("Attempt submitted:", attempt);
      // Refresh the page after submission
      setStartTime(new Date());
      fetchQuiz();
      fetchQuestions();
      fetchLastAttempt();
    } catch (error: any) {
      console.error("Error submitting attempt:", error);
    }
  };

  // call the fetchQuestions function
  useEffect(() => {
    setStartTime(new Date());
    fetchQuiz();
    fetchQuestions();
    fetchLastAttempt();
  }, [quizId]);

  // show the message if no questions are found
  if (!questions || questions.length === 0) {
    return (
      <div className="container">
        <div className="alert alert-danger fs-6" role="alert">
          <AiOutlineExclamationCircle className="me-1 fs-5" /> No questions
          found.
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`)}
        >
          Go back to quiz
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="container mt-4">
        {/* Quiz Title */}
        <h2 className="fw-bold mb-4">{quiz.title}</h2>
        {/* Back Button */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`)}
          >
            Back to Quiz Details
          </button>
        </div>
        <div className="alert alert-danger fs-6" role="alert">
          <AiOutlineExclamationCircle className="me-1 fs-5" /> This is a preview
          of the quiz.
        </div>
        {/* Time Information */}
        <div className="mb-4">
          <p className="fw-light text-muted">
            <strong>Started:</strong>{" "}
            {startTime ? formatDateTime(startTime.toISOString()) : "Loading..."}
          </p>
        </div>
      </div>
      {/* container to show last attempt time and score */}

      {lastAttempt?._id && (
        <div className="container mb-2">
          <hr />
          <h5 className="text-muted">Attempt History</h5>

          <p className="fw-light text-muted">
            <strong>Last Attempt Submitted At:</strong>{" "}
            {formatDateTime(lastAttempt.attemptedAt)} <br />
            <strong>Last Attempt Score:</strong> {lastAttempt.score} points
          </p>
        </div>
      )}

      {/* Questions container */}
      <div className="container">
        <hr />
        {questions.map((q: any, index: number) => (
          <div key={index} className=" mb-4  ">
            {/* Render Based on Question Type */}
            {/* Multiple Choice type*/}
            {q.questionType === "Multiple Choice" && (
              <MultipleChoiceAnswer
                q={q}
                i={index}
                responses={responses}
                setResponses={setResponses}
                lastResponse={findLastResponse(q)}
              />
            )}
            {/* Fill in blank type */}
            {q.questionType === "Fill in the blank" && (
              <FillBlankAnswer
                q={q}
                i={index}
                responses={responses}
                setResponses={setResponses}
                lastResponse={findLastResponse(q)}
              />
            )}
            {/* true / false */}
            {q.questionType === "True/false" && (
              <TrueFalseAnswer
                q={q}
                i={index}
                responses={responses}
                setResponses={setResponses}
                lastResponse={findLastResponse(q)}
              />
            )}
          </div>
        ))}
      </div>
      {/* buttons */}
      <div>
        <button onClick={submitAttempt}>Submit</button>
      </div>
      {/* end */}
    </div>
  );
}
