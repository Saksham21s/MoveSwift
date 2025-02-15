import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AsideSection from './components/Pages/Navbar/AsideNav';
import RidersPage from './components/Pages/Riders/RidersPage';
import AddRider from './components/Pages/Riders/AddRider';
import VendorsPage from './components/Pages/Vendors/VendorsPage';
import OverviewPage from './components/Pages/Overview/OverviewPage';
import PerformancePage from './components/Pages/Reports/Performances'; 
import ComplaintsPage from './components/Pages/Reports/Complaints'; 
import EquipmentsPage from './components/Pages/Reports/Equipments'; 
import DownloadPage from './components/Pages/Reports/Download'; 
import FilesPage from './components/Pages/Files/FilesPage'; 
import SettingsPage from './components/Pages/Settings/SettingsPage';
import LogoutPage from './components/Pages/Logout/LogoutPage';
import ProfilePage from './components/Pages/Profile/ProfilePage';

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
            <Route path="/reports/performances" element={<PerformancePage />} />
            <Route path="/reports/complaints" element={<ComplaintsPage />} />
            <Route path="/reports/equipments" element={<EquipmentsPage />} />
            <Route path="/reports/download" element={<DownloadPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
