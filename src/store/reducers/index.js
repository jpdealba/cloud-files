import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../actions/counterSlice";

export default configureStore({
  reducer: { counter: counterSlice },
});
