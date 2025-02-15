import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";

const ComplaintsPage = () => {
  const [filter, setFilter] = useState("Unresolved");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownState, setDropdownState] = useState(null);
  const navigate = useNavigate();

  const names = [
    "Aman Kumar", "Rahul Sharma", "Sakshi Verma", "Deepak Yadav", "Neha Singh", "Ravi Patel",
    "Pooja Gupta", "Vikas Chauhan", "Shreya Jain", "Ankit Thakur", "Nidhi Rawat", "Kunal Mishra",
    "Priya Mehta", "Ramesh Tiwari", "Sonia Dutta", "Yogesh Malhotra", "Kiran Desai", "Vivek Ahuja",
    "Simran Kaur", "Harish Pandey", "Alok Tripathi", "Megha Joshi", "Chetan Bansal", "Ishita Kapoor",
    "Sandeep Goyal", "Varun Saxena", "Monika Reddy"
  ];

  const complaints = names.map((name, index) => {
    const equipment = ["10/12", "14", "16/16", "11/11", "12/12", "17/17"][index % 6];
    return {
      id: index + 1,
      riderId: `R00${index + 1}`,
      name,
      equipmentProvided: equipment,
      status: equipment.split('/')[0] === equipment.split('/')[1] ? "Resolved" : "Unresolved", 
      riderImage: `https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${index % 24}.jpg`,
    };
  });

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (filter === "All" || complaint.status === filter) &&
      (complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.equipmentProvided.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusClass = (equipment) => {
    const isResolved = equipment.split('/')[0] === equipment.split('/')[1];
    return {
      className: isResolved ? "resolved-green" : "resolved-red",
      text: isResolved ? "Complete" : "Incomplete"
    };
  };

  return (
    <main className="main-content">
      <MainTop title="Equipments" />
      <div className="filter-buttons">
        <button
          onClick={() => setFilter("Resolved")}
          className={filter === "Resolved" ? "active" : ""}
        >
          Complete
        </button>
        <button
          onClick={() => setFilter("Unresolved")}
          className={filter === "Unresolved" ? "active" : ""}
        >
          Incomplete
        </button>
      </div>

      <div className="complaints-container">
        <div className="filter-search-section">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="complaints-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Rider</th>
              <th>Equipments Provided</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint, index) => {
              const { className, text } = getStatusClass(complaint.equipmentProvided);
              return (
                <tr key={complaint.id}>
                  <td>{index + 1}</td>
                  <td className="rider-info">
                    <img src={complaint.riderImage} alt={complaint.name} className="rider-img" />
                    <span>{complaint.name}</span>
                  </td>
                  <td>{complaint.equipmentProvided}</td>
                  <td id="status-clr" className={`complaint-status ${className}`}>
                    {text} 
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="ellipsis-btn"
                        onClick={() => setDropdownState(dropdownState === complaint.id ? null : complaint.id)}
                      >
                        ⋮
                      </button>
                      {dropdownState === complaint.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => navigate(`/view/${complaint.id}`)}>View</button>
                          <button onClick={() => navigate(`/resolve/${complaint.id}`)}>Resolve</button>
                          <button onClick={() => navigate(`/delete/${complaint.id}`)}>Delete</button>
                        </div>
                      )}
                    </div>
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

export default ComplaintsPage;
