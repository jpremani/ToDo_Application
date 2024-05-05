import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    tododata: todoSlice,
    user: userSlice,
  },
});
export default store;
