import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/AuthSlice";
import problemReducer from "../Slice/ProblemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemReducer,
  },
});
