import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counterSlice";
import firebaseSlice from "../slices/firebaseSlice";

export default configureStore({
  reducer: { counter: counterSlice, firebase: firebaseSlice },
});
