import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AsideSection from './components/Pages/Navbar/AsideNav';
import RidersPage from './components/Pages/Riders/RidersPage';
import AddRider from './components/Pages/Riders/AddRider';
import VendorsPage from './components/Pages/Vendors/VendorsPage';
import OverviewPage from './components/Pages/Overview/OverviewPage';
import ReportsPage from './components/Pages/Reports/ReportsPage'; 
import FilesPage from './components/Pages/Files/FilesPage'; 
import SettingsPage from './components/Pages/Settings/SettingsPage';
import LogoutPage from './components/Pages/Logout/LogoutPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AsideSection />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/riders" element={<RidersPage />} />
            <Route path="/add-rider" element={<AddRider />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
