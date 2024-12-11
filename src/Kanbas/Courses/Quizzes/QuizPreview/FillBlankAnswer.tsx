import React, { useState } from "react";
import { LuDot } from "react-icons/lu";

export default function FillBlankAnswer({
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

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userAnswer = e.target.value;

    // Check if the user's answer matches any correct answer (case-insensitive)
    const isCorrect = q.correctAnswer.some(
      (correctAns: string) =>
        correctAns.trim().toLowerCase() === userAnswer.trim().toLowerCase()
    );

    const newResponse = {
      question: q._id,
      answer: userAnswer,
      isCorrect: isCorrect,
    };

    // Update the local response state
    setResponse(newResponse);

    // Update the centralized responses array
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter(
        (res) => res.question !== q._id
      );
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
        <div className="form-group">
          <label htmlFor={`fill-blank-${q._id}`} className="form-label">
            Your Answer:
          </label>
          <input
            type="text"
            id={`fill-blank-${q._id}`}
            className="form-control"
            value={response.answer} // Controlled input
            onChange={handleInputChange} // Update state on input change
            placeholder="Type your answer here..."
          />
        </div>
        {/* tell user if they are correct or incorrect */}
        {/* {response.answer && (
          <p
            className={`mt-2 ${
              response.isCorrect ? "text-success" : "text-danger"
            }`}
          >
            {response.isCorrect ? "Correct!" : "Incorrect."}
          </p>
        )} */}

        {/* Display last response */}
        {lastResponse && (
          <div className="mt-4">
            <hr />
            <p className="text-muted">Last Response:</p>

            <p className="ms-3 text-muted">
              <LuDot className="fs-5" />{" "}
              {!lastResponse.answer || lastResponse.answer.trim() === ""
                ? "N/A"
                : lastResponse.answer}
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
