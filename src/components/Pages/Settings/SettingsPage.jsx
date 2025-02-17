import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/style.min.css";
import "./settings.css";
import MainTop from "../Navbar/MainTop";

const SettingsPage = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate();

  const employees = [
    { name: "Jhon", role: "Admin" },
    { name: "James", role: "Cashier" },
    { name: "Michel", role: "Captain" },
    { name: "David", role: "Moderator" },
    { name: "Tom", role: "Viewer" },
  ];

  const roles = ["Admin", "Cashier", "Captain", "Moderator", "Viewer"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRefs.current[menuOpen] && !menuRefs.current[menuOpen].contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <main className="main-content">
      <MainTop title="Settings" />
      <div className="settings-container">
        {/* Employees Section */}
        <div className="employees-section">
          <div className="section-header">
            <h2>Employees</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="employees-list">
            {employees.map((emp, index) => {
              const popUpId = `employee-${index}`;

              return (
                <div key={index} className="employee-row">
                  <span className="employee-name">{emp.name}</span>
                  <button className={`role-button ${emp.role.toLowerCase()}`}>{emp.role}</button>
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === popUpId ? null : popUpId);
                      }}
                    >
                      ⋮
                    </button>

                    {menuOpen === popUpId && (
                      <div ref={(el) => (menuRefs.current[popUpId] = el)} className="popup-menu">
                        <button>Edit</button>
                        <button>Set as Inactive</button>
                        <button>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add-btn-container">
            <button onClick={() => navigate("/add-employee")} className="add-btn">
              Add New Employee
            </button>
          </div>
        </div>

        {/* Roles Section */}
        <div className="roles-section">
          <div className="section-header">
            <h2>Roles</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="roles-list">
            {roles.map((role, index) => {
              const popUpId = `role-${index}`;

              return (
                <div key={index} className="role-item">
                  <span>{role}</span>
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === popUpId ? null : popUpId);
                      }}
                    >
                      ⋮
                    </button>

                    {menuOpen === popUpId && (
                      <div ref={(el) => (menuRefs.current[popUpId] = el)} className="popup-menu">
                        <button>Edit</button>
                        <button>Set as Inactive</button>
                        <button>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add-btn-container">
            <button onClick={() => navigate("/add-role")} className="add-btn">
              Add New Role
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;