import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BrowserProvider } from "./context/BrowserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BrowserProvider>
        <App />
      </BrowserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
