import "../../../styles/style.min.css";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog"
import { useNavigate } from 'react-router-dom';
import newRider from '../../../assets/new-rider.png';
import block from '../../../assets/block.png';
import del from '../../../assets/del.png';
import MainTop from '../Navbar/MainTop';



const OverviewPage = () => {
  const [filter, setFilter] = useState("All Rider");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(null);

  const riders = [
    { id: 1, name: "John Doe", image: "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=2048x2048&w=is&k=20&c=bTE9WTRrEu0QmBJhr-3bqc4xO5jLpkuXFScIpSJWXRQ=", tenure: "6 months", batch: "Batch A", contract: "Active", zone: "Zone 1" },
    { id: 2, name: "Jane Smith", image: "https://media.istockphoto.com/id/1142003969/photo/close-up-profile-of-handsome-young-black-man-against-isolated-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=FMtNIwJNdj_zFtN6yNd9OdP0dHt5qeayjC81LRSot8E=", tenure: "1 year", batch: "Batch B", contract: "Blocked", zone: "Zone 3" },
    { id: 3, name: "David Brown", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", tenure: "8 months", batch: "Batch A", contract: "Deleted", zone: "Zone 2" },
    { id: 4, name: "Sarah Johnson", image: "https://plus.unsplash.com/premium_photo-1678703870962-166fe3f1d274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D", tenure: "2 years", batch: "Batch C", contract: "Active", zone: "Zone 4" },
    { id: 5, name: "Michael White", image: "https://images.unsplash.com/photo-1442328166075-47fe7153c128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww", tenure: "5 months", batch: "Batch B", contract: "Blocked", zone: "Zone 1" },
    { id: 6, name: "Alice Green", image: "https://images.unsplash.com/photo-1579038773867-044c48829161?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww", tenure: "1.5 years", batch: "Batch A", contract: "Active", zone: "Zone 5" },
    { id: 7, name: "James Black", image: "https://images.unsplash.com/photo-1577812360848-4ecf5308ad83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww", tenure: "3 months", batch: "Batch C", contract: "Deleted", zone: "Zone 3" },
    { id: 8, name: "Emma Wilson", image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww", tenure: "6 months", batch: "Batch B", contract: "Active", zone: "Zone 4" },
    { id: 9, name: "Robert King", image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbGUlMjBwcm9maWxlfGVufDB8fDB8fHww", tenure: "9 months", batch: "Batch A", contract: "Blocked", zone: "Zone 2" },
    { id: 10, name: "Sophia Hall", image: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=f4jSwZ_zYOQopFOIcL8Xhz2aaqnUAdzs1-yU-s9t8eU=", tenure: "1 year", batch: "Batch C", contract: "Deleted", zone: "Zone 1" },
    { id: 11, name: "Lucas Gray", image: "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=-F_sZl6saA5wNg2OTdO3zcHZ3aQ2ml9Ru-PXGcUDdHg=", tenure: "7 months", batch: "Batch D", contract: "Active", zone: "Zone 3" },
    { id: 12, name: "Olivia Scott", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", tenure: "2 years", batch: "Batch A", contract: "Blocked", zone: "Zone 5" },
    { id: 13, name: "Ethan Lewis", image: "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=bKhLGIHnBT8Xy-6WYfLUVV-Lz8uyXdt1dYpQXBkjvRs=", tenure: "1 year", batch: "Batch C", contract: "Active", zone: "Zone 2" },
    { id: 14, name: "Mia Harris", image: "https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.webp?a=1&b=1&s=612x612&w=0&k=20&c=CUwthV5iO1s-q27QnvA_Y5ZEsSXWrbyh7fMEuM3oGjQ=", tenure: "3 months", batch: "Batch B", contract: "Deleted", zone: "Zone 4" },
    { id: 15, name: "William Clark", image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww", tenure: "4 months", batch: "Batch A", contract: "Blocked", zone: "Zone 1" },
    { id: 16, name: "Charlotte Lee", image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", tenure: "2 years", batch: "Batch C", contract: "Active", zone: "Zone 3" },
    { id: 17, name: "Benjamin Carter", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", tenure: "6 months", batch: "Batch D", contract: "Blocked", zone: "Zone 5" },
    { id: 18, name: "Amelia Adams", image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", tenure: "9 months", batch: "Batch B", contract: "Deleted", zone: "Zone 2" },
    { id: 19, name: "Jackson Mitchell", image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", tenure: "1 year", batch: "Batch A", contract: "Active", zone: "Zone 4" },
    { id: 20, name: "Harper Walker", image: "https://media.istockphoto.com/id/1188562863/photo/grateful-happy-beautiful-indian-girl-holding-hands-on-chest.webp?a=1&b=1&s=612x612&w=0&k=20&c=WjBV8cv5pD0HIwDtgQDcXxzISiyef7T_dhaUqNXxK0o=", tenure: "5 months", batch: "Batch C", contract: "Blocked", zone: "Zone 1" }
  ];


  // Filtering & Searching Logic
  const filteredRiders = riders.filter((rider) => {
    const matchesFilter = filter === "All Rider" || rider.contract === filter.replace(" Rider", "");
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleMenuToggle = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };


  const [showConfirm, setShowConfirm] = useState(false);
    const [actionType, setActionType] = useState(null);

    const handleActionClick = (type) => {
        setActionType(type);
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        if (actionType === 'block') {
            // Handle block logic here
            console.log("Blocking rider...");
        } else if (actionType === 'delete') {
            // Handle delete logic here
            console.log("Deleting rider...");
        }
        setShowConfirm(false);
        setActionType(null); 
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setActionType(null); 
    };

    const navigate = useNavigate(); // Initializing useNavigate

    const handleAddRiderClick = () => {
        navigate('/add-rider'); 
    };
  return (
    <main className="main-content">
      {/* Top row of overview and profile image */}
      <MainTop title="Riders" />
      {/* Summary cards section */}
      <section className="summary-cards">
        <div className="summary-row">
          <div className="summary-item">
            <div className="summary-box">
              <div className="summary-body">Total Rider<span className="summary-count">145</span></div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-box" style={{ backgroundColor: 'rgba(221, 226, 255, 1)' }}>
              <div className="summary-body" style={{ color: 'black' }}>Active Riders<span className="summary-count">126</span></div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-box">
              <div className="summary-body">Inactive Riders<span className="summary-count">12</span></div>
            </div>
          </div>
          <div className="summary-item">
            <div>
            <div className="new-rider" onClick={handleAddRiderClick}> {/* Add onClick handler */}
                <img src={newRider} alt="New Rider" />
                <span>Add New Rider</span>
            </div>
                <div className="new-rider-btn">
                    <button onClick={() => handleActionClick('block')} className="rider-btn-item"> 
                        <img src={block} alt="Block" />
                        <span>Block</span>
                    </button>
                    <button onClick={() => handleActionClick('delete')} className="rider-btn-item">
                        <img src={del} alt="Delete" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {showConfirm && (
                <ConfirmationDialog 
                    actionType={actionType}
                    onConfirm={handleConfirm} 
                    onCancel={handleCancel} 
                />
            )}
        </div>
        </div>
      </section>


      <div className="rider-data">
        <div className="filter-rider">
          {["Active Rider", "Blocked Rider", "Deleted Rider", "All Rider"].map((item) => (
            <div
              key={item}
              className={`rider-filter-data ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="rider-data-card">
        {/* Deleted Riders Alert */}
        {filter === 'Deleted Rider' && (
          <div className="alert-box">
            <span className="alert-text">Deleted users will be removed from the list automatically after 15 days.</span>
            <button className="alert-close-btn" onClick={() => setFilter('')}>×</button>
          </div>
        )}

        {/* Filter Tabs */}
        {/* Search and Filter */}
        <div className="card-header">
          <input
            type="text"
            placeholder="Search Rider..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="filter-btn">Filter</button>
        </div>

        {/* Riders Table */}
        <div className="rider-table-container">
          <table className="rider-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>S. No.</th>
                <th>Rider Name</th>
                <th>Tenure</th>
                <th>Batch</th>
                <th>Contract</th>
                <th>Zone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.length > 0 ? (
                filteredRiders.map((rider, index) => (
                  <tr key={rider.id}>
                    <td><input type="checkbox" /></td>
                    <td>{index + 1}</td>
                    <td className="rider-info">
                      <img src={rider.image} alt={rider.name} className="rider-img" />
                      {rider.name}
                    </td>
                    <td>{rider.tenure}</td>
                    <td>{rider.batch}</td>
                    <td className={`contract ${rider.contract.toLowerCase()}`}>
                      <div className="clr">
                        {rider.contract}</div>
                    </td>
                    <td>{rider.zone}</td>
                    <td className="action-cell">
                      <button className="action-btn" onClick={() => handleMenuToggle(rider.id)}>⋮</button>
                      {menuVisible === rider.id && (
                        <div className="action-menu">
                          <button onClick={() => handleActionClick('unblock')}>Unblock</button>
                          <button onClick={() => handleActionClick('resume')}>Resume</button>
                          <button  onClick={() => handleActionClick('block')}>Block</button>
                          <button  onClick={() => handleActionClick('delete')}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No riders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </main>
  );
};

export default OverviewPage;
