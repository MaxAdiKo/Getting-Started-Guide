import React from 'react';
import { LicenseDataService } from '../services/LicenseDataService.js';
import './LicensesTable.css';

export default function LicensesTable({ navigate }) {
  const handleSeeAll = () => {
    navigate('license-center/licenses');
  };

  // Dynamische Daten aus dem Service holen - nur erste 2 für Homepage
  const licenses = LicenseDataService.getHomepageLicenses(2);

  return (
    <section className="licenses-section">
      <div className="section-header">
        <h2 className="section-title">Licenses</h2>
        <button className="see-all-btn" onClick={handleSeeAll}>
          SEE ALL
        </button>
      </div>
      
      <div className="table-container">
        <table className="licenses-table">
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
            {licenses.map((license, index) => (
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
    </section>
  );
}