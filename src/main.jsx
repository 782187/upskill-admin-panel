import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EnquiryNotificationToast from "./Pages/EnquiryNotificationToast.jsx";
import { messaging } from "./components/firebase";
import { onMessage } from "firebase/messaging";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("ServiceWorker registered with scope:", registration.scope);
      })
      .catch((err) => {
        console.error("ServiceWorker registration failed:", err);
      });
  });
}

onMessage(messaging, (payload) => {
  console.log("Foreground message received:", payload);
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <EnquiryNotificationToast />
    <App />
  </StrictMode>
);
