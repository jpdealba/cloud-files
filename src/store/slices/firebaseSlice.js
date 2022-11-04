import { createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const auth = getAuth();
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
      signOut(auth);
      state.user = {};
      state.loggedIn = false;
    },
    getState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, getState } = firebaseSlice.actions;

export default firebaseSlice.reducer;
