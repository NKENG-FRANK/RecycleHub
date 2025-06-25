import React from "react";
import "./Card.css";

export default function Card({ name, role, image, description }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-img" />
      <div className="card-body">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}
