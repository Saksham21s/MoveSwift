import { useState, useEffect, useRef } from "react";
import "../../../styles/style.min.css";
import "./settings.css";
import MainTop from "../Navbar/MainTop";
import { useNavigate } from "react-router-dom";

const AddEmployeePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  const handleMenuOpen = (e, popUpId) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === popUpId ? null : popUpId);
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
                      onClick={(e) => handleMenuOpen(e, popUpId)}
                    >
                      ⋮
                    </button>

                    {menuOpen === popUpId && (
                      <div className="popup-menu">
                        <button>Edit</button>
                        <button>Set as Inactive</button>
                        <button>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AddEmployeePage;
