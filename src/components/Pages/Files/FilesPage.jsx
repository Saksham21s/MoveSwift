import { useState } from "react";
import "../../../styles/style.min.css";
import "./files.css";
import MainTop from "../Navbar/MainTop";
import logoPopup from "../../../assets/block-user.png";

const FilesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState("Daily Cash Report");

  // Mapping for different radio options based on selected left box
  const dateOptions = {
    "Daily Cash Report": ["Today", "Yesterday", "Choose Date"],
    "Weekly Performance": ["This Week", "Previous Week", "Choose Week"],
    "Salary Sheet": ["This Month", "Previous Month", "Choose Month"],
    "Equipments": ["This Year", "Previous Year", "Choose Year"],
  };

  return (
    <main className="main-content">
      <MainTop title="Files" />

      <div className={`files-container ${modalOpen ? "blurred" : ""}`}>
        <div className="cards-section">
          <div className="file-card">
            <h3>Daily Cash Report</h3>
            <p>Last Updated</p>
            <p>Nov 05, 2022 10:45 AM</p>
          </div>
          <div className="file-card">
            <h3>Weekly Performance</h3>
            <p>Last Updated</p>
            <p>Nov 11, 2023 10:45 AM</p>
          </div>
          <div className="file-card">
            <h3>Salary Sheet</h3>
            <p>Last Updated</p>
            <p>Nov 15, 2024 10:45 AM</p>
          </div>
          <div className="file-card">
            <h3>Equipments</h3>
            <p>Last Updated</p>
            <p>Nov 10, 2025 10:45 AM</p>
          </div>
        </div>

        <div className="form-section">
          {/* Left Side Boxes */}
          <div className="left-div">
            {Object.keys(dateOptions).map((box) => (
              <div
                key={box}
                className={`left-box ${selectedBox === box ? "active" : ""}`}
                onClick={() => setSelectedBox(box)}
              >
                {box}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="right-div">
            <div className="date-options">
              {dateOptions[selectedBox].map((option) => (
                <label key={option}>
                  <input type="radio" name="date-option" value={option.toLowerCase()} />
                  <span className="radio-label">{option}</span>
                </label>
              ))}
            </div>

            <label htmlFor="date">Date</label>
            <input type="date" className="date-picker" />

            <div className="file-upload-section">
              <div className="upload-icon">📂</div>
              <p>Drag & Drop files here or just</p>
              <label className="upload-button">
                Click to Browse
                <input type="file" hidden />
              </label>
            </div>

            <button className="submit-button" onClick={() => setModalOpen(true)}>
              Upload File
            </button>
          </div>
        </div>

        {/* Modal Popup */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img src={logoPopup} alt="Coming Soon" className="modal-image" />
              <h2>File Uploaded Successfully</h2>
              <button className="close-modal-button" onClick={() => setModalOpen(false)}>
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default FilesPage;
