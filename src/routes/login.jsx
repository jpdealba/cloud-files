import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../services/firebase";
import { increment } from "../store/slices/counterSlice";
import { logIn } from "../store/slices/firebaseSlice";
const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  const log = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch(
          logIn({
            displayName: res.user.displayName,
            email: res.user.email,
            uid: res.user.uid,
            token: res._tokenResponse.refreshToken,
          })
        );
      })
      .catch((error) => {
        toast(error.code);
      });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <section
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          log();
        }
      }}
    >
      <div className="px-6 text-gray-800 flex flex-col">
        <h1 className="mt-10 mb-5 self-center font-bold text-primary leading-tight text-4xl">
          Cloud Files
        </h1>
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <p className="text-lg mb-0 mr-4">Sign in with</p>
            <form>
              <div
                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 
              before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              ></div>
              <div className="mb-6">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white 
                  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
                   focus:bg-white focus:border-secondary focus:outline-none"
                  id="email"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white 
                  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out
                   m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => log()}
                  type="button"
                  className="inline-block px-7 py-3 bg-primary text-white font-medium 
                  text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
                  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg 
                  transition duration-150 ease-in-out"
                >
                  Login
                </button>
                <div className="text-center lg:text-left">
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="#!"
                      className="text-primary hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-5"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
