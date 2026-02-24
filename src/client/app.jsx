import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import LicenseCenterHome from './pages/LicenseCenterHome.jsx';
import LicenseReturnPage from './pages/LicenseReturnPage.jsx';
import CostPage from './pages/CostPage.jsx';
import TotalLicensesPage from './pages/TotalLicensesPage.jsx';
import SoftwarePage from './pages/SoftwarePage.jsx';
import './app.css';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '';
      setCurrentRoute(hash);
    };

    handleHashChange(); // Set initial route
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route) => {
    window.location.hash = route;
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'license-center/return':
        return <LicenseReturnPage navigate={navigate} />;
      case 'license-center/cost':
        return <CostPage navigate={navigate} />;
      case 'license-center/licenses':
        return <TotalLicensesPage navigate={navigate} />;
      case 'license-center/software':
        return <SoftwarePage navigate={navigate} />;
      default:
        return <LicenseCenterHome navigate={navigate} />;
    }
  };

  return (
    <div className="license-center">
      <Header currentRoute={currentRoute} navigate={navigate} />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
}