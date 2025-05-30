import { useState, useEffect, useRef } from "react";
import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";
import DialogueBox from "../Riders/ConfirmationDialog";

const ComplaintsPage = () => {
  const [filter, setFilter] = useState("Incomplete");
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
          equipmentProvided: ["10/12", "14", "16/16", "11/11", "12/12", "17/17"][index % 6],
          status: ["Resolved", "Unresolved"][index % 2],
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
    setComplaints(complaints.filter((c) => c.id !== selectedComplaint.id));
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

  const filteredComplaints = complaints.filter((complaint) => {
    const [provided, total] = complaint.equipmentProvided.split('/').map(Number);

    // Check if the complaint matches the search term
    const matchesSearchTerm =
      complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.riderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.equipmentProvided.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply the filter based on the selected filter type
    if (filter === "Complete") {
      return provided === total && matchesSearchTerm; // Only show complete
    } else if (filter === "Incomplete") {
      return provided !== total && matchesSearchTerm; // Only show incomplete
    } else {
      return matchesSearchTerm; // Show all if no filter is selected
    }
  });

  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const getStatusClass = (equipment) => {
    const [provided, total] = equipment.split('/').map(Number);
    const isResolved = provided === total;
    return {
      className: isResolved ? "resolved-green" : "resolved-red",
      text: isResolved ? "Complete" : "Incomplete",
    };
  };

  return (
    <main className="main-content">
      <MainTop title="Equipments" />
      <div className="filter-buttons">
        <button
          onClick={() => setFilter("Complete")}
          className={filter === "Complete" ? "active" : ""}
        >
          Complete
        </button>
        <button
          onClick={() => setFilter("Incomplete")}
          className={filter === "Incomplete" ? "active" : ""}
        >
          Incomplete
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
              placeholder="Search Equipments"
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
              <th>Rider ID</th>
              <th>Rider</th>
              <th>Equipments Provided</th>
              <th>Status</th>
              <th style={{ textAlign: 'end' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="no-data">Loading...</td>
              </tr>
            ) : sortedComplaints.length > 0 ? (
              sortedComplaints.map((complaint, index) => {
                const { className, text } = getStatusClass(complaint.equipmentProvided);
                return (
                  <tr key={complaint.id}>
                    <td>{index + 1}</td>
                    <td>{complaint.riderId}</td>
                    <td className="rider-info">
                      <img src={complaint.riderImage} alt={complaint.name} className="rider-img" />
                      <span>{complaint.name}</span>
                    </td>
                    <td>{complaint.equipmentProvided}</td>
                    <td id="status-clr">
                      <div className={`complaint-status ${className}`}>
                        {text}
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
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No complaints found</td>
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
          title="View Equipment Details"
          message={`View details for ${selectedComplaint?.name}?`}
          onConfirm={handleViewConfirm}
          onCancel={() => setShowViewPopup(false)}
        />
      )}

      {showResolvePopup && (
        <DialogueBox
          actionType="resolve"
          title="Resolve Equipment Issue"
          message={`Mark equipment issue as resolved for ${selectedComplaint?.name}?`}
          onConfirm={handleResolveConfirm}
          onCancel={() => setShowResolvePopup(false)}
        />
      )}
    </main>
  );
};

export default ComplaintsPage;