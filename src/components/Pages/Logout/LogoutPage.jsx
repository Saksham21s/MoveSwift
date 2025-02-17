import "./logout.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/fullship-logo.png";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();  // Prevents page reload
    navigate("/forgot-password");  // Navigate to Forgot Password page
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-form">
        <img src={logo} alt="Login" className="login-image" />
        <div className="form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}

          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
            <button
              type="button"
              className="eye-button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Replaced anchor tag with button */}
          <button 
            type="button" 
            className="forgot-password" 
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
