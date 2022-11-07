import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    myFiles: [],
    myFilesImages: [],
    allFiles: [],
    allFilesImages: [],
    searchFiles: [],
  },
  reducers: {
    loadMyFiles: (state, { type, payload }) => {
      state.myFiles = payload.files;
    },
    loadMyFilesImages: (state, { type, payload }) => {
      state.myFilesImages = payload.images;
    },
    loadAllFiles: (state, { type, payload }) => {
      state.allFiles = payload.files;
    },
    loadAllFilesImages: (state, { type, payload }) => {
      state.allFilesImages = payload.images;
    },
    clearFile: (state, { type, payload }) => {
      state.allFiles = payload.allFiles;
      state.myFiles = payload.myFiles;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadMyFiles,
  loadMyFilesImages,
  loadAllFiles,
  loadAllFilesImages,
  clearFile,
} = filesSlice.actions;

export default filesSlice.reducer;
