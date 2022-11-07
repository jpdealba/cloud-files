import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counterSlice";
import filesSlice from "../slices/filesSlice";
import firebaseSlice from "../slices/firebaseSlice";
import modalSlice from "../slices/modalSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
    firebase: firebaseSlice,
    files: filesSlice,
    modal: modalSlice,
  },
});
