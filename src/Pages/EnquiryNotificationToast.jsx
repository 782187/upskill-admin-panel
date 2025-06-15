import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnquiryNotificationToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('wss://upskill-server.onrender.com/enquiry');
    socket.onopen = () => {
      console.log('WebSocket connected ✅');
    };

    socket.onmessage = (event) => {
      console.log('WebSocket message:', event.data);
      setMessage(event.data);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error ❌', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected ❌');
    };

    return () => socket.close();
  }, []);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div
        className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : 'hide'}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            {message || '🔔 New enquiry received!'}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryNotificationToast;