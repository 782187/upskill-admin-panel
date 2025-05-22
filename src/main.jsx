import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FcmTokenHandler from "./components/FcmTokenHandler.jsx";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
      <FcmTokenHandler adminId="admin1" />
  </StrictMode>
);
