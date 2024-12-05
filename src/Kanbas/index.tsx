import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";

export default function Kanbas() {
  // currentUser from redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // courses state variables
  const [courses, setCourses] = useState<any[]>([]);
  // single course template
  const [course, setCourse] = useState<any>({
    credits: 4,
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/RS101.png",
    description: "New Description",
  });

  // functions
  const fetchCoursesForUser = async () => {
    try {
      // const courses = await userClient.findMyCourses();
      // const courses = await courseClient.fetchAllCourses();
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
      setCourses([]);
    }
  };

  // add new course
  const addNewCourse = async () => {
    // const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  // delete a course
  const deleteCourse = async (courseId: string) => {
    try {
      // Call the course client to delete the course
      const status = await courseClient.deleteCourse(courseId);
      // Check if the backend confirms the deletion
      if (status && status.success) {
        // Update the courses state only if deletion is confirmed
        setCourses(courses.filter((course) => course._id !== courseId));
      } else {
        // Handle the failure case
        console.error(
          "Failed to delete course:",
          status.message || "Unknown error"
        );
        alert(status.message || "Failed to delete course. Please try again.");
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues, server errors)
      console.error("An error occurred while deleting the course:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // update a course
  const updateCourse = async () => {
    try {
      // Call the client function to update the course
      const response = await courseClient.updateCourse(course);
      // Check if the update was successful
      if (response.success) {
        // Update the state with the modified course
        setCourses(courses.map((c) => (c._id === course._id ? course : c)));
      } else {
        // Handle case where update was not successful
        console.error(
          response.message || "Failed to update course. Please try again."
        );
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network or server issues)
      console.error("An error occurred while updating the course:", error);
    }
  };

  useEffect(() => {
    fetchCoursesForUser();
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />

        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    fetchCoursesForUser={fetchCoursesForUser}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
