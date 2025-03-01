import { useState, useEffect, useRef } from "react";
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
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showResolvePopup, setShowResolvePopup] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const filterPopupRef = useRef(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=27")
      .then((response) => response.json())
      .then((data) => {
        const formattedComplaints = data.results.map((user, index) => ({
          id: index + 1,
          riderId: `R00${index + 1}`,
          name: `${user.name.first} ${user.name.last}`,
          date: `2024-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
          type: ["Delivery Issue", "Payment Issue", "App Issue", "Behavior", "Order Issue"][index % 5],
          complaint: [
            "Late delivery",
            "Wrong deduction",
            "App not working",
            "Rude behavior",
            "Wrong order delivered",
          ][index % 5],
          status: index % 2 === 0 ? "Resolved" : "Unresolved",
          riderImage: user.picture.large,
        }));
        setComplaints(formattedComplaints);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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

  const handleFilterClick = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    setShowFilterPopup(false);
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (filter === "All" || complaint.status === filter) &&
      (complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

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
        {alertMessage && (
          <div className="alert-message" style={{ backgroundColor: "#FFD580", color: "black", padding: "10px", borderRadius: "5px", textAlign: "center", marginBottom: "10px", width: "max-content", marginInline: "auto" }}>
            {alertMessage}
          </div>
        )}
        <div className="search-filter">
        <div className="filter-search-section">
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
        <div className="filter-container">
            <button className="filter-btn" onClick={handleFilterClick}>
              Filter
            </button>
            {showFilterPopup && (
              <div className="filter-popup" ref={filterPopupRef}>
                <button onClick={() => handleSortOrder("asc")}>Arrange Ascending</button>
                <button onClick={() => handleSortOrder("desc")}>Arrange Descending</button>
              </div>
            )}
          </div>
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
              <th style={{ textAlign: 'end' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="no-data">Loading...</td>
              </tr>
            ) : sortedComplaints.length > 0 ? (
              sortedComplaints.map((complaint, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No complaints found</td>
              </tr>
            )}
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