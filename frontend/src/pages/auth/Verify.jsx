import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const  {btnLoading , verifyOtp} = UserData();
  const navigate = useNavigate();

const handleVerify = async (e) => {
    e.preventDefault();
    verifyOtp(Number(otp),navigate)
    
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
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading? "pls wait": "Verify"}
          </button>
        </form>
        <p>
          Go back to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};



export default Verify