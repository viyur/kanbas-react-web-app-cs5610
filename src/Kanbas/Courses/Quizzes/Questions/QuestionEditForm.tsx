import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import FillBlank from "./FillBlank";
import * as QuizClient from "../client";
import * as QuestionClient from "./client";

// `/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionedit/${questionId}` => QuestionEditForm Screen
export default function QuestionEditForm() {
  const { cid, quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [q, setQ] = useState<any>({
    quiz: quizId,
    title: "",
    questionType: "Multiple Choice",
    points: 0,
    question: "",
    choices: [],
    blackAnswers: [],
    trueFalseAnswer: false,
  });

  // Fetch the question by questionId with axios
  const fetchQuestion = async () => {
    try {
      const question = await QuestionClient.findQuestionById(
        questionId as string
      );
      setQ(question);
    } catch (error: any) {
      console.error("Error fetching question:", error);
    }
  };

  // function to examine question type
  const checkQuestionType = (q: any) => {
    let newQuestion = { ...q };
    switch (q.questionType) {
      case "Multiple Choice":
        newQuestion.blankAnswers = [];
        newQuestion.trueFalseAnswer = false;
        break;
      case "True/False":
        newQuestion.choices = [];
        newQuestion.blankAnswers = [];
        break;
      case "Fill in the blank":
        newQuestion.choices = [];
        newQuestion.trueFalseAnswer = false;
        break;
      default:
        console.warn("Unknown question type:", q.questionType);
        break;
    }
    return newQuestion;
  };
  // Add a new question to the quiz with axios
  const createNewQuestion = async () => {
    try {
      const newQuestion = checkQuestionType(q);
      const question = await QuizClient.createQuestionForQuiz(
        quizId as string,
        newQuestion
      );
      // setQ(question);
      // Navigate to the questions list page
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions`);
    } catch (error: any) {
      console.error("Error creating question:", error);
    }
  };

  // Update an existing question with axios
  const updateQuestion = async () => {
    try {
      const newQuestion = checkQuestionType(q);
      const question = await QuestionClient.updateQuestion(
        questionId as string,
        newQuestion
      );
      setQ(question);
      // Navigate to the questions list page
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions`);
    } catch (error: any) {
      console.error("Error updating question:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQ((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (questionId) {
      // no questionId means we are creating a new question
      // has questionId means we are editing an existing question
      fetchQuestion();
    }
  }, [questionId]);

  return (
    <div>
      {/* Header */}
      <div className="container mt-5">
        <div className="row">
          {/* Title Input */}
          <div className="col-3">
            <input
              type="text"
              name="title"
              value={q.title}
              placeholder="Enter question title"
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* Question Type Selector */}
          <div className="col-4">
            <select
              name="questionType"
              value={q.questionType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/false">True/False</option>
              <option value="Fill in the blank">Fill in the Blank</option>
            </select>
          </div>
          {/* empty col */}
          <div className="col-2"></div>
          {/* Points Input */}
          <div className="col-3 ">
            <div className="input-group w-100 float-end">
              <input
                type="number"
                id="points"
                name="points"
                value={q.points}
                min={0}
                onChange={handleInputChange}
                className="form-control w-25"
              />
              <span className="input-group-text">
                {" "}
                <label htmlFor="points">pts</label>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* different editor for each question type */}
      {q.questionType === "Multiple Choice" && (
        <MultipleChoice q={q} setQ={setQ} />
      )}
      {q.questionType === "True/false" && <TrueFalse q={q} setQ={setQ} />}
      {q.questionType === "Fill in the blank" && (
        <FillBlank q={q} setQ={setQ} />
      )}
      <br />
      <br />
      <hr />
      {/* buttons at the bottom */}
      <div>
        <button
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions`)
          }
        >
          cancel
        </button>
      </div>
      {/* button for add new question */}
      {!questionId && (
        <div>
          <button onClick={createNewQuestion}>Add</button>
        </div>
      )}
      {/* button for update old question */}
      {questionId && (
        <div>
          <button onClick={updateQuestion}>Update</button>
        </div>
      )}
      {/* end */}
    </div>
  );
}
