// NotificationComponent.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5400'); // Ensure this matches your server address

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications from the server
    socket.on('notification', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('notification');
    };
  }, []);

  const sendNotification = () => {
    const message = 'Hello from React!';
    socket.emit('sendNotification', message);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default NotificationComponent;
