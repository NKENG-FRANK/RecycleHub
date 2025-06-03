import React, { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import "./HomePage.css";
import DashBoard from "../Sidebar-headers/DashBoard/DashBoard";
import MarketPlace from "../Sidebar-headers/MarketPlace/MarketPlace";
import Notification from "../Sidebar-headers/Notification/Notification";
import Profile from "../Sidebar-headers/Profile/Profile";
import Support from "../Sidebar-headers/Support/Support";
import Tutorial from "../Sidebar-headers/Tutorials/Tutorial";

export default function HomePage() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <div className="content-section">
            <DashBoard />
          </div>
        );
      case "Market Place":
        return (
          <div className="content-section">
            <MarketPlace />
          </div>
        );
      case "Tutorials":
        return (
          <div className="content-section">
            <Tutorial />
          </div>
        );
      case "Profile":
        return (
          <div className="content-section">
            <Profile />
          </div>
        );
      case "Natification":
        return (
          <div className="content-section">
            <Notification />
          </div>
        );
      case "Support":
        return (
          <div className="content-section">
            <Support />
          </div>
        );
      default:
        return (
          <div className="content-section">
            Select a section to view content.
          </div>
        );
    }
  };

  return (
    <div className="homepage">
      <div className="sidebar">
        <div className="logo">♻️RECYCLE-HUB♻️</div>
        <nav className="nav-menu">
          <NavItem
            icon={<FaHome />}
            label="Dashboard"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <NavItem
            icon={<FaChartBar />}
            label="Market Place"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <NavItem
            icon={<FaUsers />}
            label="Tutorials"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <NavItem
            icon={<FaFileAlt />}
            label="Profile"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <NavItem
            icon={<FaFileAlt />}
            label="Notification"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <NavItem
            icon={<FaQuestionCircle />}
            label="Support"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </nav>
      </div>

      {/* Right Side Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

const NavItem = ({ icon, label, activeItem, setActiveItem }) => (
  <div
    className={`nav-item ${activeItem === label ? "active" : ""}`}
    onClick={() => setActiveItem(label)}
  >
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
);
