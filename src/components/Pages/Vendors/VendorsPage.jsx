import "../../../styles/style.min.css";
import profilePic from '../../../assets/profile-img.webp';
import aeroplane from '../../../assets/aeroplane.png';
import { Link } from 'react-router-dom';


const OverviewPage = () => {
  return (
    <main className="main-content">
      {/* Top row of overview and profile image */}
      <div className="overview-container">
        <div className="page-overview">
          <h1 className="page-title">Riders</h1>
        </div>
        <div className="main-top-profile">
          <span className="name">Saksham Pandey</span>
          <div className="img-container">
            <img src={profilePic} alt="Profile Image" className="rounded-img" />
          </div>
        </div>
      </div>

      {/* Tabs will be activated sooon in future section */}
      <div className="tabsoon">
        <div id="img-aeroplane"> <img src={aeroplane} alt="Aeroplane Image" /></div>
        <div className="text">This Tab Will be activated soon in future</div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="go-overview">Go to overview section</div>
        </Link>
      </div>
    </main>
  );
};

export default OverviewPage;
