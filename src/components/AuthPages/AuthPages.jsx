import { useState } from "react";
import "./AuthPages.css";
import logo from "../../assets/logo.png";

export default function AuthPages({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    rememberMe: false,
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Handle login logic here
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-grid">
            <div className="auth-form-section">
              <div className="auth-form-container">
                <div className="auth-header-text">
                  <h1 className="auth-title">Welcome Back</h1>
                  <p className="auth-subtitle">
                    Sign in to continue your eco-friendly journey
                  </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-input"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">Remember me</span>
                    </label>
                    <a href="#" className="forgot-link">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                      />
                      <span className="checkbox-text">
                        I accept Terms & Conditions
                      </span>
                    </label>
                    <a href="#" className="forgot-link">
                      Read Terms and Conditions
                    </a>
                  </div>

                  <button type="submit" className="auth-button">
                    Sign In
                  </button>
                </form>
              </div>
            </div>

            <div className="auth-illustration">
              <div className="illustration-bg">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
              </div>
              <div className="illustration-content">
                <div className="recycle-visual">
                  <div className="recycle-bins">
                    <div className="mini-bin blue-mini"></div>
                    <div className="mini-bin green-mini"></div>
                  </div>
                  <div className="recycle-arrows">
                    <div className="arrow-circle">♻️</div>
                  </div>
                </div>
                <h2 className="illustration-title">Sustainable Future</h2>
                <p className="illustration-text">
                  Join our community in making the world a greener place through
                  responsible waste management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
