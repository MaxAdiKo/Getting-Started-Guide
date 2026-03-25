import React, { useState } from 'react';
import licenseDataService from '../services/LicenseDataService.js';
import './LicenseReturnPage.css';

export default function LicenseReturnPage({ navigate }) {
  const [selectedLicense, setSelectedLicense] = useState(null);

  // Alle Lizenzen aus dem Service holen
  const licenses = LicenseDataService.getLicensesForReturn();

  const handleLicenseClick = (license) => {
    setSelectedLicense(license);
  };

  const handleReturn = () => {
    if (selectedLicense) {
      // Get current user (in real ServiceNow this would be from user context)
      const currentUser = window.g_user?.getUserName() || 'current_user';
      console.log(`User ${currentUser} wants to return license ${selectedLicense.software} with ID ${selectedLicense.id}`);
    }
  };

  const handleBackHome = () => {
    navigate('');
  };

  return (
    <div className="license-return-page">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackHome}>← Back to License Center</button>
        <h1>License Return</h1>
      </div>
      
      <div className="return-layout">
        <div className="licenses-table-section">
          <h2>Your Licenses ({licenses.length} total)</h2>
          <div className="scrollable-table">
            <table className="return-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Software</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((license, index) => (
                  <tr 
                    key={index} 
                    className={`table-row ${selectedLicense?.id === license.id ? 'selected' : ''}`}
                    onClick={() => handleLicenseClick(license)}
                  >
                    <td className="license-id">{license.id}</td>
                    <td className="license-software">{license.software}</td>
                    <td>
                      <span className={`status-badge ${license.status.toLowerCase()}`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="license-price">{license.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="detail-panel">
          {selectedLicense ? (
            <div className="license-details">
              <h3>License Details</h3>
              <div className="detail-field">
                <label>Software Name</label>
                <div className="field-value">{selectedLicense.software}</div>
              </div>
              <div className="detail-field">
                <label>Price</label>
                <div className="field-value">{selectedLicense.price}</div>
              </div>
              <div className="detail-field">
                <label>ID</label>
                <div className="field-value">{selectedLicense.id}</div>
              </div>
              <button className="return-btn" onClick={handleReturn}>
                Return License
              </button>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a license from the table to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}