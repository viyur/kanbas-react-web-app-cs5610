import { FaPlus } from "react-icons/fa6";
import { IoBanOutline } from "react-icons/io5";

import GreenCheckmark from "./GreenCheckmark";
export default function ModulesControls() {
    return (
        <div id="wd-modules-controls" className="text-nowrap">

            {/* module button */}
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module</button>
            {/* publish button and dropdown */}
            <div className="dropdown d-inline me-1 float-end">
                <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                    type="button" data-bs-toggle="dropdown">
                    <GreenCheckmark />
                    Publish All</button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                            <GreenCheckmark />
                            Publish all modules and items</a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                            <GreenCheckmark />
                            Publish modules only</a>
                    </li>
                    {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
              wd-unpublish-modules-only with labels Unpublish all modules and items
              and Unpublish modules only */}
                    {/* Added Unpublish All Modules and Items */}
                    <li>
                        <a
                            id="wd-unpublish-all-modules-and-items"
                            className="dropdown-item"
                            href="#"
                        >
                            <IoBanOutline className="me-1 fs-5" />
                            Unpublish all modules and items
                        </a>
                    </li>

                    {/* Unpublish Modules Only */}
                    <li>
                        <a
                            id="wd-unpublish-modules-only"
                            className="dropdown-item"
                            href="#"
                        >
                            <IoBanOutline className="me-1 fs-5" />
                            Unpublish modules only
                        </a>
                    </li>
                </ul>
            </div>
            {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}

            {/* View Progress Button */}
            <button
                id="wd-view-progress"
                className="btn btn-lg btn-secondary me-1 float-end text-black"
            >
                {/* You can replace this with an appropriate icon if desired */}
                View Progress
            </button>

            {/* Collapse All Button */}
            <button
                id="wd-collapse-all"
                className="btn btn-lg btn-secondary me-1 float-end text-black"
            >
                {/* You can replace this with an appropriate icon if desired */}
                Collapse All
            </button>
        </div>
    );
}

