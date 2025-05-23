import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export function requestNotificationPermission() {
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      return true;
    } else {
      throw new Error('Notification permission denied');
    }
  });
}

export function sendFcmToken(adminId) {
  return requestNotificationPermission()
    .then(() => {
      return getToken(messaging, {
        vapidKey: "BKu03YLCuyg-gdINMoclEBs4l_ERpDwT_22DwaaZHQc3pfncAV5H6s_utKtzje5o0Kd1qYBYq6APPZHy-prOiGk"
      });
    })
    .then(token => {
      if (!token) {
        throw new Error("No FCM token received");
      }
      console.log("FCM Token:", token);
      return fetch("https://upskill-server.onrender.com/register-fcm-token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token, adminId }),
        credentials: "include"
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to register token with server");
      }
      return response.text(); 
    })
    .catch(error => {
      console.error("Error during notification setup:", error.message || error);
    });
}
