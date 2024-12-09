import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddQuizButton from "./AddQuizButton";
import * as courseClient from "../client";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { RxRocket } from "react-icons/rx";
import DropDownButtons from "./DropDownButtons";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoBanOutline } from "react-icons/io5";
import { get } from "http";

// `/Kanbas/Courses/${cid}/Quizzes` => QuizList Screen
export default function QuizList() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role.toUpperCase() === "FACULTY";
  const [quizzes, setQuizzes] = useState<any[]>([]);

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
      return `${datePart} at ${timePart}`;
    } catch (error) {
      console.error("Invalid ISO date string:", isoString);
      return "Invalid date";
    }
  }

  function getQuizStatus(
    availableDate: string | null,
    untilDate: string | null
  ): string {
    if (!availableDate || !untilDate) {
      return "NaN ";
    }

    try {
      const now = new Date(); // Current date and time in local time zone
      const available = new Date(availableDate); // Parse UTC date
      const until = new Date(untilDate); // Parse UTC date

      // Validate dates
      if (isNaN(available.getTime()) || isNaN(until.getTime())) {
        return "NaN";
      }

      // Logic to determine the quiz status
      if (now < available) {
        return "Not available until"; // Current time is before the available date
      } else if (now >= available && now <= until) {
        return "Available"; // Current time is within the range
      } else {
        return "Closed"; // Current time is after the until date
      }
    } catch (error) {
      console.error("Error processing dates:", error);
      return "An error occurred while determining the quiz status.";
    }
  }

  const fetchQuizzesForCourse = async () => {
    if (!cid) {
      console.error("Course ID is not available when fetching quizzes.");
      return;
    }
    try {
      const quizzes = await courseClient.getQuizzesByCourse(cid as string);
      setQuizzes(quizzes);
    } catch (error: any) {
      setQuizzes([]);
      console.error(
        "Error fetching quizzes:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchQuizzesForCourse();
  }, [cid]);

  return (
    <div>
      <div className="mt-4 mb-3">
        <AddQuizButton fetchQuizzes={fetchQuizzesForCourse} />
      </div>
      <hr />

      {/* list of quizzes */}
      <div className="mt-3">
        <ul className="list-group rounded-0">
          {/* head of the quizzes list */}
          <li className=" list-group-item p-0  fs-5 border-gray">
            <div className=" p-3 ps-2 bg-secondary">
              {" "}
              <MdArrowDropDown className="me-2 fs-3" />
              Assignment Quizzes
            </div>
          </li>

          {/* different quizzes */}
          <ul className="list-group rounded-0">
            {quizzes.map((quiz) => {
              return (
                <li
                  key={quiz._id}
                  className="list-group-item p-3 ps-1 d-flex justify-content-between align-items-center"
                  style={{
                    borderLeftColor: "green",
                    borderLeftWidth: "5px",
                    borderLeftStyle: "solid",
                  }}
                >
                  {/* Buttons on the left */}
                  {/* <div className="d-flex align-items-center">
                    <RxRocket className="ms-1 me-3 fs-4 text-success" />
                  </div> */}
                  <div className="ms-2 me-3">
                    <RxRocket className=" fs-4 text-success" />
                  </div>
                  {/* Title and Details of the Quiz */}
                  <div className="flex-grow-1">
                    {/* title  */}
                    <Link
                      className={
                        quiz.published
                          ? "text-decoration-none text-black fw-bold fs-5"
                          : "text-decoration-none text-secondary fw-bold fs-5"
                      }
                      to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                    >
                      {quiz.title}
                    </Link>
                    {/* details below the title*/}
                    <div className="text-muted mt-1 fs-6">
                      <strong className="fw-bold">
                        {getQuizStatus(quiz.availableDate, quiz.untilDate)}
                      </strong>
                      <span className="fw-lighter">
                        {getQuizStatus(quiz.availableDate, quiz.untilDate) ===
                          "Not available until" &&
                          ` ${formatReadableDateTime(quiz.availableDate)}`}
                      </span>{" "}
                      | <strong className="fw-bold">Due</strong>{" "}
                      <span className="fw-lighter">
                        {formatReadableDateTime(quiz.dueDate)}{" "}
                      </span>{" "}
                      |{" "}
                      <span className="fw-lighter">{`${quiz.points} pts`}</span>
                    </div>
                  </div>
                  {/* Green Checkmark */}
                  <div className="ms-3">
                    {" "}
                    {quiz.published ? (
                      <FaRegCircleCheck className="fs-4 text-success" />
                    ) : (
                      <IoBanOutline className="fs-4 text-danger" />
                    )}{" "}
                  </div>
                  {/* drop down buttons on the right */}
                  <div className="ms-2">
                    <DropDownButtons
                      quiz={quiz}
                      fetchQuizzes={fetchQuizzesForCourse}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </div>
  );
}
