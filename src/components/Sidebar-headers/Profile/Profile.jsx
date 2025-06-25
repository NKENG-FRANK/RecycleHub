import React, { useState } from "react";
import "./Profile.css";
import HomePage from "../../Home/HomePage";

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
  };

  return (
    <div className="profile-wrapper">
      <HomePage />
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img
                src="https://i.pinimg.com/736x/6e/52/14/6e5214b1bd71d4ac8c4350301bea7593.jpg"
                alt="Avatar"
                className="avatar-image"
              />
              <div className="avatar-status" />
            </div>
            <div className="profile-info">
              <h2>
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="profile-location">{formData.location}</p>
            </div>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button className="save-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
