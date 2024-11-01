import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export default function AssignmentsControls() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role.toUpperCase() === "FACULTY";
    return (

        <div className="text-nowrap">
            <div className="row">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text"><CiSearch /></span>
                        <input id="wd-search-assignment"
                            placeholder="Search..." className="float-start me-3 form-control form-control-lg" />
                    </div>

                </div>
                {isFaculty &&
                    <div className="col-6 ">
                        <Link to={`/kanbas/courses/${cid}/Assignments/add`}>
                            <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end"><FaPlus /> Assignment</button>
                        </Link>

                        <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end"><FaPlus /> Group</button>
                    </div>
                }
            </div>
        </div>
    );
}
