import { useState, useEffect, useRef } from "react";
import "../../../styles/style.min.css";
import ConfirmationDialog from "./ConfirmationDialog";
import { useNavigate } from 'react-router-dom';
import newRider from '../../../assets/new-rider.png';
import block from '../../../assets/block.png';
import del from '../../../assets/del.png';
import MainTop from '../Navbar/MainTop';

const RiderPage = () => {
  const [filter, setFilter] = useState("All Rider");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);
  const filterPopupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((data) => {
        const formattedRiders = data.results.map((user, index) => ({
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.large,
          tenure: `${Math.floor(Math.random() * 12) + 1} months`,
          batch: `Batch ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          contract: ["Active", "Blocked", "Deleted"][Math.floor(Math.random() * 3)],
          zone: `Zone ${Math.floor(Math.random() * 5) + 1}`,
        }));
        setRiders(formattedRiders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredRiders = riders.filter((rider) => {
    const matchesFilter = filter === "All Rider" || rider.contract === filter.replace(" Rider", "");
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedRiders = [...filteredRiders].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const handleMenuToggle = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(null);
    }
    if (filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
      setShowFilterPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleActionClick = (type) => {
    setActionType(type);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (actionType === 'block') {
      console.log("Blocking rider...");
    } else if (actionType === 'delete') {
      console.log("Deleting rider...");
    }
    setShowConfirm(false);
    setActionType(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setActionType(null);
  };

  const handleAddRiderClick = () => {
    navigate('/add-rider');
  };

  const handleFilterClick = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    setShowFilterPopup(false);
  };

  return (
    <main className="main-content">
      <MainTop title="Riders" />
      <section className="summary-cards">
        <div className="summary-row">
          <div className="summary-item">
            <div className="summary-box">
              <div className="summary-body">Total Rider<span className="summary-count">145</span></div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-box">
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
              <div className="new-rider" onClick={handleAddRiderClick}>
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
        {filter === 'Deleted Rider' && (
          <div className="alert-box">
            <span className="alert-text">Deleted users will be removed from the list automatically after 15 days.</span>
            <button className="alert-close-btn" onClick={() => setFilter('')}>×</button>
          </div>
        )}
        
        <div className="table-top-card">
          <div className="card-header">
            <input
              type="text"
              placeholder="Search Rider..."
              className="search-bar"
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
                <th style={{textAlign:'end'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="no-data">Loading...</td>
                </tr>
              ) : sortedRiders.length > 0 ? (
                sortedRiders.map((rider, index) => (
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
                        <div className="action-menu" ref={menuRef}>
                          <button onClick={() => handleActionClick('unblock')}>Unblock</button>
                          <button onClick={() => handleActionClick('resume')}>Resume</button>
                          <button onClick={() => handleActionClick('block')}>Block</button>
                          <button onClick={() => handleActionClick('delete')}>Delete</button>
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

export default RiderPage;