import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Style/index.css";

import LogIn from "./LogIn";
import App from "./App";
import { registerServiceWorker } from "./pwaInstall";
import "./i18n"

registerServiceWorker();

const root = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
  <Suspense fallback="loading">
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/*" element={<App />} />
    </Routes>
    </Suspense>
  </BrowserRouter>,
  root
);
