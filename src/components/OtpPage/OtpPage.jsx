import { useState } from "react";
import "../AuthPages/AuthPages.css"; // Reuse existing styles
import { useLocation, useNavigate } from "react-router-dom";
import * as API from "../../api";
import { KVUSR } from "../../kv";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [processing, setProcessing] = useState(false)
  const [wrongOTP, setWrongOTP] = useState(false)
  const navigate = useNavigate();

  const location = useLocation()
  const {connection} = location.state || {}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp);
    setProcessing(true);
    setWrongOTP(false);
    const params = {...connection};
    params.code = otp;
    API.IAM.verify(params)
    .then( user => {
      KVUSR.setUser(user.toObject())
      API.setAuth(user.token)
      navigate("/marketboard")
    })
    .catch(err => {
      if(err.message === 'WrongOTP') setWrongOTP(true)
    })
  .finally(() => setProcessing(false))
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-grid">
            <div className="auth-form-section">
              <div className="auth-form-container">
                <div className="auth-header-text">
                  <h1 className="auth-title">Enter OTP</h1>
                  <p className="auth-subtitle">
                    Please enter the OTP sent to your email to verify your
                    identity.
                  </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="otp" className="form-label">
                      OTP Code
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      className="form-input"
                      placeholder="6-digit code"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  { wrongOTP && <p style={{color: "red"}}>WrongOTP</p> }
                  <button type="submit" className="auth-button">
                    { processing ? "Processing..." : "Confirm OTP" }
                  </button>
                </form>

                <div className="auth-switch">
                  Didn’t receive the code?{" "}
                  <a href="#" className="switch-link">
                    Resend
                  </a>
                </div>
              </div>
            </div>

            <div className="auth-illustration">
              <div className="illustration-bg">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
              </div>
              <div className="illustration-content">
                <h2 className="illustration-title">Secure Verification</h2>
                <p className="illustration-text">
                  We’ve sent a one-time password to your email. Please verify to
                  continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
