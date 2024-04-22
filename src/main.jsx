import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/app/index.css";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
