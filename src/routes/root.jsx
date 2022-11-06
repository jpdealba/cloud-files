import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ErrorPage from "../components/error";
import Header from "../components/header";
import Loading from "../components/loading";
import { auth } from "../services/firebase";

//REDUCERS
import { loadMyFiles } from "../store/slices/filesSlice";
import { logIn, logOut } from "../store/slices/firebaseSlice";
import "../styles/index.css";
import { API_URL } from '../utilities/utils';
// ROUTES
import Files from "./files";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Upload from "./upload";

// const auth = getAuth();

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(
          logIn({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        );
        setLoading(false);
        navigate("/home");
      } else {
        dispatch(
          loadMyFiles({files: []})
        );
        setLoading(false);
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className={`App bg-white h-screen `}>
      <div className="bg-white flex-col flex-1 ">
        <Header />
        <div className=" pb-20 ">
          <ToastContainer autoClose={3000} />
          {!loading ? (
            <Routes>
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
                errorElement={<ErrorPage />}
              ></Route>
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="/upload"
                element={isLoggedIn ? <Upload /> : <Navigate to="/login" />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="/files"
                element={isLoggedIn ? <Files /> : <Navigate to="/login" />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="/profile/:id"
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="*"
                exact={true}
                element={<ErrorPage />}
                errorElement={<ErrorPage />}
              />
            </Routes>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default Root;
