import { useState } from "react";
import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";
import logoPopup from "../../../assets/block-user.png";
import { useNavigate } from "react-router-dom";

const reportOptions = {
  "Cash Report": ["Today", "Yesterday", "Choose Date"],
  "Weekly Performance": ["This Week", "Last Week", "Choose Week"],
  "Salary": ["This Month", "Last Month", "Other Month"],
  "Equipments": ["Particular Employee", "Overall"],
};

const ReportFilter = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className={`main-content ${modalOpen ? "blurred" : ""}`}>
      <MainTop title="Reports" />
      <div className="action-container">
        <div className="action-left">
          <p>Download Reports</p>
        </div>
        <div className="action-right">
          <button className="button" onClick={() => navigate(-1)}>
            ← &nbsp;&nbsp;&nbsp;Back
          </button>
        </div>
      </div>
      <div className="report-container">
        {Object.entries(reportOptions).map(([report, options], index) => (
          <div key={index} className="report-box">
            {/* Heading */}
            <h2 className="report-heading">{report}</h2>

            {/* Options */}
            <div className="options">
              {options.map((option, i) => (
                <label key={i} className="option-label">
                  <input type="radio" name={`option-${index}`} className="option-radio" />
                  {option}
                </label>
              ))}
            </div>

            {/* Common Date Picker */}
            <div className="date-section">
              <label className="date-label">Select Date:</label>
              <input type="date" className="date-picker" />
            </div>

            {/* Get Report Button */}
            <button className="get-report-button" onClick={() => setModalOpen(true)}>
              Get Report
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
  <div className="modal-overlay" >
    <div className="modal-content">
      <button className="modal-close-icon" onClick={() => setModalOpen(false)}>×</button>
      <img src={logoPopup} alt="Coming Soon" className="modal-image" />
      <h2 className="modal-heading">This section will be added soon</h2>
      <button className="close-modal-button" onClick={() => setModalOpen(false)}>
        Go Back
      </button>
    </div>
  </div>
)}
    </main>
  );
};

export default ReportFilter;
