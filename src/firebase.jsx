import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDW05Js1HelvkEDDDEMn6osOXhFeSQvEZc",
    authDomain: "admindashboardnotification.firebaseapp.com",
    projectId: "admindashboardnotification",
    storageBucket: "admindashboardnotification.firebasestorage.app",
    messagingSenderId: "181121028054",
    appId: "1:181121028054:web:5eafad2baca63eb38c1e77"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
