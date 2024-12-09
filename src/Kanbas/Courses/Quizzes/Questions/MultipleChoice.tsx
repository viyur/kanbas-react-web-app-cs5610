import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MultipleChoice({ q, setQ }: { q: any; setQ: any }) {
  const [choices, setChoices] = useState<any[]>([]); // array of choice objects
  const [showAddInputRow, setShowAddInputRow] = useState(false);
  const [newChoiceText, setNewChoiceText] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddChoice = () => {
    if (newChoiceText.trim() === "") return;
    const newChoice = { text: newChoiceText, isCorrect: false };
    const updatedChoices = [...choices, newChoice];

    // Update both `choices` and `q.choices` with the new array
    setChoices(updatedChoices);
    setQ((prev: any) => ({ ...prev, choices: updatedChoices }));

    // Clear the input field
    setNewChoiceText("");
    setShowAddInputRow(false);
  };

  const handleCancelAddChoice = () => {
    setNewChoiceText("");
    setShowAddInputRow(false);
  };
  // Handle normal input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQ((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle Question editor input
  const handleQuestionChange = (content: string) => {
    setQ((prev: any) => ({ ...prev, question: content }));
  };

  // Update isCorrect field when a radio button is selected
  const handleCorrectChoiceChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index, // Only the selected choice is marked as correct
    }));

    setChoices(updatedChoices);
    setQ((prev: any) => ({ ...prev, choices: updatedChoices }));
  };

  // Edit choice text
  const handleEditChoice = (index: number, newText: string) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text: newText } : choice
    );

    setChoices(updatedChoices);
    setQ((prev: any) => ({ ...prev, choices: updatedChoices }));
  };

  // Delete a choice
  const handleDeleteChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);

    setChoices(updatedChoices);
    setQ((prev: any) => ({ ...prev, choices: updatedChoices }));
  };

  useEffect(() => {
    setChoices(q.choices);
  }, [q]);

  return (
    <div>
      {/* WYSIWYG Editor for the Question Field */}
      <div className="mt-4 container">
        {/* row to show Question label */}
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

      {/* container to add multiple choice options */}
      {/* Multiple Choice Options */}
      {/* Add new choice answer button */}
      <div className="container mt-4">
        <h5 className="fw-bold fs-5">Possible Answers</h5>
        {choices.length === 0 && (
          <div className="text-muted">
            No multiple choice answers added yet.
          </div>
        )}

        {/* Display existing choices */}
        {choices.map((choice, index) => (
          <div
            key={index}
            className="row align-items-center mb-2 border border-light-subtle rounded p-3"
          >
            {/* Radio Button for Correct Answer */}
            <div className="col-1 text-center">
              <input
                type="radio"
                className="form-check-input"
                checked={choice.isCorrect}
                onChange={() => handleCorrectChoiceChange(index)}
              />
            </div>

            {/* Editable or Static Text */}
            <div className="col-8">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={choice.text}
                  className="form-control"
                  onChange={(e) =>
                    handleEditChoice(index, e.target.value.trimStart())
                  }
                />
              ) : (
                <span>{choice.text}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="col-3 d-flex justify-content-end">
              {editingIndex === index ? (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => setEditingIndex(null)} // Save and exit edit mode
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => setEditingIndex(index)} // Enter edit mode
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteChoice(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Input Row */}
        {showAddInputRow && (
          <div className="row mt-3 align-items-center border border-light-subtle rounded p-3">
            <div className="col-3 text-end">
              <label className="form-label ">Possible Answer</label>
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                value={newChoiceText}
                onChange={(e) => setNewChoiceText(e.target.value)}
                placeholder="Enter a new possible answer"
              />
            </div>
            <div className="col-2 d-flex">
              <button
                className="btn btn-success me-2"
                onClick={handleAddChoice}
              >
                OK
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCancelAddChoice}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Answer Button */}
      {!showAddInputRow && (
        <div className="row mt-3">
          <div className="col text-center">
            <button
              className="btn btn-outline-danger btn-sm "
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
