import React, { useEffect, useState } from "react";
import HomePage from "../../Home/HomePage";
import "./Notification.css";
import * as API from "../../../api";
import * as Entity from "../../../entity";
import { KVUSR } from "../../../kv";

// const mockFetchNotifications = () => {
//   return Promise.resolve([
//     {
//       id: 1,
//       date: new Date().toISOString(),
//       message: "You sold 75kg of Plastic to GreenRecyclers.",
//       type: "success",
//       read: false,
//       pinned: false,
//     },
//     {
//       id: 2,
//       date: new Date().toISOString(),
//       message: "Reminder: Complete your profile.",
//       type: "warning",
//       read: false,
//       pinned: false,
//     },
//     {
//       id: 3,
//       date: new Date().toISOString(),
//       message: "New recycling tips available in Tutorials.",
//       type: "info",
//       read: false,
//       pinned: false,
//     },
//   ]);
// };
const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

function NotificationCard({note = (new Entity.Notification).toObject(), onRead}) {
  function handleRead() {
    API.User.readNotification(note.id).then(onRead)
  }

  return (
    <div className={`notification-card ${note.read ? "read" : "unread"}`}>
      <div className="notification-icon">
        {note.type === Entity.NotificationTypes.PROPOSAL_ACCEPTED && "✅"}
        {note.type === Entity.NotificationTypes.REQUEST_ADDED && "✅"}
        {/* {note.type === "warning" && "⚠️"} */}
        {note.type === Entity.NotificationTypes.OTHER && "ℹ️"}
      </div>

      <div className="notification-body">
        <div className="notification-date">{formatDate(note.created)}</div>
        <div className="notification-message">{note.message}</div>
      </div>

      <div className="notification-controls">
        {note.read === null && <button onClick={handleRead}>
          Read
        </button>}
      </div>
    </div>
  )
}

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.User.fetchNotifications(KVUSR.getUser().id).then(setNotifications)
  }, []);

  function onRead(note = (new Entity.Notification).toObject()){
    setNotifications(notifications.map(n => n.id === note.id ? note : n ))
  };

  const markAllAsRead = () => {
    for(let note of notifications) {
      if(note.read === null) API.User.readNotification(note.id).then(onRead)
    }
  };

  return (
    <div className="notification-wrapper">
      <HomePage />

      <main className="notification-content">
        <header className="notification-header">
          <h1>🔔 Notifications</h1>
          <div className="notification-actions">
            <button onClick={markAllAsRead}>Mark All Read</button>
          </div>
        </header>

        <section className="notification-grid">
          {notifications.length === 0 && (
            <p className="notification-empty">No notifications found.</p>
          )}

          {notifications.map((note, index) => (<NotificationCard note={note} onRead={onRead} key={index}/>))}
        </section>
      </main>
    </div>
  );
}
