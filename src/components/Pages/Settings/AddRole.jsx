import "../../../styles/style.min.css";
import "./settings.css";
import MainTop from "../Navbar/MainTop";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddRolePage = () => {
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const togglePermission = (category, permission) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: !prev[category]?.[permission],
      },
    }));
  };

  const permissionsData = [
    { category: "Overview", permissions: ["View"] },
    { category: "Rider", permissions: ["View", "Edit", "Block", "Delete"] },
    { category: "Vendors", permissions: ["View", "Edit", "Delete"] },
    { category: "Reports", permissions: ["View", "Edit", "Download"] },
    { category: "Files", permissions: ["View", "Edit"] },
    { category: "Settings", permissions: ["View", "Edit"] },
  ];

  return (
    <main className="main-content">
      <MainTop title="Role" />
      <div className="action-container">
        <div className="action-left">
          <p>Employee Role </p>
        </div>
        <div className="action-right">
          <button className="button" onClick={() => navigate("/settings")}>← &nbsp;&nbsp;&nbsp;Back</button>
        </div>
      </div>

      <div className="add-role-container">
      <div className="add-role">
        <label className="role-label"> Role Name</label><br />
        <input type="text" className="role-input" placeholder="Enter role" />
      </div>

      <><p>Choose the previleges for the role</p><br /></>
      <div className="permissions-container">
        {permissionsData.map(({ category, permissions }) => (
          <div key={category} className="permission-row">
           <div className="category-div"><label className="category-label">{category}</label></div> 
            <div className="permission-options">
              {permissions.map((perm) => (
                <div key={perm} className="permission-box" onClick={() => togglePermission(category, perm)}>
                  <div className={`circle ${selectedPermissions[category]?.[perm] ? "checked" : ""}`}></div>
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="button add-role-btn">Add Role</button>
      </div>
      </div>
    </main>
  );
};

export default AddRolePage;