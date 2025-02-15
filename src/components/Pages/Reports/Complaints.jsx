import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";

const ComplaintsPage = () => {
  const [filter, setFilter] = useState("Unresolved");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownState, setDropdownState] = useState(null);
  const navigate = useNavigate();

  const complaints = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    riderId: `R00${index + 1}`,
    name: `Rider ${index + 1}`,
    date: `2025-02-${(index % 28) + 1}`,
    type: ["Delivery Issue", "Payment Issue", "App Issue", "Behavior", "Order Issue"][index % 5],
    complaint: [
      "Late delivery",
      "Wrong deduction",
      "App not working",
      "Rude behavior",
      "Wrong order delivered",
    ][index % 5],
    status: index % 2 === 0 ? "Resolved" : "Unresolved",
    riderImage: `https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${index % 50}.jpg`,
  }));

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (filter === "All" || complaint.status === filter) &&
      (complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="main-content">
      <MainTop title="Complaints" />
      <ErrorBoundary>
        <div className="complaints-container">
          <div className="filter-search-section">
            <div className="filter-buttons">
              <button onClick={() => setFilter("Resolved")} className={filter === "Resolved" ? "active" : ""}>
                Resolved
              </button>
              <button onClick={() => setFilter("Unresolved")} className={filter === "Unresolved" ? "active" : ""}>
                Unresolved
              </button>
            </div>
            <input type="text" placeholder="Search complaints..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <th>Actions</th>
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
                  <td className={`complaint-status ${complaint.status.toLowerCase()}`}>{complaint.status}</td>
                  <td>
                    <div className="dropdown">
                      <button className="ellipsis-btn" onClick={() => setDropdownState(dropdownState === complaint.id ? null : complaint.id)}>
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
              ))}
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    </main>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ComplaintsPage;
