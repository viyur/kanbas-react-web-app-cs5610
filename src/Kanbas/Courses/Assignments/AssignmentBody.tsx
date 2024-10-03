import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdAssignment } from "react-icons/md";
import SingleAssignmentButtons from "./SingleAssignmentButtons";
import { MdArrowDropDown } from "react-icons/md";



export default function AssignmentBody() {
    return (
        <div>
            <ul className="list-group rounded-0">
                <li className="wd-title list-group-item p-0  fs-5 border-gray">
                    <div className="wd-assignments-title p-3 ps-2 bg-secondary">  <BsGripVertical className="me-2 fs-3" />
                        <MdArrowDropDown className="me-2 fs-3" />
                        ASSIGENMENTS <AssignmentControlButtons />
                    </div> </li>
                {/* different assignments */}
                <ul className="list-group rounded-0 wd-assignment-list">
                    {/* A1 */}
                    <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center wd-assignment-list-item">
                        {/* Buttons on the left */}
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4 text-muted" />
                            <MdAssignment className="me-3 fs-4 text-success" />
                        </div>
                        {/* Assignment Details */}
                        <div className="flex-grow-1">
                            {/* Assignment Title */}
                            <a
                                className="wd-assignment-link text-decoration-none text-black fw-bold fs-5"
                                href="#/Kanbas/Courses/1234/Assignments/123"
                            >
                                A1
                            </a>
                            {/* Assignment Details */}
                            <div className="text-muted mt-1">
                                <span className="text-danger">Multiple Modules</span> | <strong>Available until</strong> Nat 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100pts
                            </div>
                        </div>
                        {/* Buttons on the right */}
                        <div className="ms-3">
                            <SingleAssignmentButtons />
                        </div>
                    </li>

                    {/* A2 */}
                    <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center wd-assignment-list-item">
                        {/* Buttons on the left */}
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4 text-muted" />
                            <MdAssignment className="me-3 fs-4 text-success" />
                        </div>
                        {/* Assignment Details */}
                        <div className="flex-grow-1">
                            {/* Assignment Title */}
                            <a
                                className="wd-assignment-link text-decoration-none text-black fw-bold fs-5"
                                href="#/Kanbas/Courses/1234/Assignments/123"
                            >
                                A2
                            </a>
                            {/* Assignment Details */}
                            <div className="text-muted mt-1">
                                <span className="text-danger">Multiple Modules</span> | <strong>Available until</strong> Nat 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100pts
                            </div>
                        </div>
                        {/* Buttons on the right */}
                        <div className="ms-3">
                            <SingleAssignmentButtons />
                        </div>
                    </li>

                    {/* A3 */}
                    <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center wd-assignment-list-item">
                        {/* Buttons on the left */}
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4 text-muted" />
                            <MdAssignment className="me-3 fs-4 text-success" />
                        </div>
                        {/* Assignment Details */}
                        <div className="flex-grow-1">
                            {/* Assignment Title */}
                            <a
                                className="wd-assignment-link text-decoration-none text-black fw-bold fs-5"
                                href="#/Kanbas/Courses/1234/Assignments/123"
                            >
                                A3
                            </a>
                            {/* Assignment Details */}
                            <div className="text-muted mt-1">
                                <span className="text-danger">Multiple Modules</span> | <strong>Available until</strong> Nat 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100pts
                            </div>
                        </div>
                        {/* Buttons on the right */}
                        <div className="ms-3">
                            <SingleAssignmentButtons />
                        </div>
                    </li>

                </ul>
            </ul>
        </div>
    );
}