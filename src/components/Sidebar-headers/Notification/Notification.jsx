import React, { useEffect, useState } from 'react';
import './Notification.css';

const mockFetchNotifications = () => {
  return Promise.resolve([
    {
      id: 1,
      date: new Date().toISOString(),
      message: 'You sold 75kg of Plastic to GreenRecyclers.',
      type: 'success',
      read: false,
      pinned: false,
    },
    {
      id: 2,
      date: new Date().toISOString(),
      message: 'Reminder: Complete your profile.',
      type: 'warning',
      read: false,
      pinned: false,
    },
    {
      id: 3,
      date: new Date().toISOString(),
      message: 'New recycling tips available in Tutorials.',
      type: 'info',
      read: false,
      pinned: false,
    },
  ]);
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audio = new Audio('/ding.mp3'); // optional sound file

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      mockFetchNotifications().then((data) => {
        setNotifications(data);
        localStorage.setItem('notifications', JSON.stringify(data));
        showToast('Fetched new notifications');
        if (soundEnabled) audio.play();
      });
    }
  }, []);

  const saveAndSet = (data) => {
    setNotifications(data);
    localStorage.setItem('notifications', JSON.stringify(data));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveAndSet(updated);
    showToast('All notifications marked as read');
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      saveAndSet([]);
      showToast('All notifications cleared');
    }
  };

  const toggleRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    saveAndSet(updated);
  };

  const dismiss = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveAndSet(updated);
    showToast('Notification dismissed');
  };

  const togglePin = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    saveAndSet(updated);
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  const filtered = notifications
    .filter((n) =>
      n.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  return (
    <div className="notif-page">
      <h2 className="notif-title">🔔 Notifications</h2>

      <div className="notif-controls">
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={markAllAsRead}>Mark all as read</button>
        <button onClick={clearAll}>Clear all</button>
        <label>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          Sound
        </label>
      </div>

      <div className="notif-list">
        {filtered.length === 0 && (
          <div className="notif-empty">No notifications found.</div>
        )}
        {filtered.map((note) => (
          <div
            key={note.id}
            className={`notif-card ${note.type} ${
              note.read ? 'read' : 'unread'
            }`}
          >
            <div className="notif-pin" onClick={() => togglePin(note.id)}>
              📌 {note.pinned ? 'Unpin' : 'Pin'}
            </div>
            <div className="notif-date">{formatDate(note.date)}</div>
            <div className="notif-message">{note.message}</div>
            <div className="notif-buttons">
              <button onClick={() => toggleRead(note.id)}>
                {note.read ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button onClick={() => dismiss(note.id)}>Dismiss ✖</button>
            </div>
          </div>
        ))}
      </div>

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
