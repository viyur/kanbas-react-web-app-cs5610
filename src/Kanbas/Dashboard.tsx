import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments, addEnrollment, deleteEnrollment } from "./Courses/enrollmentsReducer";


export default function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, fetchCourses }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void; fetchCourses: () => Promise<void>
    }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [showAllCourses, setShowAllCourses] = useState(false);
    const fetchAllCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            return allCourses;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMyEnrollments = async () => {
        try {
            const myEnrollments = await userClient.findMyEnrollments();
            console.log("myEnrollments", myEnrollments);
            dispatch(setEnrollments(myEnrollments));
        } catch (error) {
            console.error(error);
        }
    }
    const [all, setAll] = useState<any[]>([]);
    useEffect(() => {
        fetchAllCourses().then((data) => {
            setAll(data);
        });
    }, []);
    useEffect(() => {
        fetchMyEnrollments();
    }, []);



    const isFaculty = currentUser.role.toUpperCase() === "FACULTY";
    const isStudent = currentUser.role.toUpperCase() === "STUDENT";

    // check if user is enrolled in a course
    const isEnrolled = (courseId: any) => enrollments.some(
        (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );

    //Toggle between enrolled courses and all courses
    const toggleShowAllCourses = () => setShowAllCourses(!showAllCourses);

    // Handle enrolling to new course
    const handleEnroll = async (courseId: any) => {
        const enrollment = {
            user: currentUser._id,
            course: courseId
        };
        console.log("do you see the data", enrollment);
        const newEnrollment = await userClient.addEnrollment(enrollment);
        console.log("do you see the new Enrollment", newEnrollment);
        dispatch(addEnrollment(newEnrollment));
        await fetchCourses();

    };
    // Handle unenrolling from course
    // const handleUnenroll = (courseId: any) => {
    //     dispatch(deleteEnrollment({ courseId, userId: currentUser._id }));
    // };

    const handleUnenroll = async (courseId: string) => {
        try {
            await userClient.deleteEnrollment(currentUser._id, courseId); // Call API to delete enrollment
            await fetchCourses();
            dispatch(deleteEnrollment({ courseId, userId: currentUser._id })); // Update Redux state
        } catch (error) {
            console.error("Failed to unenroll:", error);
        }
    };


    // Filter courses based on enrollment status for students
    // Faculty can see all courses
    const visibleCourses = showAllCourses ? all : courses;



    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {/* Faculty can see the add new course buttons */}
            {isFaculty &&
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse} > Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>
                    <br />
                </div>}
            {/* Faculty can see the input areas for crud operations on courses */}
            {isFaculty &&
                <div>
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </div>
            }

            {/* Enrollments Toggle Button for Students */}
            {isStudent && (
                <button className="btn btn-primary float-end mb-2" onClick={toggleShowAllCourses}>
                    {showAllCourses ? "Enrollments" : "Show All Courses"}
                </button>
            )}

            {/* Published courses */}
            <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {visibleCourses
                        .map((course) => (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    {/* Faculty or enrolled students can see the course homepage */}
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                        onClick={(e) => { !(isEnrolled(course._id) || isFaculty) && e.preventDefault() }}>
                                        <img src={course.image ? course.image : `/images/${course._id}.png`} width="100%" height={160} alt="course" />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name} </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                {course.description} </p>
                                            <button className="btn btn-primary"> Go </button>

                                            {/* buttons for Faculty for editing */}
                                            {isFaculty && <button onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }} className="btn btn-danger float-end"
                                                id="wd-delete-course-click">
                                                Delete
                                            </button>}

                                            {isFaculty && <button id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse({ ...course });
                                                }}
                                                className="btn btn-warning me-2 float-end" >
                                                Edit
                                            </button>}

                                            {/* Enrollment Buttons for Students */}
                                            {isStudent && (
                                                <div className="float-end">
                                                    {isEnrolled(course._id) ? (
                                                        <button onClick={(e) => { e.preventDefault(); handleUnenroll(course._id) }}
                                                            className="btn btn-danger">Unenroll</button>
                                                    ) : (
                                                        <button onClick={async (e) => { e.preventDefault(); handleEnroll(course._id) }}
                                                            className="btn btn-success">Enroll</button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}


                </div>
            </div>
        </div >
    );
}
