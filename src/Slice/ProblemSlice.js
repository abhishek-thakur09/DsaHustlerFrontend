import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
};

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setTotalProblems: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setTotalProblems } = problemSlice.actions;
export default problemSlice.reducer;
