import "../../../styles/style.min.css";
import profilePic from '../../../assets/profile-img.webp';


const SettingsPage = () => {
 return (
     <main className="main-content">
       {/* Top row of overview and profile image */}
       <div className="overview-container">
     <div className="page-overview">
       <h1 className="page-title">Settings</h1>
     </div>
     <div className="main-top-profile">
       <span className="name">Saksham Pandey</span>
       <div className="img-container">
         <img src={profilePic} alt="Profile Image" className="rounded-img" />
       </div>
     </div>
   </div>
     </main>
  );
};

export default SettingsPage;
