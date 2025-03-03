import "./logout.css";
import { useState } from "react";
import logo from "../../../assets/moveswift-logo.png";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (!mobileNumber) {
      formErrors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      formErrors.mobileNumber = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/otp-verify");
    }
  };

  return (
    <div className="forgot-container">
    <div className="forgot-container-form">
      <img src={logo} alt="Login" className="login-image" />
      <div className="forgot-form">
        <h2>Forgot Password</h2>
        <div className="forgot-para">
          Let us remind you. <br />
          Please enter your mobile number to reset your password.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="forgot-input-container">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          {errors.mobileNumber && (
            <div className="forgot-error">{errors.mobileNumber}</div>
          )}
          <div className="forgot-button-container">
            <button type="submit" className="submit-button">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>  
  );
};

export default ForgotPasswordPage;
