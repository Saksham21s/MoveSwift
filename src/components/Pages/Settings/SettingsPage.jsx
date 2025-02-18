import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/style.min.css";
import "./settings.css";
import MainTop from "../Navbar/MainTop";
import DialogueBox from "../Riders/ConfirmationDialog";

const SettingsPage = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); 
  const [popupAction, setPopupAction] = useState(null); 


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

  const handleMenuClick = (item, type) => {
    setSelectedItem(item);
    setPopupAction(type); 
    setShowPopup(true);
    setMenuOpen(null);
  };

  const handlePopupConfirm = () => {
    if (popupAction === "delete") {
      console.log(`Deleting ${selectedItem.name || selectedItem} (Employee/Role)`);
    } else if (popupAction === "edit") {
      console.log(`Editing ${selectedItem.name || selectedItem} (Employee/Role)`);

    }
    setShowPopup(false);
    setSelectedItem(null);
    setPopupAction(null);
  };

  return (
    <main className="main-content">
      <MainTop title="Settings" />
      <div className="settings-container">
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
                        <button onClick={() => handleMenuClick(emp, "edit")}>Edit</button>
                        <button onClick={() => handleMenuClick(emp, "delete")}>Delete</button>
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
                        <button onClick={() => handleMenuClick(role, "edit")}>Edit</button>
                        <button onClick={() => handleMenuClick(role, "delete")}>Delete</button>
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
          {showPopup && (
        <DialogueBox
          actionType={popupAction}
          title={`${popupAction === "delete" ? "Delete" : "Edit"} ${selectedItem.name || selectedItem} (Employee/Role)`}
          message={`Are you sure you want to ${popupAction} ${selectedItem.name || selectedItem}?`}
          onConfirm={handlePopupConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </main>
  );
};

export default SettingsPage;