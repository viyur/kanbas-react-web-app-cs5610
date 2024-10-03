import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";

import { Routes, Route, Navigate } from "react-router";


export default function Account() {
    return (
        <div id="wd-account-screen">
            <div className="d-flex">
                <div >
                    <AccountNavigation />
                </div>
                <div className="ms-3 mt-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Signup" element={<Signup />} />
                    </Routes>
                </div>
            </div>
        </div >
    );
}
