import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import LeadsPage from "./LeadsPage";

const isLeadsPage = new URLSearchParams(window.location.search).get("page") === "leads";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isLeadsPage ? <LeadsPage /> : <App />}
  </StrictMode>
);
