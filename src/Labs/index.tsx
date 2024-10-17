import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";
import { Routes, Route } from "react-router"
export default function Labs() {
    return (
        // you don't need hashrouter here
        <div id="wd-labs">
            <h1>Hengwei Yang </h1>
            <h1>Labs</h1>

            <TOC />

            <Routes>
                <Route path="Lab1" element={<Lab1 />}></Route>
                <Route path="Lab2" element={<Lab2 />}></Route>
                <Route path="Lab3/*" element={<Lab3 />}></Route>
            </Routes>
        </div>
    )
}