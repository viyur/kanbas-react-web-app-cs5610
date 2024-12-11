import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as QuizClient from "./client";
import { GrEdit } from "react-icons/gr";

//  `/Kanbas/Courses/${cid}/Quizzes/${quizId}` => QuizDetails Screen
// can go to QuizDetailsEdit screen if click on Edit
export default function QuizDetails() {
  const { cid, quizId } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const isFaculty = currentUser.role.toUpperCase() === "FACULTY";
  const isStudent = currentUser.role.toUpperCase() === "STUDENT";
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
  function formatReadableDateTime(isoString: string) {
    if (!isoString) return "Invalid date";

    try {
      const date = new Date(isoString);
      const formattedDate = date.toLocaleString("en-US", {
        dateStyle: "medium", // e.g., Dec 15, 2024
        timeStyle: "short", // e.g., 12:00 AM
        timeZone: "UTC", // Force UTC time zone
      });

      // Insert "at" between date and time
      const [datePart, yearPart, timePart] = formattedDate.split(", ");
      return `${datePart}, ${yearPart} at ${timePart}`;
    } catch (error) {
      console.error("Invalid ISO date string:", isoString);
      return "Invalid date";
    }
  }

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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/*  Buttons */}
      {/* faculty buttons */}
      {isFaculty && (
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-6 ">
              <button
                className="float-end btn btn-sm btn-primary"
                onClick={() => {
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`);
                }}
              >
                {" "}
                Preview{" "}
              </button>
            </div>
            {/* Edit Button for faculty */}
            <div className="col-6">
              <Link
                className="float-start"
                to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`}
              >
                <button className="btn btn-sm btn-secondary">
                  <GrEdit /> Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* student buttons */}
      {isStudent && (
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-4 ">
              <button
                onClick={() => {
                  navigate(
                    `/Kanbas/Courses/${cid}/Quizzes/${quizId}/studentquiz`
                  );
                }}
                className=" btn btn-danger"
              >
                {" "}
                Start{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Title and Details */}
      <hr />
      <h2 className="ms-3">{quiz.title ? quiz.title : ""}</h2>
      <br />
      <br />
      {/* Quiz Details */}
      <div className="container">
        {/* quiz type */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Quiz Type</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.quizType ? quiz.quizType : ""}
            </p>
          </div>
        </div>
        {/* Points */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Points</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.points ? quiz.points : ""}
            </p>
          </div>
        </div>
        {/* Assignment Group */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Assignment Group</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.assignmentGroup ? quiz.assignmentGroup : ""}
            </p>
          </div>
        </div>
        {/* Shuffle Answers */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Shuffle Answers</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.shuffleAnswers ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* Time Limit */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Time Limit</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.timeLimit ? `${quiz.timeLimit} Minutes` : ""}
            </p>
          </div>
        </div>
        {/* Multiple Attempts */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Multiple Attempts</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.multipleAttempts ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* How Many Attempts */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">How Many Attempts</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.howManyAttempts ? `${quiz.howManyAttempts} Times` : ""}
            </p>
          </div>
        </div>
        {/* Show Correct Answers */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Show Correct Answers</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.showCorrectAnswers ? quiz.showCorrectAnswers : ""}
            </p>
          </div>
        </div>
        {/* Access Code */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Access Code</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.accessCode ? quiz.accessCode : ""}
            </p>
          </div>
        </div>
        {/* One Question At A Time */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">One Question At A Time</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.oneQuestionAtATime ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* Webcam required */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Webcam Required</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.webcamRequired ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* Lock questions after answering */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Lock questions after answering</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </p>
          </div>
        </div>
        {/* published */}
        <div className="row">
          <div className="col-6">
            <p className="fw-bold float-end">Published</p>
          </div>
          <div className="col-6">
            <p className="text-muted float-start">
              {quiz.published === false ? "No" : "Yes"}
            </p>
          </div>
        </div>
        {/* end */}
      </div>
      <br />
      <br />
      {/* due date */}
      <div className="container ms-3 me-3">
        <div className="row ">
          <div className="col-3 fw-bold">Due</div>
          <div className="col-3 fw-bold">For</div>
          <div className="col-3 fw-bold">Available From</div>
          <div className="col-3 fw-bold">Available Until</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-3 text-muted">
            {quiz.dueDate ? `${formatReadableDateTime(quiz.dueDate)}` : ""}
          </div>
          <div className="col-3 text-muted">
            {quiz.assignedTo ? quiz.assignedTo : ""}
          </div>
          <div className="col-3 text-muted">
            {quiz.availableDate
              ? `${formatReadableDateTime(quiz.availableDate)}`
              : ""}
          </div>
          <div className="col-3 text-muted">
            {quiz.untilDate ? `${formatReadableDateTime(quiz.untilDate)}` : ""}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
