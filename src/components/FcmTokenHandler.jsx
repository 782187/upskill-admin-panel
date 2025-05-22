import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCP7Tbb66rUgfyvA50sqVPbObAw_A-Yezo",
  authDomain: "myprojectnotifications-8916d.firebaseapp.com",
  projectId: "myprojectnotifications-8916d",
  storageBucket: "myprojectnotifications-8916d.firebasestorage.app",
  messagingSenderId: "491410102542",
  appId: "1:491410102542:web:7517f5ca45cba13fc71f5f",
  measurementId: "G-DTX2C6PLV0"
};

const messaging = getMessaging(initializeApp(firebaseConfig));

function requestFirebaseNotificationPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function sendTokenToBackend(token, adminId) {
  fetch("https://upskill-server.onrender.com/register-fcm-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: token,
      adminId: adminId, 
    }),
    credentials: "include",
  }).then(res => {
    if (res.ok) console.log("FCM token sent to backend successfully.");
    else console.error("Failed to send FCM token to backend.");
  }).catch(err => {
    console.error("Error sending token to backend:", err);
  });
}

export default function FcmTokenHandler({ adminId }) {
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then(() => getToken(messaging, { vapidKey: "BDohq_qOBVSW-h1t_Tv-emvero7UsnLK7sSrbk0iyTGBTpN8qClK7N09uyYD5T97SvRipTgZJ2E67LllAYqOJfI" }))
      .then(token => {
        if (token) {
          console.log("FCM Token:", token);
          sendTokenToBackend(token, adminId);
        } else {
          console.warn("No registration token available. Request permission to generate one.");
        }
      })
      .catch(err => {
        console.error("An error occurred while retrieving token.", err);
      });

    onMessage(messaging, payload => {
      console.log("Message received in foreground:", payload);
    });
  }, [adminId]);

  return null;
}
