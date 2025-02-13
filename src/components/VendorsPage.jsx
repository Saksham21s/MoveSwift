import '../styles/style.scss';
import profilePic from '../assets/profile-img.webp';
import aeroplane from '../assets/aeroplane.png';


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
    <div id="img-aeroplane"> <img src={aeroplane} alt="Aeroplane Image"/></div>
    <div className="text">This Tab Will be activated soon in future</div>
    <div className="go-overview">Go to overview sectoin</div>
  </div>
    </main>
  );
};

export default OverviewPage;
