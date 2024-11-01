import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export default function TOC() {
    const { pathname } = useLocation();
    return (
        <ul className="nav nav-pills">
            <li className="nav-item"><Link id="wd-a" className="nav-link" to="/Labs">Labs</Link></li>
            <li className="nav-item"><Link id="wd-a1" className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`} to="/Labs/Lab1">Lab 1</Link></li>
            <li className="nav-item"><Link id="wd-a2" className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`} to="/Labs/Lab2">Lab 2</Link></li>
            <li className="nav-item"><Link id="wd-a3" className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`} to="/Labs/Lab3">Lab 3</Link></li>
            <li className="nav-item"><Link id="wd-a4" className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`} to="/Labs/Lab4">Lab 4</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Kanbas">Kanbas</Link></li>
            <li className="nav-item"><Link className="nav-link" id="wd-github" to="https://github.com/viyur/kanbas-react-web-app-cs5610">My Github Link</Link></li>
        </ul>
    )
}