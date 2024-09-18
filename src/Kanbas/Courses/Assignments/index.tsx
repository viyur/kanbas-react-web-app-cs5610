export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment"
                placeholder="Search for Assignments" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A1 - ENV + HTML
                    </a>
                    <p>                    Multiple Modules | <strong>Not available until</strong> Nat 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100pts
                    </p>
                </li>
                <li className="wd-assignment-list-item">
                    {/* Complete On Your Own */}
                    <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A2 - CSS + BOOTSTRAP
                    </a>

                </li>
            </ul>
        </div>
    );
}
