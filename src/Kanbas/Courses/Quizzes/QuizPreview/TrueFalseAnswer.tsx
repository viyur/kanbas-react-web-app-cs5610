import React, { useState } from "react";
import { LuDot } from "react-icons/lu";

export default function TrueFalseAnswer({
  q,
  i,
  responses,
  setResponses,
  lastResponse,
}: {
  q: any;
  i: number;
  responses: any[];
  setResponses: React.Dispatch<React.SetStateAction<any[]>>;
  lastResponse: any | null;
}) {
  // Local state for the response of this question
  const [response, setResponse] = useState<any>({
    question: q._id,
    answer: "",
    isCorrect: false,
  });

  // Function to handle selection of True or False
  const handleChoiceChange = (choice: boolean) => {
    const newResponse = {
      question: q._id,
      answer: choice,
      isCorrect: q.correctAnswer === choice,
    };

    // Update the local response state
    setResponse(newResponse);

    // Update the centralized responses array
    setResponses((prevResponses) => {
      // Remove any existing response for this question
      const updatedResponses = prevResponses.filter(
        (res) => res.question !== q._id
      );
      // Add the new response
      return [...updatedResponses, newResponse];
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between">
        <h5 className="fw-bold">Question {i + 1}</h5>
        <p className="text-muted badge rounded-pill badge-secondary">
          {lastResponse?.isCorrect
            ? `${q.points} / ${q.points} pts`
            : `0 / ${q.points} pts`}
        </p>
      </div>
      <div className="card-body">
        <p dangerouslySetInnerHTML={{ __html: q.question }}></p>

        {/* Render True/False options as radio buttons */}
        <div className="form-check">
          <label className="form-check-label d-flex align-items-center">
            <input
              type="radio"
              name={`question-${i}`} // Ensure unique group name per question
              value="true"
              className="form-check-input me-2"
              checked={response.answer === true} // Check if selected
              onChange={() => handleChoiceChange(true)} // Handle change
            />
            True
          </label>
        </div>

        {/* Display true false radio buttons */}
        <div className="form-check">
          <label className="form-check-label d-flex align-items-center">
            <input
              type="radio"
              name={`question-${i}`} // Ensure unique group name per question
              value="false"
              className="form-check-input me-2"
              checked={response.answer === false} // Check if selected
              onChange={() => handleChoiceChange(false)} // Handle change
            />
            False
          </label>
        </div>

        {/* Display last response */}
        {lastResponse && (
          <div className="mt-4">
            <hr />
            <p className="text-muted">Last Response:</p>

            <p className="ms-3 text-muted">
              <LuDot className="fs-5" />{" "}
              {lastResponse.answer === true ? "True" : "False"}
              {"  "}
              {lastResponse.isCorrect && (
                <span className="ms-2 badge rounded-pill bg-success">
                  Correct
                </span>
              )}
              {!lastResponse.isCorrect && (
                <span className="ms-2 badge rounded-pill bg-danger">
                  Incorrect
                </span>
              )}
            </p>
          </div>
        )}
        {/* end of card body */}
      </div>
    </div>
  );
}
