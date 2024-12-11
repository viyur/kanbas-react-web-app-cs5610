import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import TrueFalseAnswer from "./TrueFalseAnswer";
import * as QuizClient from "../client";
import * as QuestionClient from "../Questions/client";
import FillBlankAnswer from "./FillBlankAnswer";

export default function StudentQuiz() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [questions, setQuestions] = useState<any[]>([]); // questions for single quiz
  const [responses, setResponses] = useState<any[]>([]); // responses for all questions in single quiz
  const [lastAttempt, setLastAttempt] = useState<any>({}); // lastest attempt for this quiz
  const [quiz, setQuiz] = useState<any>({}); // single quiz
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [attempts, setAttempts] = useState<any[]>([]); // All history attempts by the user

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

  // function to Fetch all attempts for the quiz with axios
  const fetchQuizAttempts = async () => {
    if (!quizId || !currentUser?._id) {
      console.error("Quiz ID or user ID is missing.");
      return;
    }
    try {
      const { attempts } = await QuizClient.findAllQuizAttempts(
        quizId as string,
        currentUser._id as string
      );
      setAttempts(attempts);
    } catch (error: any) {
      console.error("Error fetching quiz attempts:", error);
      setAttempts([]); // Clear attempts on error
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
      fetchQuizAttempts();
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
    fetchQuizAttempts();
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
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        >
          Go back to quizzes
        </button>{" "}
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
          </button>{" "}
        </div>

        {/* Alert to user if  reached the maximum number of attempts */}
        {attempts && attempts.length >= quiz.howManyAttempts && (
          <div className="alert alert-danger fs-6" role="alert">
            <AiOutlineExclamationCircle className="me-1 fs-5" /> You have
            reached the maximum number of attempts.
          </div>
        )}

        {/* Time Information */}
        <div className="mb-4">
          <p className="fw-light text-muted">
            <strong>Started:</strong>{" "}
            {startTime ? formatDateTime(startTime.toISOString()) : "Loading..."}
          </p>
        </div>
      </div>

      {/* container to show attempt history */}
      <div className="container">
        <div className="row bg-secondary text-white fw-bold py-2">
          <div className="col-4">Attempt History</div>
          <div className="col-4">Submitted At</div>
          <div className="col-4">Final Score</div>
        </div>
        {attempts.length > 0 ? (
          attempts.map((attempt, index) => (
            <div
              className="row py-2 border-bottom text-muted"
              key={attempt._id}
            >
              <div className="col-4">Attempt {index + 1}</div>
              <div className="col-4">
                {attempt.attemptedAt && formatDateTime(attempt.attemptedAt)}
              </div>
              <div className="col-4">
                {attempt.score} / {quiz.points} pts
              </div>
            </div>
          ))
        ) : (
          <div className="row py-2">
            <div className="col-12 text-center">No attempts found</div>
          </div>
        )}
      </div>

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
      <hr />
      {/* only show submit button if user has not reached the maximum number of attempts */}
      {attempts && attempts.length < quiz.howManyAttempts && (
        <div className="container d-flex justify-content-end mt-4">
          <button onClick={submitAttempt} className="btn btn-outline-danger">
            Submit
          </button>
        </div>
      )}
      {/* end */}
    </div>
  );
}
