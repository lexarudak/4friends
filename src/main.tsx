import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common/index.scss";
import { AppRouter } from "./router/app-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ScrollTop } from "./components/scroll-top/scroll-top";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <ScrollTop />
          <AppRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
);
