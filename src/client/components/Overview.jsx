import React from 'react';
import licenseDataService from '../services/LicenseDataService.js';
import './Overview.css';

export default function Overview({ navigate }) {
  const BarChart = ({ data }) => (
    <div className="mini-chart">
      {data.map((value, index) => (
        <div
          key={index}
          className="chart-bar"
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  );

  const DonutChart = () => {
    const size = 160;
    const strokeWidth = 28;    
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
  
    return (
      <div className="donut-chart">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient
              id="gradientFull"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B3FCB" />
              <stop offset="100%" stopColor="#C9CCF7" />
            </linearGradient>
          </defs>
  
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#gradientFull)"
            strokeWidth={strokeWidth}
          />
        </svg>
  
        <div className="chart-center">
          <span className="chart-percentage">75%</span>
        </div>
      </div>
    );
  };

  const handleCostCardClick = () => {
    navigate('license-center/cost');
  };

  const handleLicensesCardClick = () => {
    navigate('license-center/licenses');
  };

  // Dynamische Daten aus dem Service holen
  const totalCost = LicenseDataService.getTotalCostFormatted();
  const licenseCount = LicenseDataService.getLicenseCount();
  const costGrowth = LicenseDataService.getCostGrowth();

  return (
    <section className="overview">
      <div className="overview-left">
        <div className="overview-card clickable-card" onClick={handleCostCardClick}>
          <div className="card-content">
            <div className="card-info">
              <h3 className="card-label">Cost</h3>
              <div className="card-value">{totalCost}</div>
              <div className="card-subtext">November 2025</div>
            </div>
            <BarChart data={[60, 80, 45, 90, 75]} />
          </div>
        </div>
        
        <div className="overview-card clickable-card" onClick={handleLicensesCardClick}>
          <div className="card-content">
            <div className="card-info">
              <h3 className="card-label">Total Licenses</h3>
              <div className="card-value">{licenseCount}</div>
              <div className="card-subtext">September 2025</div>
            </div>
            <BarChart data={[40, 70, 55, 85, 60]} />
          </div>
        </div>
      </div>
      
      <div className="overview-right">
        <div className="overview-card large-card">
          <DonutChart />
          <div className="cost-effectiveness">
            <h3>Cost effectiveness</h3>
          </div>
        </div>
      </div>
    </section>
  );
}