import { useState, useEffect } from "react";
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

  const [reportDates, setReportDates] = useState({
    "Cash Report": { option: "Today", date: "" },
    "Weekly Performance": { option: "This Week", date: "" },
    "Salary": { option: "This Month", date: "" },
    "Equipments": { option: "Particular Employee", date: "" },
  });

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const handleOptionChange = (report, option) => {
    const updatedReportDates = { ...reportDates };
    updatedReportDates[report].option = option;

    if (option === "Today") {
      updatedReportDates[report].date = getCurrentDate();
    } else if (option === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      updatedReportDates[report].date = yesterday.toISOString().split("T")[0];
    } else if (option === "This Week") {
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      updatedReportDates[report].date = `${firstDayOfWeek.toISOString().split("T")[0]} - ${getCurrentDate()}`;
    } else if (option === "Last Week") {
      const today = new Date();
      const firstDayOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
      updatedReportDates[report].date = `${firstDayOfLastWeek.toISOString().split("T")[0]} - ${getCurrentDate()}`;
    } else if (option === "This Month" || option === "Last Month") {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      updatedReportDates[report].date = `${startOfMonth.toISOString().split("T")[0]} - ${getCurrentDate()}`;
    } else {
      updatedReportDates[report].date = "";
    }

    setReportDates(updatedReportDates);
  };

  useEffect(() => {
    setReportDates((prevState) => {
      return {
        ...prevState,
        "Cash Report": { ...prevState["Cash Report"], date: getCurrentDate() },
        "Weekly Performance": { ...prevState["Weekly Performance"], date: `${getCurrentDate()} - ${getCurrentDate()}` },
        "Salary": { ...prevState["Salary"], date: `${getCurrentDate()} - ${getCurrentDate()}` },
      };
    });
  }, []);

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
            <h2 className="report-heading">{report}</h2>

            <div className="options">
              {options.map((option, i) => (
                <label key={i} className="option-label">
                  <input
                    type="radio"
                    name={`option-${index}`}
                    className="option-radio"
                    checked={reportDates[report].option === option}
                    onChange={() => handleOptionChange(report, option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="date-section">
              <label className="date-label">
                {reportDates[report].option === "Choose Date" ? "Select Date:" : "Selected Date:"}
              </label>
              {reportDates[report].option === "Choose Date" || reportDates[report].option === "Today" || reportDates[report].option === "Yesterday" ? (
                <input
                  type="date"
                  className="date-picker"
                  value={reportDates[report].date}
                  onChange={(e) => setReportDates({
                    ...reportDates,
                    [report]: { ...reportDates[report], date: e.target.value },
                  })}
                />
              ) : (
                <input
                type="date"
                className="date-picker"
                value={reportDates[report].date}
                onChange={(e) => setReportDates({
                  ...reportDates,
                  [report]: { ...reportDates[report], date: e.target.value },
                })}
              />
              )}
            </div>

            <button className="get-report-button" onClick={() => setModalOpen(true)}>
              Get Report
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
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
