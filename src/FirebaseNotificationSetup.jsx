import React, { useEffect } from 'react';
import { messaging, getToken, onMessage } from './firebase';

const FirebaseNotificationSetup = () => {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: "BAlbnor3-IW0gTF1SIa9xMEE7gwG_BRwoOoXK5ue3pvFkgZEX6rTTXEuePmUTw4Tjofdb8X9pnxvJQ8koppPfeQ"
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);

              fetch("https://upskill-server.onrender.com/subscribe-token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: currentToken })
              })
                .then(res => res.json())
                .then(data => console.log("Subscription response:", data))
                .catch(err => console.error("Error subscribing to topic:", err));
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      }
    });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      alert(payload.notification.title + "\n" + payload.notification.body);
    });
  }, []);

  return null;
};

export default FirebaseNotificationSetup;
