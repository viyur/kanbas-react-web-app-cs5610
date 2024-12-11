import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FillBlank({ q, setQ }: { q: any; setQ: any }) {
  const [answers, setAnswers] = useState<any[]>([]); // array of choice objects
  const [showAddInputRow, setShowAddInputRow] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");

  // function to Handle Question editor input
  const handleQuestionChange = (content: string) => {
    setQ((prev: any) => ({ ...prev, question: content }));
  };

  // function to Add a new answer
  const handleAddAnswer = () => {
    if (newAnswerText.trim() === "") return;
    const newAnswer = { text: newAnswerText, caseInsensitive: true };
    const updatedAnswers = [...answers, newAnswer];

    // Update state and sync with q.blankAnswers
    setAnswers(updatedAnswers);
    setQ((prev: any) => ({ ...prev, blankAnswers: updatedAnswers }));

    // Reset input and hide row
    setNewAnswerText("");
    setShowAddInputRow(false);
  };

  // function to Cancel adding a new answer
  const handleCancelAddAnswer = () => {
    setNewAnswerText("");
    setShowAddInputRow(false);
  };

  // function to Delete an answer
  const handleDeleteAnswer = (index: number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);

    // Update state and sync with q.blankAnswers
    setAnswers(updatedAnswers);
    setQ((prev: any) => ({ ...prev, blankAnswers: updatedAnswers }));
  };

  // function to edit existing answer
  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = answers.map((ans, i) =>
      i === index ? { ...ans, text: value } : ans
    );
    setAnswers(updatedAnswers);
    setQ((prev: any) => ({ ...prev, blankAnswers: updatedAnswers }));
  };

  // Call Use effect to update answers when q changes
  useEffect(() => {
    setAnswers(q.blankAnswers);
  }, [q]);

  return (
    <div>
      {/* WYSIWYG Editor for the Question Field */}
      <div className="mt-4 container">
        {/* row to show Question label */}
        <div className="mt-3 mb-2 text-secondary fs-6">
          Enter your question text, then define all possible correct answers for
          the blank.
          <br />
          Students will see the question followed by a small text box to type
          their answer.
        </div>
        <div className="row">
          <div className="col-md-3">
            <label
              htmlFor="question-editor"
              className="form-label fw-bold fs-5"
            >
              Question
            </label>
          </div>
        </div>
        {/* row to show the WYSIWYG Editor */}
        <div className="row">
          <div className="col-12" id="question-editor">
            <ReactQuill
              value={q.question}
              onChange={handleQuestionChange}
              placeholder="Write your question here..."
              theme="snow"
            />
          </div>
        </div>
      </div>

      {/* Container for ShowingExisting Answers */}
      <div className="mt-4 container">
        <h5 className="fw-bold fs-5">Possible Correct Answers</h5>
        {/* message to show if no answers */}
        {answers.length === 0 && (
          <div className="text-muted">No answers added yet.</div>
        )}
        {/* loop existing answers */}
        {answers.map((answer, index) => (
          <div
            key={index}
            className="row align-items-center mb-2 border border-light-subtle rounded p-3"
          >
            {/* Editable Answer Text */}
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Enter a possible correct answer"
              />
            </div>
            {/* Action Buttons */}
            <div className="col-3 text-end">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteAnswer(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Answer Input Row */}
      {showAddInputRow && (
        <div className="row mt-3 align-items-center border border-light-subtle rounded p-3">
          <div className="col-2 text-end">
            <label className="form-label">New Answer</label>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              placeholder="Enter a possible correct answer"
            />
          </div>
          <div className="col-3 d-flex">
            <button className="btn btn-success me-2" onClick={handleAddAnswer}>
              OK
            </button>
            <button className="btn btn-danger" onClick={handleCancelAddAnswer}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Answer Button */}
      {!showAddInputRow && (
        <div className="row mt-3">
          <div className="col text-center">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => setShowAddInputRow(true)}
            >
              + Add Answer
            </button>
          </div>
        </div>
      )}
      {/* end */}
    </div>
  );
}
