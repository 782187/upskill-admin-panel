import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCHxauU6UEJJLOlbljyI9tEPJEWOOAu8aI",
  authDomain: "pushnotifications-b2b51.firebaseapp.com",
  projectId: "pushnotifications-b2b51",
  storageBucket: "pushnotifications-b2b51.firebasestorage.app",
  messagingSenderId: "733666808831",
  appId: "1:733666808831:web:654910659bfdb73175cdca",
  measurementId: "G-YW4XVFYMNX"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async (adminId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🚫 Notification permission not granted.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: "BKu03YLCuyg-gdINMoclEBs4l_ERpDwT_22DwaaZHQc3pfncAV5H6s_utKtzje5o0Kd1qYBYq6APPZHy-prOiGk",
      serviceWorkerRegistration: registration
    });

    if (token) {
      console.log("✅ FCM token:", token);

      const response = await fetch("https://upskill-server.onrender.com/register-fcm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token,
          adminId
        }),
        credentials: "include"
      });

      const result = await response.json();
      console.log("🛰️ Token registration response:", result);
    } else {
      console.warn("⚠️ No registration token available.");
    }
  } catch (err) {
    console.error("🔥 Error requesting permission or sending token:", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground message received: ", payload);
      resolve(payload);
    });
  });
