import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/error";
import { default as Login } from "./routes/login";
import Root from "./routes/root";

import reducers from "./store/reducers";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reducers}>
    <React.StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
