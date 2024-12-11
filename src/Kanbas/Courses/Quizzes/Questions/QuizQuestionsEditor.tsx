import { useParams, useNavigate } from "react-router-dom";
import * as QuizClient from "../client";
import * as QuestionClient from "./client";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { all } from "axios";

// `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions` => QuizQuestions Screen

export default function QuizQuestionsEditor() {
  const { cid, quizId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();

  // Fetch all questions for the quiz with axios
  const fetchQuestions = async () => {
    try {
      const allQuestions = await QuizClient.findQuestionsForQuiz(
        quizId as string
      );
      setQuestions(allQuestions);
      // calculate total points after questions are fetched
      if (allQuestions && allQuestions.length > 0) {
        setTotalPoints(
          allQuestions.reduce((total: number, q: any) => total + q.points, 0)
        );
      }
      //if no questions, set total points to 0
      else {
        setTotalPoints(0);
      }
    } catch (error: any) {
      console.error("Error fetching questions:", error);
    }
  };

  // Delete a question with axios
  const deleteQuestion = async (questionId: string) => {
    try {
      await QuestionClient.deleteQuestion(questionId as string);
      await fetchQuestions();
    } catch (error: any) {
      console.error("Error deleting question:", error);
    }
  };

  // call the fetchQuestions function
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div>
      {/* section to show all questions */}
      <div className="container">
        <div className="row">
          <div className="col text-end ">
            <span className="fw-bold fs-5 me-3 text-secondary">
              Points: {totalPoints}
            </span>
          </div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col text-center">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() =>
                navigate(
                  `/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionedit`
                )
              }
            >
              {" "}
              + Add New Question
            </button>
          </div>
        </div>
        <br />

        {/* Dislay questions list */}
        <div className="row border-bottom mb-2">
          <div className="col-4 fw-bold">Question Title</div>
          <div className="col-3 fw-bold">Points</div>
          <div className="col-3 fw-bold">Type</div>
          <div className="col-2"></div>
        </div>
        {questions.map((question: any, index: number) => (
          <div key={index} className="row border-bottom mb-2">
            <div className="col-4 fw-light">{question.title}</div>
            <div className="col-3 fw-light">{question.points} pts</div>
            <div className="col-3 fw-light">{question.questionType}</div>
            <div className="col-2 d-flex">
              <button
                className="btn text-secondary p-0 border-0 bg-transparent ms-2"
                onClick={() =>
                  navigate(
                    `/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionedit/${question._id}`
                  )
                }
              >
                <AiOutlineEdit className="fs-5" />
              </button>
              <button
                className="btn text-danger p-0 border-0 bg-transparent ms-2"
                onClick={() => deleteQuestion(question._id)}
              >
                <AiOutlineDelete className="fs-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* end of questions list */}

      {/* show cancel and save buttons */}
      <div className="container mt-5">
        <div className="row">
          <div className="col ms-2">
            <button
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`)
              }
              className="btn btn-secondary"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
              }}
              className="btn btn-danger ms-3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
}
