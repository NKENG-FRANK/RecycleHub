import React, { useEffect, useState } from 'react';
import './Notification.css';

const mockFetchNotifications = () => {
  return Promise.resolve([
    {
      id: 1,
      date: 'June 3',
      message: 'You sold 75kg of Plastic to GreenRecyclers.',
      type: 'success'
    },
    {
      id: 2,
      date: 'June 1',
      message: 'New recycling tips available in Tutorials section.',
      type: 'info'
    },
    {
      id: 3,
      date: 'May 30',
      message: 'Reminder: Verify your contact details.',
      type: 'warning'
    }
  ]);
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('recyclehub_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      mockFetchNotifications().then(data => {
        setNotifications(data);
        localStorage.setItem('recyclehub_notifications', JSON.stringify(data));
        showToast('🔔 You have new notifications!');
      });
    }
  }, []);

  const dismissNotification = (id) => {
    const updated = notifications.filter(note => note.id !== id);
    setNotifications(updated);
    localStorage.setItem('recyclehub_notifications', JSON.stringify(updated));
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="notification-container">
      <h2 className="notification-title">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        notifications.map(note => (
          <div key={note.id} className={`note-card ${note.type}`}>
            <div className="note-header">
              <span className="note-date">{note.date}</span>
              <button onClick={() => dismissNotification(note.id)} className="dismiss-btn">×</button>
            </div>
            <p className="note-message">{note.message}</p>
          </div>
        ))
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default Notification;
