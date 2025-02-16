import "../../../styles/style.min.css";
import "./files.css";
import MainTop from '../Navbar/MainTop';
import { useState } from "react";

const FilesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="main-content">
      {/* Top row of overview and profile image */}
      <MainTop title="Files" />

      <div className={`files-container ${modalOpen ? "blurred" : ""}`}>

        {/* Cards Section (4 in a row for desktop, 2 in a row for mobile) */}
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
            <div className="left-box">Daily Cash Report</div>
            <div className="left-box">Weekly Performance</div>
            <div className="left-box">Salary Sheet</div>
            <div className="left-box">Equipments</div>
          </div>

          {/* Right Side */}
          <div className="right-div">
            <div className="date-options">
              <label>
                <input type="radio" name="date-option" value="today" />
                <span className="radio-label">Today</span>
              </label>

              <label>
                <input type="radio" name="date-option" value="yesterday" />
                <span className="radio-label">Yesterday</span>
              </label>

              <label>
                <input type="radio" name="date-option" value="choose-date" />
                <span className="radio-label">Choose Date</span>
              </label>
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
              <img src="popup-image.png" alt="Coming Soon" className="modal-image" />
              <h2>This section will be added soon</h2>
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
