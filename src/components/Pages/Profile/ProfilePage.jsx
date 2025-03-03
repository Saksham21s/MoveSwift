import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainTop from "../Navbar/MainTop";
import ConfirmationDialog from "../Riders/ConfirmationDialog";
import "../../../styles/style.min.css";
import "./profile.css";
import ProfileImageDefault from "../../../assets/admin-profile.jpg";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser || {
      name: "Saksham Pandey",
      profileImage: ProfileImageDefault,
      mobile: "9876543210",
      city: "New York",
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newMobile, setNewMobile] = useState(user.mobile);
  const [newCity, setNewCity] = useState(user.city);
  const [newImage, setNewImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setNewName(user.name);
    setNewMobile(user.mobile);
    setNewCity(user.city);
  }, [user]);

  const handleEditClick = () => setShowDialog(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      name: newName,
      mobile: newMobile,
      city: newCity,
      profileImage: newImage || user.profileImage,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <main className="main-content">
      <MainTop title="Profile" />
      <div className="action-container">
        <div className="action-left"><p>Profile Details</p></div>
        <div className="action-right">
          <button className="button" onClick={() => navigate(-1)}>← &nbsp;&nbsp;&nbsp;Back</button>
        </div>
      </div>

      <div className="profile-rider-container">
        <div className="profile-rider-image"><img src={user.profileImage} alt="Rider" /></div>
        <div className="profile-rider-heading"><h2>{user.name}</h2></div>

        <div className="profile-rider-info">
          {[`Rider ID: 12345`, `Mobile: ${user.mobile}`, `City: ${user.city}`, `Status: Active`].map((info, index) => (
            <div className="profile-info-box" key={index}><strong>{info}</strong></div>
          ))}
        </div>

        <div className="profile-rider-actions">
          <button className="profile-action-btn1">
            <FaMoneyBillWave className="profile-btn-icon" /> Add COD Payment
          </button>
          <button className="profile-action-btn2" onClick={handleEditClick}>
            <FaEdit className="profile-btn-icon" /> Edit Details
          </button>
        </div>

        <div className="profile-rider-cards">
          {[{ label: "Actual Cash", value: 744894 },
            { label: "Received Cash", value: 84294 },
            { label: "Balance Cash", value: 69794 },
            { label: "Acceptance Rate", value: "78.4%" }
          ].map((card, index) => (
            <div className={`profile-card profile-card${index + 1}`} key={index}>
              <span>{card.label}</span>
              <h2>{card.value}</h2>
            </div>
          ))}
        </div>
      </div>

      {showDialog && (
        <ConfirmationDialog
          actionType="edit"
          title="Edit Profile Details"
          message="Do you want to proceed with editing your profile?"
          onConfirm={() => {
            setIsEditing(true);
            setShowDialog(false);
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}

      {isEditing && (
        <div className="edit-profile-popup">
          <div className="edit-profile-container">
            <button className="close-button" onClick={() => setIsEditing(false)}>×</button>
            <h3 className="edit-profile-heading">Edit Profile</h3>
            <p className="edit-profile-paragraph">Update your profile details below.</p>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" />
            <input type="text" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} placeholder="Enter new mobile number" />
            <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Enter new city" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="edit-profile-buttons">
              <button className="button confirm" onClick={handleSaveChanges}>Save Changes</button>
              <button className="button cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;