import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";


export default function AssignmentControls() {
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
                <div className="col-6">
                    <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end"><FaPlus /> Assignment</button>

                    <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end"><FaPlus /> Group</button>
                </div>
            </div>
        </div>
    );
}
