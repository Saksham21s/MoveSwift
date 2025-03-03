import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import logo from "../../../assets/moveswift-logo.png";
import block from "../../../assets/block-user.png";

const AsideSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? "" : "collapsed"} ${isMobileOpen ? "open" : ""}`}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <div className="img-logo">
              <img src={logo} alt="Logo" className="logo-img" />
            </div>
            <span className="logo-text">MoveSwift</span>
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
              <span className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="overlay">
          <div className="dialog">
            <div className="dialog-content">
              <div className="dialog-image">
                <img src={block} alt="Logout" />
              </div>
              <div className="dialog-heading">
                <h3>Confirm Logout</h3>
              </div>
              <div className="dialog-paragraph">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="dialog-buttons-container">
                <div className="dialog-buttons">
                  <button className="button confirm" onClick={confirmLogout}>Proceed</button>
                </div>
                <div className="dialog-buttons">
                  <button className="button cancel" onClick={cancelLogout}>Cancel</button>
                </div>
              </div>
              <button className="close-button" onClick={cancelLogout}>
                <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AsideSection;
