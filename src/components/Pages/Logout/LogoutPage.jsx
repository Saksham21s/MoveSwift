import "./logout.css";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/fullship-logo.png";
import profilePic from "../../../assets/profile-img.webp";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userExists = sessionStorage.getItem("user");
    if (!userExists) {
      setShowAlert(true);
    }
  }, []);

  const handleCloseAlert = () => setShowAlert(false);

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
      let storedUser = JSON.parse(sessionStorage.getItem("user"));
  
      if (!storedUser) {
        storedUser = { mobileNumber, password, name: "User", profileImage: profilePic };
        sessionStorage.setItem("user", JSON.stringify(storedUser));
      }
  
      if (storedUser.mobileNumber === mobileNumber && storedUser.password === password) {
        sessionStorage.setItem("user", JSON.stringify(storedUser)); // ✅ Ensure session is set before redirecting
        navigate("/");
        window.location.reload(); // 🔥 Force reload to apply state properly
      } else {
        setErrors({ mobileNumber: "Invalid mobile number or password" });
      }
    }
  };
  

  return (
    <div className="login-container">
      {showAlert && (
        <div className="otp-message">
          <span>Enter any number and password of your choice & remember it. This page uses session storage for login.</span>
          <button className="close-error" onClick={handleCloseAlert}>
            <IoClose />
          </button>
        </div>
      )}
      <div className="login-container-form">
        <img src={logo} alt="Login" className="login-image" />
        <div className="form">
          <h2>Login</h2>
          <input type="text" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
          <div className="password-input-container">
            <input type={passwordVisible ? "text" : "password"} placeholder="Password" className="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <div className="error">{errors.password}</div>}
            <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="button" className="forgot-password" onClick={handleForgotPasswordClick}>
            Forgot Password?
          </button>
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
