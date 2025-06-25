import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingpage/Landingpage";
import AuthPages from "./components/AuthPages/AuthPages";
import MarketPlace from "./components/Sidebar-headers/MarketPlace/MarketPlace";
import Notification from "./components/Sidebar-headers/Notification/Notification";
import Profile from "./components/Sidebar-headers/Profile/Profile";
import Support from "./components/Sidebar-headers/Support/Support";
import Tutorial from "./components/Sidebar-headers/Tutorials/Tutorial";
import OtpPage from "./components/OtpPage/OtpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketboard" element={<MarketPlace />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/tutorials" element={<Tutorial />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
