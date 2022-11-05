import { createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../services/firebase";

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    loggedIn: false,
    user: {},
  },
  reducers: {
    logIn: (state, { type, payload }) => {
      sessionStorage.setItem("Auth Token", payload.token);
      state.user = payload;
      state.loggedIn = true;
    },
    logOut: (state) => {
      sessionStorage.removeItem("Auth Token");
      auth.signOut();
      state.user = {};
      state.loggedIn = false;
    },
    getState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, getState } = firebaseSlice.actions;

export default firebaseSlice.reducer;
