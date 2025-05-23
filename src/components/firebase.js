import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCHxauU6UEJJLOlbljyI9tEPJEWOOAu8aI",
  authDomain: "pushnotifications-b2b51.firebaseapp.com",
  projectId: "pushnotifications-b2b51",
  storageBucket: "pushnotifications-b2b51.appspot.com", // ✅ Corrected
  messagingSenderId: "733666808831",
  appId: "1:733666808831:web:654910659bfdb73175cdca",
  measurementId: "G-YW4XVFYMNX"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
