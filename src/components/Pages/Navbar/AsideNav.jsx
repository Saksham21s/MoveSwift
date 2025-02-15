import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/style.min.css";
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
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/fullship-logo.png";

const AsideSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const dropdownLinks = [
    { path: "/reports/performances", label: "Performances" },
    { path: "/reports/complaints", label: "Complaints" }, 
    { path: "/reports/equipments", label: "Equipments" },
    { path: "/reports/download", label: "Download Reports" },
];

  const isDropdownActive = dropdownLinks.some((link) => location.pathname === link.path);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item.dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <aside
      className={`sidebar ${isSidebarOpen ? "" : "collapsed"} ${isMobileOpen ? "open" : ""}`}
    >
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

          <li className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}>
            <Link
              to="#"
              className={`nav-link ${isDropdownActive ? "active-dropdown" : ""}`}
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faFileAlt} /> <span>Reports</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
              />
            </Link>

            {isDropdownOpen && (
              <ul className="dropdown-menu show">
                {dropdownLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`dropdown-item ${location.pathname === link.path ? "active" : ""}`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
