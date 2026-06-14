import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Style/index.css";

import LogIn from "./LogIn";
import App from "./App";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback="loading">
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
