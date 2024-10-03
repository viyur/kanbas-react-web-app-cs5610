import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function SingleAssignmentButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
