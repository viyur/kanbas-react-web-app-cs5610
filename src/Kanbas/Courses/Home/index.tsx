import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <Modules />
            </div>
            {/* CourseStatus will disappear first */}
            <div className="ms-3 d-none d-lg-block">
                <CourseStatus />
            </div>
        </div>


    );
}
