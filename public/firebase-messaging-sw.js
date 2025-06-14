importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCHxauU6UEJJLOlbljyI9tEPJEWOOAu8aI",
  authDomain: "pushnotifications-b2b51.firebaseapp.com",
  projectId: "pushnotifications-b2b51",
  storageBucket: "pushnotifications-b2b51.firebasestorage.app",
  messagingSenderId: "733666808831",
  appId: "1:733666808831:web:654910659bfdb73175cdca",
  measurementId: "G-YW4XVFYMNX"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  const title = payload.notification?.title || "New Notification";
  const body = payload.notification?.body || "You have a new message.";
  const notificationOptions = {
    body,
    icon: "/logo.png",
  };
  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://upskill-admin-panel.onrender.com/enquiries')
  );
});
