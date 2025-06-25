import React, { useEffect, useState } from "react";
import HomePage from "../../Home/HomePage";
import "./Notification.css";

const mockFetchNotifications = () => {
  return Promise.resolve([
    {
      id: 1,
      date: new Date().toISOString(),
      message: "You sold 75kg of Plastic to GreenRecyclers.",
      type: "success",
      read: false,
      pinned: false,
    },
    {
      id: 2,
      date: new Date().toISOString(),
      message: "Reminder: Complete your profile.",
      type: "warning",
      read: false,
      pinned: false,
    },
    {
      id: 3,
      date: new Date().toISOString(),
      message: "New recycling tips available in Tutorials.",
      type: "info",
      read: false,
      pinned: false,
    },
  ]);
};

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toasts, setToasts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audio = new Audio("/ding.mp3");

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      mockFetchNotifications().then((data) => {
        setNotifications(data);
        localStorage.setItem("notifications", JSON.stringify(data));
        showToast("Fetched new notifications");
        if (soundEnabled) audio.play();
      });
    }
  }, []);

  const saveAndSet = (data) => {
    setNotifications(data);
    localStorage.setItem("notifications", JSON.stringify(data));
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
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
    showToast("Notification dismissed");
  };

  const togglePin = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    );
    saveAndSet(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveAndSet(updated);
    showToast("All marked as read");
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      saveAndSet([]);
      showToast("All notifications cleared");
    }
  };

  const filtered = notifications
    .filter((n) => n.message.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  return (
    <div className="notification-wrapper">
      <HomePage />

      <main className="notification-content">
        <header className="notification-header">
          <h1>🔔 Notifications</h1>
          <div className="notification-actions">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={markAllAsRead}>Mark All Read</button>
            <button onClick={clearAll}>Clear All</button>
            <label>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
              Sound
            </label>
          </div>
        </header>

        <section className="notification-grid">
          {filtered.length === 0 && (
            <p className="notification-empty">No notifications found.</p>
          )}

          {filtered.map((note) => (
            <div
              key={note.id}
              className={`notification-card ${note.type} ${
                note.read ? "read" : "unread"
              }`}
            >
              <div className="notification-icon">
                {note.type === "success" && "✅"}
                {note.type === "warning" && "⚠️"}
                {note.type === "info" && "ℹ️"}
              </div>

              <div className="notification-body">
                <div className="notification-date">{formatDate(note.date)}</div>
                <div className="notification-message">{note.message}</div>
              </div>

              <div className="notification-controls">
                <button onClick={() => toggleRead(note.id)}>
                  {note.read ? "Unread" : "Read"}
                </button>
                <button onClick={() => togglePin(note.id)}>
                  {note.pinned ? "Unpin" : "Pin"}
                </button>
                <button onClick={() => dismiss(note.id)}>✖</button>
              </div>
            </div>
          ))}
        </section>

        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className="toast">
              {t.message}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
