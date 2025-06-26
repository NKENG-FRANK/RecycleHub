import React, { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Reusable NavItem
const NavItem = ({ icon, label, onClick }) => (
  <div className="nav-item" onClick={onClick}>
    {icon}
    <span>{label}</span>
  </div>
);

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();

  return (
    <div className="homepage">
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="logo">♻️ RECYCLE ♻️</div>
        <nav className="nav-menu">
          <NavItem
            icon={<FaChartBar />}
            label="Market Place"
            onClick={() => navigate("/marketboard")}
          />
          <NavItem
            icon={<FaUsers />}
            label="Tutorials"
            onClick={() => navigate("/tutorials")}
          />
          <NavItem
            icon={<FaFileAlt />}
            label="Profile"
            onClick={() => navigate("/profile")}
          />
          <NavItem
            icon={<FaFileAlt />}
            label="Notification"
            onClick={() => navigate("/notification")}
          />
          <NavItem
            icon={<FaQuestionCircle />}
            label="About Us"
            onClick={() => navigate("/support")}
          />
        </nav>
        <nav className="nav-menu">
          <NavItem icon={<FaArrowRightLong />} label="Logout" />
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
