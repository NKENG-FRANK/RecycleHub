import React from "react";
import "./DashBoard.css";
import Logo from "../../../assets/logo.png"; // Ensure the path is valid

export default function DashBoard() {
  return (
    <div className="dashboard-container">
      <main className="main-dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <img
            src={Logo}
            alt="Dashboard Logo"
            className="widget-btn"
            height={100}
          />
        </header>

        <div className="dashboard-widgets">
          <div className="widget-box">
            <h3>Total Waste Collected</h3>
            <p className="metric">1,200 kg</p>
          </div>
          <div className="widget-box">
            <h3>Total Waste Sold</h3>
            <p className="metric">850 kg</p>
          </div>
          <div className="widget-box">
            <h3>Total Waste Bought</h3>
            <p className="metric">450 kg</p>
          </div>
        </div>

        <div className="history-section">
          <h2>🕒 Waste History</h2>
          <ul>
            <li>May 15 - Sold 100kg of Plastic</li>
            <li>May 10 - Bought 50kg of Paper</li>
            <li>May 05 - Sold 200kg of Metal</li>
          </ul>
        </div>

        <div className="dashboard-metrics">
          <div className="metric-card">
            <h3>Waste Share</h3>
            <canvas id="wasteShareChart"></canvas>
          </div>
          <div className="metric-card">
            <h3>Monthly Activity</h3>
            <canvas id="activityChart"></canvas>
          </div>
        </div>

        <div className="dashboard-insights">
          <div className="insight-box dark">
            <h3>Eco Score</h3>
            <p className="metric">76.2</p>
            <p>Impact of your recycling efforts</p>
          </div>
          <div className="insight-box">
            <h3>Local Water Status</h3>
            <p className="metric">57m</p>
            <p>Water levels in your region</p>
          </div>
          <div className="insight-box green">
            <h3>Join Our Eco Community</h3>
            <p>Connect - Share - Inspire</p>
            <p className="followers">230k+ members</p>
          </div>
        </div>
      </main>
    </div>
  );
}
