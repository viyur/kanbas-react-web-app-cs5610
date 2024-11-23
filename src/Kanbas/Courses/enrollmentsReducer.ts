import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    enrollments: [],
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: enrollment._id,
                user: enrollment.user,
                course: enrollment.course
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: { courseId, userId } }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => !(e.course === courseId && e.user === userId)
            );
        }

    },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
