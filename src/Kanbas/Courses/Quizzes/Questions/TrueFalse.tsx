import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TrueFalse({ q, setQ }: { q: any; setQ: any }) {
  // Handle Question editor input
  const handleQuestionChange = (content: string) => {
    setQ((prev: any) => ({ ...prev, question: content }));
  };

  // Handle True/False selection
  const handleTrueFalseChange = (value: boolean) => {
    setQ((prev: any) => ({ ...prev, trueFalseAnswer: value }));
  };

  return (
    <div>
      {/* WYSIWYG Editor for the Question Field */}
      <div className="mt-4 container">
        {/* row to show Question label */}
        <div className="mt-3 mb-2 text-secondary fs-6">
          Enter your question text, then select if <strong>True</strong> or{" "}
          <strong>False</strong> is the correct answer
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

      {/* container to show true or false options */}
      <div className="container mt-4">
        <h5 className="fw-bold fs-5">Correct Answer</h5>
        <div className="row">
          <div className="col-md-6">
            {/* True Option */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="trueFalseAnswer"
                id="trueOption"
                value="true"
                checked={q.trueFalseAnswer === true}
                onChange={() => handleTrueFalseChange(true)}
              />
              <label className="form-check-label" htmlFor="trueOption">
                True
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* False Option */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="trueFalseAnswer"
                id="falseOption"
                value="false"
                checked={q.trueFalseAnswer === false}
                onChange={() => handleTrueFalseChange(false)}
              />
              <label className="form-check-label" htmlFor="falseOption">
                False
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
}
