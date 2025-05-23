importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCP7Tbb66rUgfyvA50sqVPbObAw_A-Yezo",
  authDomain: "myprojectnotifications-8916d.firebaseapp.com",
  projectId: "myprojectnotifications-8916d",
  storageBucket: "myprojectnotifications-8916d.appspot.com", 
  messagingSenderId: "491410102542",
  appId: "1:491410102542:web:7517f5ca45cba13fc71f5f",
  measurementId: "G-DTX2C6PLV0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: '/logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});