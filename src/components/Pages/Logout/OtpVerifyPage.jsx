import "./logout.css";
import { useState, useRef } from "react";
import logo from "../../../assets/fullship-logo.png";
import { useNavigate } from "react-router-dom";

const OtpVerifyPage = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [otpMessage, setOtpMessage] = useState("");
    const inputRefs = useRef([]);
    const submitButtonRef = useRef(null);
    const navigate = useNavigate();

    const handleSendOtp = () => {
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        sessionStorage.setItem("otp", otpCode);
        setGeneratedOtp(otpCode);
        setIsOtpSent(true);
        setOtpMessage(`Your OTP is: ${otpCode}`);
        setErrorMessage("");
        setTimeout(() => setOtpMessage(""), 5000);
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "Enter" && otp.every((digit) => digit !== "")) {
            submitButtonRef.current?.click();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.join("") === generatedOtp) {
            navigate("/");
        } else {
            setErrorMessage("Incorrect OTP. Please try again.");
            setOtpMessage("");
        }
    };

    const handleCloseError = () => {
        setErrorMessage("");
        setOtp(["", "", "", ""]);
        sessionStorage.removeItem("otp");
    };

    const handleCloseOtpMessage = () => {
        setOtpMessage("");
    };

    const handleEmailOtpClick = () => {
        setOtpMessage("This functionality will be added soon");
    };

    return (
        <div className="login-container-otp">
            <div className="login-container-form-otp">
                {errorMessage && (
                    <div className="error-message">
                        <span>{errorMessage}</span>
                        <button className="close-error" onClick={handleCloseError}>&times;</button>
                    </div>
                )}
                {otpMessage && (
                    <div className="otp-message">
                        <span>{otpMessage}</span>
                        <button className="close-error" onClick={handleCloseOtpMessage}>&times;</button>
                    </div>
                )}
                <img src={logo} alt="Logo" className="login-image" />
                <div className="form-otp">
                    <h2>OTP Verification</h2>
                    {!isOtpSent ? (
                        <button className="submit-button-otp" onClick={handleSendOtp}>
                            Send OTP
                        </button>
                    ) : (
                        <>
                            <div className="para-div">
                                Enter the 4-digit verification code sent to <span>87XXXXXX04</span>
                            </div>
                            <div className="otp-inputs">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="password" 
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        maxLength="1"
                                        className="otp-input"
                                        placeholder="-"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="submit-button-otp"
                                onClick={handleSubmit}
                                ref={submitButtonRef}
                            >
                                Verify OTP
                            </button>
                        </>
                    )}
                </div>
                <div className="email-otp">
                    <div className="alert-icon-container">
                        <div className="triangle-icon"><span>!</span></div>
                    </div>
                    <div className="otp-text-container">
                        <p>Having trouble receiving OTP on mobile? No worries, get the OTP on your registered email address.</p>
                    </div>
                    <div className="button-container">
                        <button onClick={handleEmailOtpClick} className="submit-button-email">
                            Send me OTP on <br /> <strong style={{ color: "black", fontWeight: 500 }}>usxxxxxxxxx123@gxxxl.com</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerifyPage;
