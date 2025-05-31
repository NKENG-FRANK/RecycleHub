import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage/Landingpage";
import HomePage from "./components/Home/HomePage";
import AuthPages from "./components/AuthPages/AuthPages";
import DashBoard from "./components/Sidebar-headers/DashBoard/DashBoard";
import MarketPlace from "./components/Sidebar-headers/MarketPlace/MarketPlace";
import Notification from "./components/Sidebar-headers/Notification/Notification";
import Profile from "./components/Sidebar-headers/Profile/Profile";
import Support from "./components/Sidebar-headers/Support/Support";
import Tutorial from "./components/Sidebar-headers/Tutorials/Tutorial";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/marketboard" element={<MarketPlace />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/tutorials" element={<Tutorial />} />
      </Routes>
    </Router>
  );
}

export default App;
