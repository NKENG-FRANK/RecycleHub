import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "Sara",
    lastName: "Tancredi",
    email: "Sara.Tancredi@gmail.com",
    phone: "(+98) 9123728167",
    location: "New York, USA",
    postalCode: "23728167",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
    // Add your save logic here
  };

  return (
    <div className="profile-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://i.pinimg.com/736x/6e/52/14/6e5214b1bd71d4ac8c4350301bea7593.jpg"
              alt="Profile Avatar"
              className="avatar-image"
            />
            <div className="avatar-status"></div>
          </div>
          <div className="profile-info">
            <h2>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="profile-location">{formData.location}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g. New York, USA"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
