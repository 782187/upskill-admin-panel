importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCP7Tbb66rUgfyvA50sqVPbObAw_A-Yezo",
  authDomain: "myprojectnotifications-8916d.firebaseapp.com",
  projectId: "myprojectnotifications-8916d",
  storageBucket: "myprojectnotifications-8916d.firebaseapp.com",
  messagingSenderId: "491410102542",
  appId: "1:491410102542:web:7517f5ca45cba13fc71f5f",
  measurementId: "G-DTX2C6PLV0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
