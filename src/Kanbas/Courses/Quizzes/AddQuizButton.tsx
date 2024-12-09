import { FaPlus } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as courseClient from "../client";
import { useState } from "react";

export default function AddQuizButton({
  fetchQuizzes,
}: {
  fetchQuizzes: () => Promise<void>; // Correct type
}) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role.toUpperCase() === "FACULTY";
  // State to store the newly created quiz
  const [newQuiz, setNewQuiz] = useState<any>({
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

  // Function to handle adding a new quiz
  const handleAddQuiz = async () => {
    if (!cid) {
      console.error("Course ID is not available.");
      return;
    }

    try {
      // Create a new quiz using the client
      const createdQuiz = await courseClient.createQuiz(cid as string, newQuiz);
      setNewQuiz(createdQuiz); // Update state with the newly created quiz
      console.log("Quiz created successfully:", createdQuiz);
      // go to QuizDetails screen
      navigate(`/kanbas/courses/${cid}/Quizzes/${createdQuiz._id}`);
      // Refresh the quiz list by calling the parent function
      //   await fetchQuizzes();
    } catch (error: any) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
      setNewQuiz({});
    }
  };
  return (
    <div className="d-flex justify-content-between mb-3 ">
      {/* input field */}
      <input
        type="text"
        className="form-control  float-start w-50 ms-2"
        placeholder="Search..."
      />
      {/* button to add new quiz */}
      {/* only faculty can see the add quiz button */}
      {isFaculty && (
        <button
          className="float-end btn btn-danger me-1"
          onClick={handleAddQuiz}
        >
          <FaPlus className="me-2" />
          Add Quiz
        </button>
      )}
    </div>
  );
}
