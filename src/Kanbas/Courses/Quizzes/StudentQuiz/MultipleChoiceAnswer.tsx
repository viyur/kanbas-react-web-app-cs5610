import React, { useState } from "react";
import { LuDot } from "react-icons/lu";

export default function MultipleChoiceAnswer({
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
  lastResponse: any | null; // Pass last response for the question
}) {
  // Local state for the response of this question
  const [response, setResponse] = useState<any>({
    question: q._id,
    answer: "",
    isCorrect: false,
  });

  //  function to handle choice changes
  const handleChoiceChange = (choice: any) => {
    const newResponse = {
      question: q._id,
      answer: choice.text,
      isCorrect: q.correctAnswer.includes(choice.text),
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
    <div className="card ">
      {/* header of the question */}
      <div className="card-header d-flex justify-content-between">
        <h5 className="fw-bold">Question {i + 1}</h5>
        <p className="text-muted badge rounded-pill badge-secondary">
          {lastResponse?.isCorrect
            ? `${q.points} / ${q.points} pts`
            : `0 / ${q.points} pts`}
        </p>
      </div>
      {/* question body */}
      <div className="card-body">
        <p
          className="card-text mb-4"
          dangerouslySetInnerHTML={{ __html: q.question }}
        ></p>
        <hr />

        {/* Display all the Multiple choice answers  */}
        <ul className="list-group ">
          {q.choices.map((choice: any, idx: number) => (
            <li
              key={idx}
              className="list-group-item"
              style={{ borderWidth: "1px", borderColor: "#e0e0e0" }}
            >
              <label className="form-check-label d-flex align-items-center">
                <input
                  type="radio"
                  name={`question-${i}`} // Ensure unique group name for each question
                  value={choice.text}
                  className="form-check-input me-2"
                  checked={response.answer === choice.text} // Check if selected
                  onChange={() => handleChoiceChange(choice)} // Call standalone function
                />
                {choice.text}
              </label>
            </li>
          ))}
        </ul>

        {/* Display last response */}
        {lastResponse && (
          <div className="mt-4">
            <hr />
            <p className="text-muted">Last Response:</p>

            <p className="ms-3 text-muted">
              <LuDot className="fs-5" />{" "}
              {lastResponse.answer ? lastResponse.answer : "N/A"}
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
