import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    myFiles: [],
    myFilesImages: [],
    allFiles: [],
    searchFiles: [],
  },
  reducers: {
    loadMyFiles: (state, { type, payload }) => {
      state.myFiles = payload.files;
    },
    loadMyFilesImages: (state, { type, payload }) => {
      state.myFilesImages = payload.images;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadMyFiles, loadMyFilesImages } = filesSlice.actions;

export default filesSlice.reducer;
