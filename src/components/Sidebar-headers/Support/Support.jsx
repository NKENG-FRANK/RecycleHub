import React from "react";
import HomePage from "../../Home/HomePage.jsx";
import Card from "./Card";
import "./Support.css";

export default function Support() {
  const developers = [
    {
      id: 1,
      name: "EBIMBE EKONGOLO",
      role: "Frontend Developer",
      url: "1.png",
      description:
        "Passionate about building intuitive and responsive user interfaces with React.",
    },
    {
      id: 2,
      name: "Nindjio Abraham",
      role: "Fullstack Developer",
      url: "2.png",
      description:
        "Expert in full stack architecture, integrating frontend and backend systems seamlessly.",
    },
    {
      id: 3,
      name: "Mbele Tim",
      role: "Backend Developer",
      url: "3.png",
      description:
        "Loves optimizing APIs and managing server-side logic for scalable applications.",
    },
    {
      id: 4,
      name: "Clarisse N.",
      role: "UI/UX Designer",
      url: "4.png",
      description:
        "Designs delightful user experiences and ensures visual consistency across the platform.",
    },
    {
      id: 5,
      name: "Jean K.",
      role: "Mobile Developer",
      url: "5.png",
      description:
        "Focuses on mobile responsiveness and native app development for all platforms.",
    },
    {
      id: 6,
      name: "Awa Diallo",
      role: "QA Engineer",
      url: "6.png",
      description:
        "Ensures that every feature is tested, verified, and bug-free before release.",
    },
  ];

  return (
    <div className="support-wrapper">
      <HomePage />
      <main className="support-main">
        <h1>📣 Meet the Recycle Hub Dev Team</h1>
        <p className="support-intro">
          Welcome to the Support page. Our team is dedicated to delivering a
          clean, scalable, and user-friendly recycling platform. Whether you're
          a user, vendor, or curious visitor, know that behind this product is a
          diverse team of developers and designers committed to sustainability
          and technology.
        </p>

        <div className="card-row">
          {developers.map((dev) => (
            <Card
              key={dev.id}
              name={dev.name}
              role={dev.role}
              image={dev.url}
              description={dev.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
