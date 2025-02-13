import "../styles/style.min.css";
import profilePic from '../assets/profile-img.webp';
import chart from '../assets/charts.png'


const OverviewPage = () => {
 return (
    <main className="main-content">
    {/* Top row of overview and profile image */}
    <div className="overview-container">
  <div className="page-overview">
    <h1 className="page-title">Overview</h1>
  </div>
  <div className="main-top-profile">
    <span className="name">Saksham Pandey</span>
    <div className="img-container">
      <img src={profilePic} alt="Profile Image" className="rounded-img" />
    </div>
  </div>
</div>

    {/* Summary cards section */}
    <section className="summary-cards">
  <div className="row">
    <div className="card-item">
      <div className="card">
        <div className="card-body">Total Orders<span className="count">245</span></div>
      </div>
    </div>
    <div className="card-item">
      <div className="card" style={{ backgroundColor: 'rgba(221, 226, 255, 1)' }}>
        <div className="card-body">Active Orders<span className="count">76</span></div>
      </div>
    </div>
    <div className="card-item">
      <div className="card">
        <div className="card-body">Active Riders<span className="count">125</span></div>
      </div>
    </div>
    <div className="card-item">
      <div className="card">
        <div className="card-body">Vendors<span className="count">8</span></div>
      </div>
    </div>
  </div>
</section>


    {/* Cash status section */}
    <section className="cash-status">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">This weeks cash status</h2>
          <p>as of Oct 15, 2021, 10:15 AM</p>
          <div className="img-tp-txt">
            <span id="box-clr1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;Actual Cash&nbsp;&nbsp;</span>
            <span id="box-clr2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>&nbsp;&nbsp;Received Cash</span>
          </div>
          <div className="status-container">
            <div className="image-section">
              <img src={chart} alt="cash status image" className="status-image" />
            </div>
            <div className="cash-details">
              <div className="detail">Actual Cash <span>1,049,345</span></div>
              <div className="detail" style={{ borderTop: '0.5px solid gray' }}>Received Cash <span>687,468</span></div>
              <div className="detail" style={{ borderTop: '0.5px solid gray' }}>Balance Cash <span>361,877</span></div>
              <div className="detail" style={{ borderTop: '0.5px solid gray' }}>Balance Cash % <span>34.49%</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Top lists section */}
    <section className="top-lists">
  <div className="card">
    <div className="card-body">
      <h2 className="card-title">
        Top riders with acceptance rate
        <span style={{ paddingLeft: '60px' }}>
          <a href="javascript:void(0)">View All</a>
        </span>
      </h2>
      <ul className="list">
        <li>Bakr Ahmed Yousuf <span>98.56</span></li>
        <li>Fuad Ahmed Jatari <span>98.12</span></li>
        <li>Abdulqader All Yousuf <span>96.05</span></li>
        <li>Ruxzod Azad Najmadin <span>97.85</span></li>
        <li style={{ paddingBlockEnd: '0px' }}>Mohammed Shahab Ahmed <span>87.54</span></li>
      </ul>
    </div>
  </div>
  <div className="card">
    <div className="card-body">
      <h2 className="card-title">
        Top Vendors with collection
        <span style={{ paddingLeft: '90px' }}>
          <a href="javascript:void(0)">View All</a>
        </span>
      </h2>
      <ul className="list">
        <li>Baban Torq Ahmed <span>1254134</span></li>
        <li>Khaled Jamaa Aljouder <span>1054215</span></li>
        <li>Mohammed Ismail Ibrahim <span>945874</span></li>
        <li>Bawar Husen Hamasharif <span>854579</span></li>
        <li style={{ paddingBlockEnd: '0px' }}>Abdulhafith Isman Alyasin <span>854579</span></li>
      </ul>
    </div>
  </div>
</section>
  </main>
  );
};

export default OverviewPage;
