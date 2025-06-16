import React from "react";
import {
  Search,
  Bell,
  Moon,
  MoreVertical,
  MessageCircle,
  Send,
} from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="search-bar-wrapper">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>
        </header>

        {/* Title & Date */}
        <div className="dashboard-header-title">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-date">📅 Wednesday, 24.03.2021</div>
        </div>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="events-list">
            <h3>WASTE HISTORY </h3>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>

          <div className="events-list">
            <h3>WASTE HISTORY </h3>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>

          <div className="events-list">
            <h3>WASTE HISTORY </h3>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>

          <div className="events-list">
            <h3>WASTE HISTORY </h3>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>
        </section>

        {/* Events & Patients */}
        <section className="events-patients">
          <div className="events-list">
            <h3>WASTE HISTORY </h3>
            <div className="event-item"></div>
            <div className="event-item"></div>
          </div>

          <div className="patients-list">
            <h3></h3>
            <div className="patient-item"></div>
            <div className="patient-item"></div>
            <div className="patient-item"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
