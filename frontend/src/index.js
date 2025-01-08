import "bulma/css/bulma.css";
import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import App from "./App";

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
