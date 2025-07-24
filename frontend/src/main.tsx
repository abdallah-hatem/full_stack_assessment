import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";

const theme = { token: { colorPrimary: "#ed1b24" } };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <App />
        <ToastContainer />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
