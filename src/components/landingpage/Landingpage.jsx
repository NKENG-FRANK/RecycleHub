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
      {/* Main Content */}
      <main className="main">
        <div className="container">
          <div className="hero">
            {/* Hero Content */}
            <div
              className={`hero-content ${
                isVisible ? "animate-slide-in-left" : ""
              }`}
            >
              <h1 className="hero-title">
                WASTE
                <br />
                RECYCLE
              </h1>
              <p className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="btns">
                <button className="read-more-btn">Read More</button>

                <button className="start-btn" onClick={() => navigate("/auth")}>
                  Get Started
                </button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div
              className={`hero-illustration ${
                isVisible ? "animate-slide-in-right" : ""
              }`}
            >
              {/* Background Shapes */}
              <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
              </div>

              {/* Main Illustration */}
              <div className="illustration-container">
                {/* Recycling Bins */}
                <div className="bins">
                  {/* Blue Bin */}
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

                  {/* Green Bin */}
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

                {/* Stylized Workers */}
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

              {/* Floating Elements */}
              <div className="floating-element float-1">
                <div className="float-circle green-float"></div>
              </div>
              <div className="floating-element float-2">
                <div className="float-circle blue-float"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
