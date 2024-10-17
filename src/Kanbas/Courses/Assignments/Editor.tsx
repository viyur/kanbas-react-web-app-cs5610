
import { SlCalender } from "react-icons/sl";
import { assignments } from "../../Database";
import { useParams, Link } from "react-router-dom";
export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const assignment = assignments.find((assignment: any) => assignment._id === aid);
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
                    value={assignment?.title}
                    readOnly
                />
            </div>


            <div className="mb-4">
                <div className="card border border-light-subtle rounded">
                    <div className="card-body">
                        <p className="card-text">
                            The assignment is <span className="text-danger">available online</span>.
                        </p>
                        <p className="card-text">Submit a link to the landing page of your web application running on Netlify.</p>
                        <p className="card-text">
                            The landing page should include the following:
                        </p>

                        <ul >
                            <li >Your full name and section</li>
                            <li >Links to each of the lab assignments</li>
                            <li >Link to the Kanbas application</li>
                            <li >Links to all relevant source code repositories</li>
                        </ul>
                        <p className="card-text mt-3">
                            The Kanbas application should include a link to navigate back to the landing page.
                        </p>
                    </div>
                </div>
            </div>





            <form >
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
                            value={100}
                            min={0}
                        />
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="wd-group" className="col-form-label float-end">
                            Assignment Group
                        </label>
                    </div>
                    <div className="col-md-9">
                        <select id="wd-group" className="form-select form-control-lg">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>

                {/* Display Grade As */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <label htmlFor="wd-display-grade-as" className="col-form-label float-end">
                            Display Grade as
                        </label>
                    </div>
                    <div className="col-md-9">
                        <select id="wd-display-grade-as" className="form-select form-control-lg">
                            <option value="PERCENTAGE">Percentage</option>
                        </select>
                    </div>
                </div>

                {/* Submission Type */}
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="wd-submission-type" className="col-form-label float-end">
                            Submission Type
                        </label>
                    </div>
                    <div className="col-md-9 border border-light-subtle rounded">
                        <select id="wd-submission-type" className="form-select form-control-lg mb-3 mt-3">
                            <option value="ONLINE">Online</option>
                        </select>

                        <fieldset >
                            <legend className="form-label fs-6 fw-bolder">
                                Online Entry Options </legend>
                            <div >
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name="check-genre" id="wd-text-entry" value="textEntry" />
                                    <label className="form-check-label" htmlFor="wd-text-entry">
                                        Text Entry </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name="check-genre" id="wd-website-url" value="websiteUrl" checked />
                                    <label className="form-check-label" htmlFor="wd-website-url" >
                                        Website URL </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name="check-genre" id="wd-media-recordings" value="mediaRecordings" />
                                    <label className="form-check-label" htmlFor="wd-media-recordings">
                                        Media Recordings </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name="check-genre" id="wd-student-annotation" value="studentAnnotation" />
                                    <label className="form-check-label" htmlFor="wd-student-annotation">
                                        Student Annotation </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                        name="check-genre" id="wd-file-upload" value="fileUploads" />
                                    <label className="form-check-label" htmlFor="wd-file-upload">
                                        File Uploads </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

                {/* Assign to */}
                <div className="row mb-3">
                    <div className="col-md-3">
                        <label htmlFor="wd-points" className="col-form-label float-end ">
                            Assign
                        </label>
                    </div>
                    <div className="col-md-9 border border-light-subtle rounded">
                        <div className="mt-3 mb-3">
                            <label htmlFor="wd-assign-to"
                                className="form-label fs-6 fw-bolder">
                                Assign to</label>
                            <input type="text" className="form-control"
                                id="wd-assign-to" value={"Everyone X"} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-due-date"
                                className="form-label fs-6 fw-bolder">
                                Due</label>


                            <input type="date" className="form-control"
                                id="wd-due-date" value={"2024-05-13"} />

                        </div>

                        <div className="row">
                            <div className="col-6">

                                <div className="mb-3">
                                    <label htmlFor="wd-available-from"
                                        className="form-label fs-6 fw-bolder">
                                        Available From</label>
                                    <input type="date" className="form-control"
                                        id="wd-available-from" value={"2024-05-06"} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="wd-available-until"
                                        className="form-label fs-6 fw-bolder">
                                        Until</label>
                                    <input type="date" className="form-control"
                                        id="wd-available-until" value={"2024-05-20"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ width: "100%", margin: "0" }} className="mt-3" />
                <div className="mt-3 float-end">
                    <Link to={`/kanbas/courses/${cid}/assignments/`}><button type="button" className="btn btn-lg btn-secondary me-1"> Cancel</button></Link>
                    <Link to={`/kanbas/courses/${cid}/assignments/`}> <button type="button" className="btn btn-lg btn-danger me-1"> Save</button></Link>
                </div>

            </form>

        </div>



    );
}
