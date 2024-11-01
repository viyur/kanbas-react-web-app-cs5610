import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Home from "./Home";
import Assignments from "./Assignments";
import Modules from "./Modules";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import AssignmentsEditor from "./Assignments/AssignmentsEditor";
import AssignmentEditor from "./Assignments/AssignmentEditor";



export default function Courses({ courses }: { courses: any[]; }) {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    return (
        <div id="wd-courses">
            {/* <div>
                {JSON.stringify(useParams(), null, 4)}
            </div> */}
            <h2 className="text-danger"> <FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]}

            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/add" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentsEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div></div>

        </div>
    );
}
