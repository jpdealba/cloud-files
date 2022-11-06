import axios from 'axios';
import { getBlob, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ErrorPage from "../components/error";
import Header from "../components/header";
import Loading from "../components/loading";
import { auth } from "../services/firebase";
const storage = getStorage();
//REDUCERS
import { loadAllFiles, loadAllFilesImages, loadMyFiles, loadMyFilesImages } from "../store/slices/filesSlice";
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
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        await getDocs(dispatch, user).then(() => {
          setLoading(false);
          navigate("/home");
        })
      } else {
        dispatch(
          loadMyFiles({files: []})
        );
        dispatch(
          loadAllFiles({files: []})
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
                element={isLoggedIn ? <Files setLoading={setLoading} /> : <Navigate to="/login" />}
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

const getDocs = async (dispatch, user) => {
    dispatch(
      logIn({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      })
    );
    await axios.get(API_URL + "files/created/" + user.uid).then(async res => {
      // dispatch(
      //   loadMyFiles({ files: res.data })
      // )
      const promises = res.data.map(file => {
        return new Promise(async(resolve, reject) => {
          const gsReferencePreview = ref(storage, file.preview_url)
          await getDownloadURL(gsReferencePreview).
            then(res => {
              file.preview_url = res
              file.file = res
              resolve(file)
            }).catch(err => reject(401))
        })
      })
      Promise.all(promises).then((val) => {
        dispatch(
          loadMyFiles({ files: val })
        )
      }).catch(err => console.log("test"))
     
    }).catch(err => console.log(err))
  
    await axios.get(API_URL + "files/user/" + user.uid).then(async res => {
      const promises = res.data.map(file => {
        return new Promise(async(resolve, reject) => {
          const gsReferencePreview = ref(storage, file.preview_url)
          await getDownloadURL(gsReferencePreview).
            then(res => {
              file.preview_url = res 
              file.file = res
              resolve(file)
            }).catch(err => reject(401))
        })
      })
      Promise.all(promises).then((val) => {
        dispatch(
          loadAllFiles({ files: val })
        )
      })
     
    }).catch(err => console.log(err))
  
}



export default Root;

