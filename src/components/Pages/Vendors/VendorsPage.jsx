import "../../../styles/style.min.css";
import aeroplane from '../../../assets/aeroplane.png';
import { Link } from 'react-router-dom';
import MainTop from '../Navbar/MainTop';

const OverviewPage = () => {
  return (
    <main className="main-content">
      <MainTop title="Vendors" /> 
      <div className="tabsoon">
        <div id="img-aeroplane"> <img src={aeroplane} alt="Aeroplane Image" /></div>
        <div className="text">This Tab Will be activated soon in future</div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="go-overview"> ← &nbsp;&nbsp;&nbsp;Go to overview section</div>
        </Link>
      </div>
    </main>
  );
};

export default OverviewPage;
