import AssignmentBody from "./AssignmentBody";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControl";

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
