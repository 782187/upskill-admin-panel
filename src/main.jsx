import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EnquiryNotificationToast from "./Pages/EnquiryNotificationToast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <EnquiryNotificationToast/>
      <App />
  </StrictMode>
);
