import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as QuizClient from "./client";
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import ReactQuill from "react-quill";

// `/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit` => QuizEditForm Screen
export default function QuizEditForm({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: any;
}) {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();

  // function to update the quiz
  const updateQuiz = async () => {
    try {
      const updatedQuiz = await QuizClient.updateQuiz(quizId as string, quiz);
      setQuiz(updatedQuiz);
    } catch (error: any) {
      console.error("Error updating quiz:", error);
    } finally {
      navigate(`/kanbas/courses/${cid}/Quizzes/${quizId}`);
    }
  };

  const updateAndPublish = async () => {
    try {
      // Create a new object with `published: true` explicitly set
      const publishedQuizData = { ...quiz, published: true };

      const updatedQuiz = await QuizClient.updateQuiz(
        quizId as string,
        publishedQuizData
      );
      setQuiz(updatedQuiz);
      console.log("updatedQuiz", updatedQuiz);
    } catch (error: any) {
      console.error("Error updating quiz:", error);
    } finally {
      navigate(`/kanbas/courses/${cid}/Quizzes`);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setQuiz((prevQuiz: any) => ({
      ...prevQuiz,
      [name]: checked,
    }));
  };

  // React Quill Editor onChange
  const handleDescriptionChange = (content: string) => {
    setQuiz((prev: any) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <Container className="mt-4">
      <Form>
        {/* Title and Description */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="quizTitle">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={quiz.title}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            {/* <Form.Group controlId="quizDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={quiz.description}
                onChange={handleInputChange}
              />
            </Form.Group> */}
            <Form.Group controlId="quizDescription">
              <Form.Label>Description</Form.Label>
              {/* 替换为 React Quill */}
              <ReactQuill
                value={quiz.description}
                onChange={handleDescriptionChange}
                placeholder="Enter quiz description here..."
                theme="snow"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Quiz Type and Assignment Group */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="quizType">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                name="quizType"
                value={quiz.quizType}
                onChange={handleSelectChange}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="assignmentGroup">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select
                name="assignmentGroup"
                value={quiz.assignmentGroup}
                onChange={handleSelectChange}
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Checkbox Options */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="shuffleAnswers">
              <Form.Check
                type="checkbox"
                label="Shuffle Answers"
                name="shuffleAnswers"
                checked={quiz.shuffleAnswers}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="oneQuestionAtATime">
              <Form.Check
                type="checkbox"
                label="One Question at a Time"
                name="oneQuestionAtATime"
                checked={quiz.oneQuestionAtATime}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="webcamRequired">
              <Form.Check
                type="checkbox"
                label="Webcam Required"
                name="webcamRequired"
                checked={quiz.webcamRequired}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lockQuestionsAfterAnswering">
              <Form.Check
                type="checkbox"
                label="Lock Questions After Answering"
                name="lockQuestionsAfterAnswering"
                checked={quiz.lockQuestionsAfterAnswering}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Multiple Attempts and How Many Attempts */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="multipleAttempts">
              <Form.Check
                type="checkbox"
                label="Multiple Attempts"
                name="multipleAttempts"
                checked={quiz.multipleAttempts}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Col>
          <Row className="mb-3">
            {quiz.multipleAttempts && (
              <Col md={6}>
                <Form.Group controlId="howManyAttempts">
                  <Form.Label className="text-muted">
                    How Many Attempts (Times){" "}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="howManyAttempts"
                    value={quiz.howManyAttempts}
                    min={2}
                    onChange={handleInputChange}
                  />{" "}
                </Form.Group>
              </Col>
            )}
          </Row>
        </Row>

        {/* Time Limit */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="timeLimit">
              <Form.Label>Set Time Limit (Minutes) </Form.Label>
              <Form.Control
                type="number"
                name="timeLimit"
                value={quiz.timeLimit}
                min={1}
                onChange={handleInputChange}
              />{" "}
            </Form.Group>
          </Col>
        </Row>

        {/* Show Correct Answers */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="showCorrectAnswers">
              <Form.Label>Show Correct Answers</Form.Label>
              <Form.Control
                type="text"
                name="showCorrectAnswers"
                value={quiz.showCorrectAnswers}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Assigned To */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="assignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                value={quiz.assignedTo}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Access Code field */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="accessCode">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                type="text"
                name="accessCode"
                value={quiz.accessCode}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Date Fields in a Card */}
        <Card className="mb-3">
          <Card.Header className="text-center">Date Settings</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="dueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={
                      quiz.dueDate
                        ? new Date(quiz.dueDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="availableDate">
                  <Form.Label>Available Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="availableDate"
                    value={
                      quiz.availableDate &&
                      new Date(quiz.availableDate).toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="untilDate">
                  <Form.Label>Until Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="untilDate"
                    value={
                      quiz.untilDate &&
                      new Date(quiz.untilDate).toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <br />
        <hr />

        {/* Buttons */}
        <Row className="mb-3">
          <Col md={6}></Col>
          <Col md={6}>
            <span className="float-end">
              <Button
                variant="secondary"
                onClick={() => navigate(`/kanbas/courses/${cid}/Quizzes`)}
                className="text-secondary me-1 "
              >
                Cancel
              </Button>

              <Button
                variant="secondary"
                className="text-dark me-1"
                onClick={updateAndPublish}
              >
                Save and Publish
              </Button>

              <Button
                variant="danger"
                onClick={updateQuiz}
                className="text-white"
              >
                Save
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
