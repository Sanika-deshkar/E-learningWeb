import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const activationToken = location.state?.activationToken;

const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/verifyUser", { otp, activationToken });
      alert(res.data.message); 
      navigate("/login");       
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={handleVerify}>
          <label htmlFor="otp">OTP:</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="common-btn">Verify</button>
        </form>
        <p>
          Go back to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};



export default Verify