import "../../../styles/style.min.css";
import "./profile.css";
import { useNavigate } from 'react-router-dom';
import MainTop from '../Navbar/MainTop';
import ProfileImage from "../../../assets/profile-img.webp";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <main className="main-content">
      {/* Top row of overview and profile image */}
      <MainTop title="Profile" />

      {/* Tabs will be activated soon in the future section */}
      <div className="action-container">
        <div className="action-left">
          <p>Profile Details</p>
        </div>
        <div className="action-right">
          <button className="button" onClick={() => navigate(-1)}>
            ← &nbsp;&nbsp;&nbsp;Back
          </button>
        </div>
      </div>

      <div className="profile-rider-container">
        <div className="profile-rider-image">
          <img src={ProfileImage} alt="Rider" />
        </div>

        <div className="profile-rider-heading">
          <h2>Saksham Pandey</h2>
        </div>

        <div className="profile-rider-info">
          <div className="profile-info-box">Rider ID: <strong>12345</strong> </div>
          <div className="profile-info-box">Mobile: <strong>9876543210</strong></div>
          <div className="profile-info-box">City: <strong>New York</strong></div>
          <div className="profile-info-box">Status: <strong>Active</strong></div>
        </div>

        <div className="profile-rider-actions">
          <button className="profile-action-btn1">
            <FaMoneyBillWave className="profile-btn-icon" /> Add COD Payment
          </button>
          <button className="profile-action-btn2">
            <FaEdit className="profile-btn-icon" /> Edit Details
          </button>
        </div>

        <div className="profile-rider-cards">
          <div className="profile-card profile-card1"><span>Actual Cash</span><h2>744894</h2></div>
          <div className="profile-card profile-card2"><span>Received Cash</span><h2>84294</h2></div>
          <div className="profile-card profile-card3"><span>Balance Cash</span><h2>69794</h2></div>
          <div className="profile-card profile-card4"><span>Acceptance Rate</span><h2>78.4%</h2></div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
