import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
      console.log(`initial state ${initialState}`);
    },
  },
});

export default userSlice.reducer;
export const { add } = userSlice.actions; // Corrected from userSlice.action to userSlice.actions
