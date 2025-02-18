import { useState } from "react";
import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";
import DialogueBox from "../Riders/ConfirmationDialog";

const ComplaintsPage = () => {
  const [filter, setFilter] = useState("Unresolved");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownState, setDropdownState] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState(
    Array.from({ length: 27 }, (_, index) => ({
      id: index + 1,
      riderId: `R00${index + 1}`,
      name: [
        "Aman Kumar", "Rahul Sharma", "Sakshi Verma", "Deepak Yadav", "Neha Singh", "Ravi Patel",
        "Pooja Gupta", "Vikas Chauhan", "Shreya Jain", "Ankit Thakur", "Nidhi Rawat", "Kunal Mishra",
        "Priya Mehta", "Ramesh Tiwari", "Sonia Dutta", "Yogesh Malhotra", "Kiran Desai", "Vivek Ahuja",
        "Simran Kaur", "Harish Pandey", "Alok Tripathi", "Megha Joshi", "Chetan Bansal", "Ishita Kapoor",
        "Sandeep Goyal", "Varun Saxena", "Monika Reddy"
      ][index],
      date: `2025-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
      type: ["Delivery Issue", "Payment Issue", "App Issue", "Behavior", "Order Issue"][index % 5],
      complaint: [
        "Late delivery",
        "Wrong deduction",
        "App not working",
        "Rude behavior",
        "Wrong order delivered",
      ][index % 5],
      status: index % 2 === 0 ? "Resolved" : "Unresolved",
      riderImage: `https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${index % 24}.jpg`,
    }))
  );
  const [alertMessage, setAlertMessage] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showResolvePopup, setShowResolvePopup] = useState(false);


  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewPopup(true);
  };

  const handleResolveClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowResolvePopup(true);
  };

  const handleDeleteClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    setComplaints(complaints.filter(c => c.id !== selectedComplaint.id));
    setAlertMessage(`${selectedComplaint.name} deleted.`);
    setTimeout(() => setAlertMessage(null), 2000);
    setShowDialog(false);
    setSelectedComplaint(null);
  };

  const handleViewConfirm = () => {
    console.log("Viewing complaint:", selectedComplaint);
    setShowViewPopup(false);
  };

  const handleResolveConfirm = () => {
    console.log("Resolving complaint:", selectedComplaint);
    setShowResolvePopup(false);
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (filter === "All" || complaint.status === filter) &&
      (complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="main-content">
      <MainTop title="Complaints" />

      <div className="filter-buttons">
        <button onClick={() => setFilter("Resolved")} className={filter === "Resolved" ? "active" : ""}>
          Resolved
        </button>
        <button onClick={() => setFilter("Unresolved")} className={filter === "Unresolved" ? "active" : ""}>
          Unresolved
        </button>
      </div>
      <div className="complaints-container">
        {alertMessage && <div className="alert-message" style={{ backgroundColor: "#FFD580", color: "black", padding: "10px", borderRadius: "5px", textAlign: "center", marginBottom: "10px" ,width:"max-content",marginInline:"auto"}}>{alertMessage}</div>}
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
              <th>Date</th>
              <th>Type</th>
              <th>Complaint</th>
              <th>Status</th>
              <th style={{textAlign:'end'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint, index) => (
              <tr key={complaint.id}>
                <td>{index + 1}</td>
                <td className="rider-info">
                  <img src={complaint.riderImage} alt={complaint.name} className="rider-img" />
                  <span>{complaint.name}</span>
                </td>
                <td>{complaint.date}</td>
                <td>{complaint.type}</td>
                <td>{complaint.complaint}</td>
                <td>
                  <div className={`complaint-status ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </div>
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
                        <button onClick={() => handleViewClick(complaint)}>View</button>
                        <button onClick={() => handleResolveClick(complaint)}>Resolve</button>
                        <button onClick={() => handleDeleteClick(complaint)}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDialog && (
        <DialogueBox
          actionType="delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDialog(false)}
        />
      )}

      {showViewPopup && (
        <DialogueBox
          actionType="view"
          title="View Complaint Details"
          message={`View details for ${selectedComplaint?.name}?`}
          onConfirm={handleViewConfirm}
          onCancel={() => setShowViewPopup(false)}
        />
      )}

      {showResolvePopup && (
        <DialogueBox
          actionType="resolve"
          title="Resolve Complaint"
          message={`Mark complaint as resolved for ${selectedComplaint?.name}?`}
          onConfirm={handleResolveConfirm}
          onCancel={() => setShowResolvePopup(false)}
        />
      )}
    </main>
  );
};

export default ComplaintsPage;