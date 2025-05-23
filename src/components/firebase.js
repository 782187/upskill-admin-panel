import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCHxauU6UEJJLOlbljyI9tEPJEWOOAu8aI",
  authDomain: "pushnotifications-b2b51.firebaseapp.com",
  projectId: "pushnotifications-b2b51",
  storageBucket: "pushnotifications-b2b51.appspot.app",
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
      console.warn("Notification permission not granted.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BKu03YLCuyg-gdINMoclEBs4l_ERpDwT_22DwaaZHQc3pfncAV5H6s_utKtzje5o0Kd1qYBYq6APPZHy-prOiGk",
    });

    if (token) {
      console.log("FCM token:", token);

      // Send token and adminId to backend
      const response = await fetch("https://upskill-server.onrender.com/register-fcm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: token,
          adminId: adminId
        }),
        credentials: "include" 
      });

      const result = await response.json();
      console.log("Token registration response:", result);
    } else {
      console.warn("No registration token available. Permission was not granted.");
    }
  } catch (err) {
    console.error("An error occurred while requesting permission or sending token to backend:", err);
  }
};

// Listen for messages when the app is open
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
