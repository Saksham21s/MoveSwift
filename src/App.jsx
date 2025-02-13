import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AsideSection from './components/AsideNav';
import RidersPage from './components/RidersPage';
import VendorsPage from './components/VendorsPage';
import OverviewPage from './components/OverviewPage';
import ReportsPage from './components/ReportsPage'; 
import FilesPage from './components/FilesPage'; 
import SettingsPage from './components/SettingsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AsideSection />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/riders" element={<RidersPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
