import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ErrorPage from "../components/error";
import Header from "../components/header";
import firebase from "../services/firebase";
import { logIn, logOut } from "../store/slices/firebaseSlice";
import "../styles/index.css";
import Home from "./home";
import Login from "./login";
const auth = getAuth();

function Root() {
  const state = useSelector((state) => state.firebase);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(
          logIn({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/home");
      } else {
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className={`App bg-secondary h-screen`}>
      <div className="bg-white flex-col flex-1 ">
        <div className=" pb-40 ">
          <Header />
          <Routes>
            <Route
              path="/login"
              element={<Login />}
              errorElement={<ErrorPage />}
            />
            {isLoggedIn && <Route exact path="/home" element={<Home />} />}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Root;
