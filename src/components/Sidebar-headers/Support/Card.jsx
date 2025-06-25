import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="profile-photo-wrapper">
          <div className="profile-photo">photo</div>
        </div>
      </div>
      <div className="card-content">
        <h2 className="name">EBIMBE EKONGOLO</h2>
        <p className="title">Front-end Developer</p>
        <p className="description">Am a developer am doing my best.aaaaaaaaaaaaaaaaaaaaaaaa</p>
        <button className="contact-button">Contact Me</button>
      </div>
    </div>
  );
};

export default Card;