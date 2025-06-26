import { useState, useEffect } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <main className="main">
        <div className="container">
          <div className="hero">
            <div
              className={`hero-content ${
                isVisible ? "animate-slide-in-left" : ""
              }`}
            >
              <h1 className="hero-title">
                Empowering Waste <br /> Recycling & Resale
              </h1>
              <p className="hero-description">
                Discover how to manage and recycle waste effectively through our
                interactive tutorials. Purchase high-quality waste materials in
                bulk for use as raw materials — perfect for startups and
                companies building a sustainable future.
              </p>
              <div className="btns">
                <button className="read-more-btn">Read More</button>

                <button className="start-btn" onClick={onGetStarted}>
                  Get Started
                </button>              
            </div>

            <div
              className={`hero-illustration ${
                isVisible ? "animate-slide-in-right" : ""
              }`}
            >
              <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
              </div>

              <div className="illustration-container">
                <div className="bins">
                  <div className="bin-container">
                    <div className="bin blue-bin">
                      <div className="recycle-icon">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="bin-wheels blue-wheels"></div>
                  </div>

                  <div className="bin-container">
                    <div className="bin green-bin">
                      <div className="recycle-icon">
                        <svg
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="bin-wheels green-wheels"></div>
                  </div>
                </div>

                <div className="worker worker-1">
                  <div className="worker-head"></div>
                  <div className="worker-body"></div>
                  <div className="worker-pants"></div>
                  <div className="worker-legs">
                    <div className="leg"></div>
                    <div className="leg"></div>
                  </div>
                  <div className="worker-cap"></div>
                </div>

                <div className="worker worker-2">
                  <div className="worker-head"></div>
                  <div className="worker-body"></div>
                  <div className="worker-pants"></div>
                  <div className="worker-legs">
                    <div className="leg"></div>
                    <div className="leg"></div>
                  </div>
                  <div className="worker-cap"></div>
                </div>
              </div>

              <div className="floating-element float-1">
                <div className="float-circle green-float"></div>
              </div>
              <div className="floating-element float-2">
                <div className="float-circle blue-float"></div>
              </div>
            </div>
          </div>
        </div>
        <section className="about-section">
          <div className="container about-container">
            <h2 className="about-title">Why Recycle Hub?</h2>
            <p className="about-description">
              Recycle Hub is a modern platform designed to bridge the gap
              between sustainable education and action. Whether you are an
              individual learning how to manage household waste or a company
              looking for raw materials to power your production, Recycle Hub
              empowers you to make an impact.
            </p>

            <div className="features">
              <div className="feature-card">
                <h3>📚 Learn to Recycle</h3>
                <p>
                  Access detailed tutorials, articles, and videos that teach
                  best practices for sorting, managing, and reducing waste — for
                  both households and communities.
                </p>
              </div>

              <div className="feature-card">
                <h3>🏭 Buy Waste in Bulk</h3>
                <p>
                  Startups and eco-conscious companies can source recyclable
                  materials in bulk at affordable rates, directly from local
                  waste contributors and partners.
                </p>
              </div>

              <div className="feature-card">
                <h3>🌍 Build a Greener Future</h3>
                <p>
                  Join a growing community working toward sustainability,
                  circular economy, and responsible production. Your actions
                  matter — and we provide the tools to support them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
