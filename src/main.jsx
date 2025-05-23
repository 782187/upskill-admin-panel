import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EnquiryNotificationToast from "./Pages/EnquiryNotificationToast.jsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "./components/firebase";

  if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registered: ", registration.scope);
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <EnquiryNotificationToast/>
      <App />
  </StrictMode>
);
