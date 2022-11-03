import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import "../styles/index.css";

function Root() {
  const [count, setCount] = useState(0);

  return (
    <div className={`App bg-secondary h-screen`}>
      <div className="bg-white flex-col flex-1 ">
        <div className=" pb-40 ">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
