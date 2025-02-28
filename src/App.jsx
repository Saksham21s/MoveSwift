import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import AddEmployeePage from './components/Pages/Settings/AddEmployee';
import AddRolePage from './components/Pages/Settings/AddRole';
import LogoutPage from './components/Pages/Logout/LogoutPage';
import ForgotPasswordPage from './components/Pages/Logout/ForgotPasswordPage';
import OtpVerifyPage from './components/Pages/Logout/OtpVerifyPage';
import ProfilePage from './components/Pages/Profile/ProfilePage';

function Layout() {
  const location = useLocation();
  const isAuthPage = ["/logout", "/forgot-password", "/otp-verify"].includes(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("user"));

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("user"));
  }, [location.pathname]);

  if (!isLoggedIn && !isAuthPage) {
    return <Navigate to="/logout" replace />;
  }

  return (
    <div className="app-container">
      {!isAuthPage && <AsideSection />}
      {!isAuthPage && (
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
            <Route path="/add-employee" element={<AddEmployeePage />} />
            <Route path="/add-role" element={<AddRolePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      )}
      {isAuthPage && (
        <Routes>
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp-verify" element={<OtpVerifyPage />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
