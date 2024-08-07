import "@/app/index.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'bootstrap/dist/css/bootstrap.css';

import { PrimeReactProvider } from "primereact/api";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/app/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
