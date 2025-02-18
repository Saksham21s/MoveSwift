import { useState, useEffect, useRef } from "react";
import "../../../styles/style.min.css";
import "./settings.css";
import MainTop from "../Navbar/MainTop";
import { useNavigate } from "react-router-dom";
import DialogueBox from "../Riders/ConfirmationDialog"; 

const AddEmployeePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);

  const employees = [
    { id: 1, name: "John Doe", role: "Admin", email: "john@example.com", mobile: "9876543210", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Cashier", email: "jane@example.com", mobile: "9876543211", status: "Inactive" },
    { id: 3, name: "Michael Brown", role: "Captain", email: "michael@example.com", mobile: "9876543212", status: "Active" },
    { id: 4, name: "Emily Johnson", role: "Moderator", email: "emily@example.com", mobile: "9876543213", status: "Inactive" },
    { id: 5, name: "Chris Evans", role: "Viewer", email: "chris@example.com", mobile: "9876543214", status: "Active" },
    { id: 6, name: "Michael Brown", role: "Captain", email: "michael@example.com", mobile: "9876543212", status: "Active" },
    { id: 7, name: "Jane Smith", role: "Cashier", email: "jane@example.com", mobile: "9876543211", status: "Inactive" },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.mobile.includes(searchQuery)
  );

  const handleMenuOpen = (e, popUpId, employee) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === popUpId ? null : popUpId);
    setSelectedEmployee(employee); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePopupConfirm = () => {
    if (popupAction === "delete") {
      console.log(`Deleting ${selectedEmployee.name}`);
    } else if (popupAction === "edit") {
      console.log(`Editing ${selectedEmployee.name}`);
    }
    setShowPopup(false);
    setSelectedEmployee(null);
    setPopupAction(null);
  };

  return (
    <main className="main-content">
      <MainTop title="Employee" />
      <div className="action-container">
        <div className="action-left">
          <p> Employee</p>
        </div>
        <div className="action-right">
          <button className="button" onClick={() => navigate("/settings")}>
            ← &nbsp;&nbsp;&nbsp;Back
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => {
              const popUpId = `employee-${index}`;
              return (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>
                    <div className={`role-badge ${emp.role.toLowerCase()}`}>
                      {emp.role}
                    </div>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>
                    <div className={`status-badge ${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </div>
                  </td>
                  <td className="popup-container" ref={menuRef}>
                    <button
                      className="menu-button"
                      onClick={(e) => handleMenuOpen(e, popUpId, emp)} // Pass the employee object
                    >
                      ⋮
                    </button>

                    {menuOpen === popUpId && (
                      <div className="popup-menu">
                        <button onClick={() => { setPopupAction("edit"); setShowPopup(true); }}>Edit</button> {/* Set action and show popup */}
                        <button onClick={() => { setPopupAction("delete"); setShowPopup(true); }}>Delete</button> {/* Set action and show popup */}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <DialogueBox
          actionType={popupAction}
          title={`${popupAction === "delete" ? "Delete" : "Edit"} Employee`}
          message={`Are you sure you want to ${popupAction} ${selectedEmployee.name}?`}
          onConfirm={handlePopupConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </main>
  );
};

export default AddEmployeePage;