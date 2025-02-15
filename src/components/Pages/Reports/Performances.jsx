import "../../../styles/style.min.css";
import "./reports.css";
import MainTop from "../Navbar/MainTop";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PerformancesPage = () => {
  // Data for Acceptance & Completion Rate
  const acceptanceCompletionData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Sun"],
    datasets: [
      {
        label: "Acceptance Rate",
        data: [98, 77, 86,64, 82,90, 93,78],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.2,
      },
      {
        label: "Completion Rate",
        data: [89, 82, 72, 90, 88, 83, 91,88],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.2,
      },
    ],
  };

  // Data for Actual Cash & Received Cash
  const cashFlowData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Sun"],
    datasets: [
      {
        label: "Actual Cash",
        data: [25, 12, 31, 9, 48, 39,51,17],
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        tension: 0.1,
      },
      {
        label: "Received Cash",
        data: [15, 19, 11, 39, 28, 19,31,41],
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.1,
      },
    ],
  };

  return (
    <main className="main-content">
      {/* Top Section */}
      <MainTop title="Performances" />

      {/* First row: Acceptance & Completion Rate */}
      <section className="performances-grid">
        {/* Chart for Acceptance & Completion Rate */}
        <div className="performances-card chart-card">
          <div className="performances-card-body">
            <h2 className="performances-card-title">Riders Performance</h2>
            <Line data={acceptanceCompletionData} />
          </div>
        </div>

        <div className="performances-card stats-card">
          <div   className="performances-card-body performances-data-card">
            <h2 className="performances-card-title">
              Top Riders with Acceptance Rate
              <span>
                <a href="javascript:void(0)">View All</a>
              </span>
            </h2>
            <ul className="performances-list">
              <li>Bakr Ahmed Yousuf <span>98.56%</span></li>
              <li>Fuad Ahmed Jatari <span>98.12%</span></li>
              <li>Abdulqader All Yousuf <span>96.05%</span></li>
              <li>Ruxzod Azad Najmadin <span>97.85%</span></li>
              <li>
                Mohammed Shahab Ahmed <span>87.54%</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Second row: Actual Cash & Received Cash */}
      <section className="performances-grid">
        {/* Second Card */}
        <div className="performances-card stats-card">
          <div  className="performances-card-body performances-data-card">
            <h2 className="performances-card-title">
              Top Riders with Trip Count
              <span>
                <a href="javascript:void(0)">View All</a>
              </span>
            </h2>
            <ul className="performances-list">
              <li>Baban Torq Ahmed <span>1254134</span></li>
              <li>Khaled Jamaa Aljouder <span>1054215</span></li>
              <li>Mohammed Ismail Ibrahim <span>945874</span></li>
              <li>Bawar Husen Hamasharif <span>854579</span></li>
              <li>
                Abdulhafith Isman Alyasin <span>854579</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Chart for Actual Cash & Received Cash */}
        <div className="performances-card chart-card">
          <div className="performances-card-body">
            <h2 className="performances-card-title">Cash Status</h2>
            <Line data={cashFlowData} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PerformancesPage;
