import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>
)