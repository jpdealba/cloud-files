import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../services/firebase";
import { increment } from "../store/slices/counterSlice";
import { logIn } from "../store/slices/firebaseSlice";
const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  // console.log(firebase);
  const log = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
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
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <h1>Login</h1>
      Email:
      <br />
      <input
        type="text"
        value={email}
        className="text-black"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      Password:
      <br />
      <input
        type="password"
        value={password}
        className="text-black"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        // onClick={() => dispatch(logIn({ email: email, password: password }))}
        onClick={() => log()}
      >
        Log In
      </button>
    </div>
  );
}
