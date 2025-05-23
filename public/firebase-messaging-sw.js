importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHxauU6UEJJLOlbljyI9tEPJEWOOAu8aI",
  authDomain: "pushnotifications-b2b51.firebaseapp.com",
  projectId: "pushnotifications-b2b51",
  storageBucket: "pushnotifications-b2b51.appspot.com",
  messagingSenderId: "733666808831",
  appId: "1:733666808831:web:654910659bfdb73175cdca",
  measurementId: "G-YW4XVFYMNX"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const { title, body, image } = payload.notification;

  const notificationOptions = {
    body: body,
    icon: "/logo.png",
    image: image,
    data: {
      url: "https://upskill-admin-panel.onrender.com/dashboard" // optional: click target
    }
  };

  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});
