import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <span className="rounded-pill border border-dark px-3 py-1 me-1">
                40% of Total
            </span>
            <FaPlus className="fs-4 me-1" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}