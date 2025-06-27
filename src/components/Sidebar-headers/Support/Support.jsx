import React from "react";
import HomePage from "../../Home/HomePage.jsx";
import Card from "./Card";
import "./Support.css";

export default function Support() {
  const developers = [
    {
      id: 1,
      name: "Nkeng Kundu Asong Frank",
      role: "Scrum Master",
      role2: "Fullstack Developer",
      url: "nkeng.jpg",
      description:
        "Passionate about building intuitive and responsive user interfaces with React. Love developing ground-breaking solutions in Python and Node.js.",
    },
    {
      id: 2,
      name: "Nindjio Abraham",
      role: "System Architect",
      role2: "Fullstack Developer",
      url: "wakanda.jpg",
      description:
        "Expert in full stack architecture, integrating frontend and backend systems seamlessly. Proficient in React, Node.js, and Python.",
    },
    {
      id: 3,
      name: "Ebimbe Ekongolo Frederic Frantz",
      role: "Frontend Developer",
      role2: "Product Owner",
      url: "ebimbe.jpg",
      description:
        "Designs delightful user experiences and ensures visual consistency across the platform.",
    },
    {
      id: 4,
      name: "Teko Blaise Atim",
      role: "Backend Developer",
      role2: "REST API Manager",
      url: "bless.jpg",
      description:
        "Loves optimizing APIs and managing server-side logic for scalable applications.",
    },
    {
      id: 5,
      name: "Noumbissi Yamdjeuson Stanley Derek",
      role: "Frontend Developer",
      role2: "Mobile Developer",
      url: "derek.jpg",
      description:
        "Focuses on responsive design and native app development for all platforms.",
    },
    {
      id: 6,
      name: "Bayiha Hesed Charis",
      role: "Low-Level Engineer",
      role2: "QA Specialist",
      url: "charis.jpg",
      description:
        "Ensures every feature is tested, verified, and bug-free before release.",
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
              role2={dev.role2}
              image={dev.url}
              description={dev.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
