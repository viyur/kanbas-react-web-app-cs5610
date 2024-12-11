import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Courses/enrollmentsReducer";
import tempQuizReducer from "./Courses/Quizzes/tempQuizReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    tempQuizReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
  },
});
export default store;
