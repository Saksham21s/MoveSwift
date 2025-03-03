import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import profilePic from "../../../assets/admin-profile.jpg";

const MainTop = ({ title }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Saksham Pandey",
    profileImage: profilePic,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="overview-container">
      <div className="page-overview">
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="main-top-profile">
        <span className="name">{user.name}</span>
        <div className="img-container" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
          <img src={user.profileImage} alt="Profile" className="rounded-img" />
        </div>
      </div>
    </div>
  );
};

MainTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MainTop;
