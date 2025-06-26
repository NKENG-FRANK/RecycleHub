import React, { useState } from "react";
import "./Profile.css";
import HomePage from "../../Home/HomePage";
import * as API from "../../../api";
import {KVUSR} from "../../../kv";

export default function Profile() {
  const user = KVUSR.getUser()
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    contact: user.contact,
    contact2: user.contact2
  });
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // console.log("Saving changes:", formData);
    setProcessing(true);
    API.User.update(formData)
    .then( (updated) => {
      KVUSR.setUser(updated.toObject())
    })
    .catch()
    .finally(() => setProcessing(false))
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
                {formData.name}
              </h2>
              {/* <p className="profile-location">{formData.location}</p> */}
            </div>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="form-group">
                <label>Full Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div> */}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Primary Contact (i.e Phone)</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Secondary Contact (i.e Email)</label>
                <input
                  type="email"
                  name="contact2"
                  value={formData.contact2}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className="form-row">
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
            </div> */}

            <button className="save-button" onClick={handleSaveChanges}>
              { processing ? "Processing..." : "Save Changes" }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
