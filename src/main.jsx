import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EnquiryNotificationToast from "./Pages/EnquiryNotificationToast.jsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "./components/firebase";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <EnquiryNotificationToast/>
      <App />
  </StrictMode>
);
