import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    myFiles: [],
    allFiles: [],
    searchFiles: [],
  },
  reducers: {
    loadMyFiles: (state, { type, payload }) => {
      state.myFiles = payload.files;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadMyFiles } = filesSlice.actions;

export default filesSlice.reducer;
