import AssignmentBody from "./AssignmentBody";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <br /><br />
            <AssignmentsControls />
            <br /><br />

            <AssignmentBody />
        </div>
    );
}
