import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { auth } from "../services/firebase";
import { logIn } from "../store/slices/firebaseSlice";
const auth = getAuth();

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [registration, setRegistration] = useState({
    register: false,
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const log = async () => {
    registration.register
      ? checkDatabeforeSubmit(registration, dispatch)
      : await signInWithEmailAndPassword(auth, login.email, login.password)
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

  return (
    <section
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          log();
        }
      }}
    >
      <div className="px-6 text-gray-800 flex flex-col">
        <h1 className="mt-10 mb-5 self-center font-bold leading-tight text-4xl">
          Cloud Files
        </h1>
        <div className=" flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-1/2 g-6 md:px-10 px-0">
          <div className=" justify-center flex grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-6/12 mb-10 md:mb-0">
            <img
              src="./documents2.png"
              className="w-2/3 self-center"
              alt="Sample image"
            />
          </div>
          <div className="flex justify-center  xl:w-6/12 lg:w-6/12 md:w-6/12 w-full mb-12 md:mb-0 ">
            {registration.register ? (
              <RegisterForm
                setRegistration={setRegistration}
                log={log}
                registration={registration}
              />
            ) : (
              <LoginForm
                setLogin={setLogin}
                log={log}
                setRegistration={setRegistration}
                registration={registration}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const FormBottom = ({ log, setRegistration, registration }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => log()}
        type="button"
        className="inline-block px-7 py-3 bg-primary text-white font-medium
                  text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out"
      >
        {registration.register ? "Register" : "Login"}
      </button>
      <div className="text-center lg:text-left">
        <p className="text-sm font-semibold mt-2 pt-1 mb-0 ml-5 flex justify-center flex-col">
          Don't have an account?
          <button
            onClick={() =>
              setRegistration((state) => ({
                ...state,
                register: !state.register,
              }))
            }
            className="text-primary hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
          >
            {registration.register ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

const LoginForm = ({ setLogin, setRegistration, registration, log }) => {
  return (
    <div className="xl:ml-20  mb-12 md:mb-0 ">
      <p className="text-lg mb-0 mr-4">Sign in with</p>
      <div
        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300
              before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
      ></div>
      <InputElement
        setElement={(e) =>
          setLogin((state) => ({
            ...state,
            email: e.target.value,
          }))
        }
        placeholder={"Email address"}
        type={"email"}
      />
      <InputElement
        setElement={(e) =>
          setLogin((state) => ({
            ...state,
            password: e.target.value,
          }))
        }
        placeholder={"Password"}
        type={"password"}
      />
      <FormBottom
        log={log}
        setRegistration={setRegistration}
        registration={registration}
      />
    </div>
  );
};

const RegisterForm = ({ setRegistration, log, registration }) => {
  return (
    <div className="xl:ml-20 mb-12 md:mb-0">
      <p className="text-lg mb-0 mr-4">Register</p>
      <div
        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300
              before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
      ></div>
      <InputElement
        setElement={(e) =>
          setRegistration((state) => ({ ...state, email: e.target.value }))
        }
        placeholder={"Email address"}
        type={"email"}
      />
      <InputElement
        setElement={(e) =>
          setRegistration((state) => ({ ...state, username: e.target.value }))
        }
        placeholder={"Username"}
      />
      <InputElement
        setElement={(e) =>
          setRegistration((state) => ({ ...state, password1: e.target.value }))
        }
        placeholder={"Password"}
        type={"password"}
      />
      <InputElement
        setElement={(e) =>
          setRegistration((state) => ({ ...state, password2: e.target.value }))
        }
        placeholder={"Verify Password"}
        type={"password"}
      />
      <FormBottom
        log={log}
        setRegistration={setRegistration}
        registration={registration}
      />
    </div>
  );
};

const InputElement = ({ setElement, placeholder, type }) => {
  return (
    <div className="mb-4 transform md:scale-100 scale-90">
      <input
        onChange={setElement}
        type={type}
        className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white
                  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out
                   m-0 focus:text-gray-700 focus:bg-white focus:border-secondary focus:outline-none"
        id={placeholder}
        placeholder={placeholder}
      />
    </div>
  );
};

const checkDatabeforeSubmit = async (data, dispatch) => {
  if (
    data.email.length > 0 &&
    data.password1.length > 0 &&
    data.password2.length > 0 &&
    data.username.length > 0
  ) {
    if (data.password1 != data.password2) {
      toast("Passwords not matching");
    } else {
      await createUserWithEmailAndPassword(auth, data.email, data.password1)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: data.username,
          });

          dispatch(
            logIn({
              displayName: data.username,
              email: user.user.email,
              uid: user.user.uid,
              token: user._tokenResponse.refreshToken,
            })
          );
        })
        .catch((err) => {
          if (err.message == "Firebase: Error (auth/email-already-in-use).") {
            toast("Email already in use");
          } else {
            toast(err.message);
          }
        });
    }
  } else {
    toast("Please complete your information");
  }
};
