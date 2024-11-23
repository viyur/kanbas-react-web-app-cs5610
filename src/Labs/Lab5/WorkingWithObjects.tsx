import React, { useState } from "react";
import { useNavigate } from "react-router";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

    const [module, setModule] = useState({
        id: 1, name: "web development", description: "Learn full stack web development",
        course: "CS 5610"
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <hr />
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                value={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <hr />

            <h4>Modifying Assignment Score</h4>
            <a href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`} className="btn btn-primary float-end">
                Update Score    </a>
            <input className="form-control w-75" id="wd-assignment-score" type="number"
                value={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
            <hr />
            <h4>Modifying Assignment Completed State</h4>
            <div className="form-check">
                <input className="form-check-input" id="wd-assignment-completed" type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    <a href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>Update Completed State</a>
                </label>

            </div>
            <hr />


            {/* get and update module  */}
            <h4>Retrieving Module Object</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr />
            <h4>Retrieving Module Name</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr />
            <h4>Modifying Module Name</h4>
            <a id="wd-update-module-name" className="btn btn-primary float-end"
                href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
                Update Module Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                value={module.name} onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <hr />
            <h4>Modifying Module Description</h4>
            <a id="wd-update-module-description" className="btn btn-primary float-end"
                href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
                Update Module Description
            </a>
            <input className="form-control w-75" id="wd-module-description"
                value={module.description} onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <hr />

        </div>
    );
}
