import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import profilePic from '../../../assets/profile-img.webp';

const MainTop = ({ title }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');  
    };

    return (
        <div className="overview-container">
            <div className="page-overview">
                <h1 className="page-title">{title}</h1>
            </div>
            <div className="main-top-profile">
                <span className="name">Saksham Pandey</span>
                <div className="img-container" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                    <img src={profilePic} alt="Profile Image" className="rounded-img" />
                </div>
            </div>
        </div>
    );
};

// ✅ Define PropTypes
MainTop.propTypes = {
    title: PropTypes.string.isRequired, 
};

export default MainTop;
