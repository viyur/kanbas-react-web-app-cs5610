import { createSlice } from "@reduxjs/toolkit";

const initialState = {}; //

const tempQuizSlice = createSlice({
  name: "tempQuiz",
  initialState,
  reducers: {
    // setter
    setTempQuiz: (state, action) => {
      return { ...action.payload }; // 完全替换内容
    },

    // reset
    clearTempQuiz: () => {
      return initialState; // 重置为初始状态
    },
  },
});

export const { setTempQuiz, clearTempQuiz } = tempQuizSlice.actions;
export default tempQuizSlice.reducer;
