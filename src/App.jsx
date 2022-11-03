import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./components/header";
import "./styles/index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={`App bg-secondary h-screen`}>
      <div className="bg-white flex-col flex-1 ">
        <div className=" pb-40 ">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default App;
