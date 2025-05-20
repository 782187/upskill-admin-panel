importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDW05Js1HelvkEDDDEMn6osOXhFeSQvEZc",
    authDomain: "admindashboardnotification.firebaseapp.com",
    projectId: "admindashboardnotification",
    storageBucket: "admindashboardnotification.firebasestorage.app",
    messagingSenderId: "181121028054",
    appId: "1:181121028054:web:5eafad2baca63eb38c1e77"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/logo.png'
    });
});
