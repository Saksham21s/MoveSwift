import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
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
  faBars,
  faTachometerAlt,
  faExclamationTriangle,
  faTools,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/fullship-logo.png";

const AsideSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const location = useLocation();

  const dropdownLinks = [
    { path: "/reports/performances", label: "Performances", icon: faTachometerAlt },
    { path: "/reports/complaints", label: "Complaints", icon: faExclamationTriangle },
    { path: "/reports/equipments", label: "Equipments", icon: faTools },
    { path: "/reports/download", label: "Download Reports", icon: faDownload },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleReports = () => {
    setIsReportsOpen((prev) => !prev);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "" : "collapsed"} ${isMobileOpen ? "open" : ""}`}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <div className="img-logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <span className="logo-text">FULL SHIP</span>
        </div>
      </Link>

      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>

      <button className="hamburger" onClick={toggleMobileSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

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
          <li className="nav-item" onClick={toggleReports} style={{ cursor: "pointer" }}>
            <span className="nav-link">
              <FontAwesomeIcon icon={faFileAlt} /> <span>Reports</span>
              <FontAwesomeIcon icon={faChevronRight} className={`dropdown-arrow ${isReportsOpen ? "open" : ""}`} />
            </span>
          </li>
          {isReportsOpen && dropdownLinks.map((link) => (
            <li key={link.path} className={`nav-item ${location.pathname === link.path ? "active" : ""}`}>
              <Link to={link.path} className="nav-link">&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={link.icon} /> <span>{link.label}</span>
              </Link>
            </li>
          ))}
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
