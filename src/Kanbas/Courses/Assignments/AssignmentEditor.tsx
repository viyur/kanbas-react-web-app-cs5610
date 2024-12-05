// AssignmentEditor component aims to add a new assignment to a course
// AssignmentsEditor component aims to edit old assignments

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addAssignment } from "./reducer";
import { useDispatch } from "react-redux";
import * as coursesClient from "../client";
export default function AssignmentsEditor() {
  const { cid } = useParams();
  const [assignment, setAssignment] = useState<any>({
    _id: "0",
    title: "New Assignment",
    course: cid,
    description: "New Assignment Description",
    dueDate: "2024-12-15",
    availableFromDate: "2024-12-10",
    availableUntilDate: "2024-12-20",
    points: 100,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const saveAssignment = async (e: any) => {
  //     e.preventDefault();
  //     if (!cid) return;
  //     const newAssignment = await coursesClient.createAssignmentForCourse(cid, assignment);
  //     dispatch(addAssignment(newAssignment));
  //     navigate(`/kanbas/courses/${cid}/Assignments/`);
  // };

  const saveAssignment = async (e: any) => {
    e.preventDefault();
    try {
      // Validate course ID
      if (!cid) {
        console.error("Course ID is missing.");
        return;
      }
      // Call API to create a new assignment
      const newAssignment = await coursesClient.createAssignmentForCourse(
        cid,
        assignment
      );
      // Update the store with the new assignment
      dispatch(addAssignment(newAssignment));
      // Navigate to the assignments page
      navigate(`/kanbas/courses/${cid}/Assignments/`);
    } catch (error: any) {
      console.error("Error saving assignment:", error);
      navigate(`/kanbas/courses/${cid}/Assignments/`);
    }
  };

  return (
    <div id="wd-assignments-editor" className="container py-4">
      {/* Assignment Name */}
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          type="text"
          id="wd-name"
          className="form-control form-control-lg"
          value={assignment.title}
          placeholder="New Assignment"
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      {/* Assignment Description */}
      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          Assignment Description
        </label>
        <input
          type="text"
          id="wd-description"
          className="form-control form-control-lg"
          value={assignment.description}
          placeholder="New Assignment Description"
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      <form>
        {/* Points */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-points" className="col-form-label float-end ">
              Points
            </label>
          </div>
          <div className="col-md-9">
            <input
              type="number"
              id="wd-points"
              className="form-control form-control-lg"
              value={assignment.points}
              min={0}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* Assign to */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="wd-assign" className="col-form-label float-end ">
              Assign
            </label>
          </div>
          <div
            id="wd-assign"
            className="col-md-9 border border-light-subtle rounded"
          >
            <div className="mt-3 mb-3">
              <label
                htmlFor="wd-due-date"
                className="form-label fs-6 fw-bolder"
              >
                Due
              </label>

              <input
                type="date"
                className="form-control"
                id="wd-due-date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </div>

            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label
                    htmlFor="wd-available-from"
                    className="form-label fs-6 fw-bolder"
                  >
                    Available From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="wd-available-from"
                    value={assignment.availableFromDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFromDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label
                    htmlFor="wd-available-until"
                    className="form-label fs-6 fw-bolder"
                  >
                    Until
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="wd-available-until"
                    value={assignment.availableUntilDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntilDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ width: "100%", margin: "0" }} className="mt-3" />
        <div className="mt-3 float-end">
          <button
            type="button"
            className="btn btn-lg btn-secondary me-1"
            onClick={() => navigate(`/kanbas/courses/${cid}/Assignments/`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-lg btn-danger me-1"
            onClick={saveAssignment}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
