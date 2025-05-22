importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCP7Tbb66rUgfyvA50sqVPbObAw_A-Yezo",
  authDomain: "myprojectnotifications-8916d.firebaseapp.com",
  projectId: "myprojectnotifications-8916d",
  storageBucket: "myprojectnotifications-8916d.firebasestorage.app",
  messagingSenderId: "491410102542",
  appId: "1:491410102542:web:7517f5ca45cba13fc71f5f",
  measurementId: "G-DTX2C6PLV0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
