import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common/index.scss";
import { AppRouter } from "./router/app-router";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
);
