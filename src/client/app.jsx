import React, { useState } from 'react';
import './app.css';
import LicenseCenterHome from './pages/LicenseCenterHome.jsx';
import LicenseReturnPage from './pages/LicenseReturnPage.jsx';
import CostPage from './pages/CostPage.jsx';
import TotalLicensesPage from './pages/TotalLicensesPage.jsx';
import SoftwarePage from './pages/SoftwarePage.jsx';
import Login from './components/Login.jsx';
import licenseDataService from './services/LicenseDataService.js';

const App = () => {
    const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    // Handle login with real ServiceNow data
    const handleLogin = async (employeeId) => {
        setLoading(true);
        
        try {
            // Fetch real data from ServiceNow u_software_license table
            await licenseDataService.fetchLicensesForEmployee(employeeId);
            
            // Verify data was loaded successfully
            if (!licenseDataService.isReady()) {
                throw new Error(`No licenses found for Employee ID: ${employeeId}`);
            }
            
            setEmployeeId(employeeId);
            setIsLoggedIn(true);
            
        } catch (error) {
            console.error('Login failed:', error);
            // Re-throw error to be handled by Login component
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        licenseDataService.reset();
        setIsLoggedIn(false);
        setEmployeeId(null);
        setCurrentRoute('#/');
        window.location.hash = '/';
    };

    // Handle navigation
    const handleNavigation = (route) => {
        setCurrentRoute(route);
        window.location.hash = route;
    };

    // Listen to hash changes
    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash || '#/');
        };
        
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Show login screen if not logged in
    if (!isLoggedIn) {
        return (
            <div className="app">
                <Login onLogin={handleLogin} />
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-content">
                            <div className="loading-spinner-large"></div>
                            <div className="loading-text">
                                <h3>Loading Your Licenses</h3>
                                <p>Fetching data from ServiceNow...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Router logic for logged-in users
    const renderCurrentPage = () => {
        // Verify data is still loaded (in case of session issues)
        if (!licenseDataService.isReady()) {
            handleLogout();
            return null;
        }

        switch (currentRoute) {
            case '#/':
            case '#/home':
                return <LicenseCenterHome onNavigate={handleNavigation} />;
            case '#/license-center/return':
                return <LicenseReturnPage onNavigate={handleNavigation} />;
            case '#/license-center/cost':
                return <CostPage onNavigate={handleNavigation} />;
            case '#/license-center/licenses':
                return <TotalLicensesPage onNavigate={handleNavigation} />;
            case '#/license-center/software':
                return <SoftwarePage onNavigate={handleNavigation} />;
            default:
                return <LicenseCenterHome onNavigate={handleNavigation} />;
        }
    };

    return (
        <div className="app">
            {renderCurrentPage()}
            
            {/* Enhanced logout button with employee info */}
            <div className="user-info-panel">
                <div className="user-details">
                    <span className="user-icon">👤</span>
                    <div className="user-text">
                        <div className="employee-id">{employeeId}</div>
                        <div className="license-count">
                            {licenseDataService.getTotalCount()} licenses
                        </div>
                    </div>
                </div>
                <button className="logout-button" onClick={handleLogout} title="Logout">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default App;