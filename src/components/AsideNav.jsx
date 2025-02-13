import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../styles/style.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faMotorcycle,
  faStore,
  faFileAlt,
  faFolder,
  faCog,
  faSignOutAlt,
  faChevronRight,
  faBars, // Hamburger icon
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/fullship-logo.png";

const AsideSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "" : "collapsed"} ${isMobileOpen ? "open" : ""}`}>
      
        <div className="logo">
        <Link to="/riders">
          <div className="img-logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </div> </Link>
          <span className="logo-text">FULL SHIP</span>
        </div>
     
      {/* Toggle button for larger screens */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>

      {/* Hamburger button for mobile */}
      <button className="hamburger" onClick={toggleMobileSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Navbar links */}
      <div className="collapse navbar-collapse">
        <ul className="nav flex-column icon-center">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faChartBar} /> <span>Overview</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/riders" className="nav-link">
              <FontAwesomeIcon icon={faMotorcycle} /> <span>Riders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vendors" className="nav-link">
              <FontAwesomeIcon icon={faStore} /> <span>Vendors</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">
              <FontAwesomeIcon icon={faFileAlt} /> <span>Reports</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/files" className="nav-link">
              <FontAwesomeIcon icon={faFolder} /> <span>Files</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideSection;
