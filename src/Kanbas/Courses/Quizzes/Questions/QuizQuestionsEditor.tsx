import { useParams, useNavigate } from "react-router-dom";
import * as QuizClient from "../client";
import * as QuestionClient from "./client";
import { useState, useEffect } from "react";

// `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit/questions` => QuizQuestions Screen

export default function QuizQuestionsEditor() {
  const { cid, quizId } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch all questions for the quiz with axios
  const fetchQuestions = async () => {
    try {
      const questions = await QuizClient.findQuestionsForQuiz(quizId as string);
      setQuestions(questions);
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
      <div>{JSON.stringify(useParams(), null, 2)}</div>
      <div>Quiz Questions Editor Screen</div>
      <hr />
      {/* section to show all questions */}
      <div className="container">
        {questions.map((question: any, index: number) => (
          <div key={index} className="row">
            <div className="col">{question.title}</div>
            <div className="col">{question.points} pts</div>
            <div className="col">{question.questionType}</div>
            <div className="col">
              <button
                onClick={() =>
                  navigate(
                    `/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionedit/${question._id}`
                  )
                }
              >
                Edit
              </button>
            </div>
            <div className="col">
              <button onClick={() => deleteQuestion(question._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* add new question button */}
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
