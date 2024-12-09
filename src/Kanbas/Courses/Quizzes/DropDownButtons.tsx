// drop down buttons for a quiz in the QuizList
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoBanOutline } from "react-icons/io5";

import * as QuizClient from "./client";

export default function DropDownButtons({
  quiz,
  fetchQuizzes,
}: {
  quiz: any;
  fetchQuizzes: () => Promise<void>;
}) {
  const { cid } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    const editPath = `/kanbas/courses/${cid}/Quizzes/${quiz._id}`;
    navigate(editPath);
  };

  const handleDelete = async () => {
    try {
      await QuizClient.deleteQuiz(quiz._id);
    } catch (error: any) {
      console.error("Error deleting quiz:", error);
    } finally {
      await fetchQuizzes();
    }
  };

  const togglePublished = async () => {
    try {
      const togglePublished = !quiz.published;
      // Create a new object with `published: true` explicitly set
      const publishedQuizData = { ...quiz, published: togglePublished };

      const updatedQuiz = await QuizClient.updateQuiz(
        quiz._id as string,
        publishedQuizData
      );
    } catch (error: any) {
      console.error("Error updating quiz published status:", error);
    } finally {
      await fetchQuizzes();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        className="btn btn-link p-0 border-0 fs-5 text-secondary"
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={handleEdit}>
          <GrEdit className="text-primary ms-3" />{" "}
          <span className="ms-1 fw-light text-secondary fs-6">Edit</span>
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={handleDelete}>
          <RiDeleteBin6Line className="text-danger ms-3" />{" "}
          <span className="ms-1 fw-light text-secondary fs-6">Delete</span>
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={togglePublished}>
          {!quiz.published && (
            <span>
              <IoCheckmarkCircleOutline className="text-success ms-3" />{" "}
              <span className="ms-1 fw-light text-secondary fs-6">Publish</span>
            </span>
          )}
          {quiz.published && (
            <span>
              <IoBanOutline className="text-danger ms-3" />{" "}
              <span className="ms-1 fw-light text-secondary fs-6">
                Unpublish
              </span>
            </span>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
