import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Hawksbill from "./pages/Hawksbill";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Hawksbill />
  </React.StrictMode>
);

reportWebVitals(console.log);
