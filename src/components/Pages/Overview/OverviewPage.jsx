import "../../../styles/style.min.css";
import profilePic from '../../../assets/profile-img.webp';
import { Bar, } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";
import PropTypes from 'prop-types';

ChartJS.register(BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const CashStatus = ({ actualCash, receivedCash }) => {
    const balanceCash = actualCash - receivedCash;
    const balanceCashPercentage = ((balanceCash / actualCash) * 100).toFixed(2);

    // Sample weekly data 
    const weeklyActualCash = [42000, 65000, 94000, 47000, 72000, 80000, 56000];
    const weeklyReceivedCash = [42000, 65000, 94000, 47000, 72000, 80000, 56000];

    const chartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Received Cash",
                data: weeklyReceivedCash,
                backgroundColor: "#FFB7D5",
                borderColor: '#FF99C2',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.6,
            },
            {
                label: "Actual Cash",
                data: weeklyActualCash,
                borderColor: "#3498db",
                backgroundColor: 'rgba(111, 189, 241, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: "#3498db",
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                type: 'line',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label;
                        const value = context.formattedValue;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    font: {
                        size: 14
                    },
                    callback: function (value) {
                        return value.toLocaleString();
                    }
                }
            },
        },
    };

    return (
        <section className="cash-status">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">This Week Cash Status</h2>
                    <p>As of Oct 15, 2021, 10:15 AM</p>

                    <div className="status-container">
                        <div className="chart-section">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                        <div className="cash-details">
                            <div className="detail">Actual Cash <span>{actualCash.toLocaleString()}</span></div>
                            <div className="detail" style={{ borderTop: "0.5px solid gray" }}>Received Cash <span>{receivedCash.toLocaleString()}</span></div>
                            <div className="detail" style={{ borderTop: "0.5px solid gray" }}>Balance Cash <span>{balanceCash.toLocaleString()}</span></div>
                            <div className="detail" style={{ borderTop: "0.5px solid gray" }}>Balance Cash % <span>{balanceCashPercentage}%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

CashStatus.propTypes = {
    actualCash: PropTypes.number.isRequired,
    receivedCash: PropTypes.number.isRequired,
};

const OverviewPage = () => {
    const actualCash = 1049345;
    const receivedCash = 687468;

    return (
        <main className="main-content">
            <div className="overview-container">
                <div className="page-overview">
                    <h1 className="page-title">Overview</h1>
                </div>
                <div className="main-top-profile">
                    <span className="name">Saksham Pandey</span>
                    <div className="img-container">
                        <img src={profilePic} alt="Profile Image" className="rounded-img" />
                    </div>
                </div>
            </div>

            <section className="summary-cards">
                <div className="row">
                    <div className="card-item">
                        <div className="card">
                            <div className="card-body">Total Orders<span className="count">245</span></div>
                        </div>
                    </div>
                    <div className="card-item">
                        <div className="card" style={{ backgroundColor: 'rgba(221, 226, 255, 1)' }}>
                            <div className="card-body">Active Orders<span className="count">76</span></div>
                        </div>
                    </div>
                    <div className="card-item">
                        <div className="card">
                            <div className="card-body">Active Riders<span className="count">125</span></div>
                        </div>
                    </div>
                    <div className="card-item">
                        <div className="card">
                            <div className="card-body">Vendors<span className="count">8</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <CashStatus actualCash={actualCash} receivedCash={receivedCash} />

            <section className="top-lists">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">
                            Top riders with acceptance rate
                            <span>
                                <a href="javascript:void(0)">View All</a>
                            </span>
                        </h2>
                        <ul className="list">
                            <li>Bakr Ahmed Yousuf <span>98.56</span></li>
                            <li>Fuad Ahmed Jatari <span>98.12</span></li>
                            <li>Abdulqader All Yousuf <span>96.05</span></li>
                            <li>Ruxzod Azad Najmadin <span>97.85</span></li>
                            <li style={{ paddingBlockEnd: '0px' }}>Mohammed Shahab Ahmed <span>87.54</span></li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">
                            Top riders with acceptance rate
                            <span>
                                <a href="javascript:void(0)">View All</a>
                            </span>
                        </h2>
                        <ul className="list">
                            <li>Baban Torq Ahmed  <span>1254134</span></li>
                            <li>Khaled Jamaa Aljouder<span>1054215</span></li>
                            <li>Mohammed Ismail Ibrahim  <span>945874</span></li>
                            <li>Bawar Husen Hamasharif <span>854579</span></li>
                            <li style={{ paddingBlockEnd: '0px' }}>Abdulhafith Isman Alyasin <span>854579</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OverviewPage;