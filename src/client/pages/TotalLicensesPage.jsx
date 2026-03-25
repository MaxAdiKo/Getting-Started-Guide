import React from 'react';
import { LicenseDataService } from '../services/LicenseDataService.js';
import './TotalLicensesPage.css';

export default function TotalLicensesPage({ navigate }) {
  const handleBackHome = () => {
    navigate('');
  };

  // Alle Lizenzen aus dem Service holen
  const allLicenses = LicenseDataService.getAllLicenses();
  const totalCost = LicenseDataService.getTotalCost();

  return (
    <div className="total-licenses-page">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackHome}>← Back to License Center</button>
        <div className="header-content">
          <h1>All Licenses</h1>
          <div className="licenses-summary">
            <div className="summary-item">
              <span className="summary-label">Total Licenses</span>
              <span className="summary-value">{allLicenses.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Cost</span>
              <span className="summary-value">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="licenses-container">
        <div className="scrollable-table">
          <table className="all-licenses-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {allLicenses.map((license, index) => (
                <tr key={index} className="table-row">
                  <td className="license-id">{license.id}</td>
                  <td className="license-name">{license.name}</td>
                  <td className="license-date">{license.date}</td>
                  <td>
                    <span className={`status-badge ${license.status.toLowerCase()}`}>
                      {license.status}
                    </span>
                  </td>
                  <td className="license-cost">{license.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}