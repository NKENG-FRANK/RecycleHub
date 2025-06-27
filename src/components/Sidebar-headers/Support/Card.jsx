import React from "react";
import "./Card.css";

export default function Card({ name, role, role2, image, description }) {
  return (
    <div className="dev-card">
      <img src={`/images/${image}`} alt={name} className="dev-image" />
      <div className="dev-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        {role2 && <p className="role secondary">{role2}</p>}
        <p className="description">{description}</p>
      </div>
    </div>
  );
}
