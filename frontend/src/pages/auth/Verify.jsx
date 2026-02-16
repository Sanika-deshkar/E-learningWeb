// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";
// const Verify = () => {
//   const [otp, setOtp] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const activationToken = location.state?.activationToken;



// const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/verifyUser", { otp, activationToken });
//       alert(res.data.message); 
//       navigate("/login");       
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };
//   return (
//     <div className="auth-page">
//       <div className="auth-form">
//         <h2>Verify Account</h2>
//         <form onSubmit={handleVerify}>
//           <label htmlFor="otp">OTP:</label>
//           <input
//             type="number"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           /> 
//           <button type="submit" className="common-btn">Verify</button>
//         </form>
//         <p>
//           Go back to <Link to="/login">Login</Link> page
//         </p>
//       </div>
//     </div>
//   );
// };



// export default Verify


import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Otp</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <ReCAPTCHA
            sitekey=" 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
          ,
          {show && (
            <button disabled={btnLoading} type="submit" className="common-btn">
              {btnLoading ? "Please Wait..." : "Verify"}
            </button>
          )}
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;