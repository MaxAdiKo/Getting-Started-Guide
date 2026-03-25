// Zentrale Datenquelle für alle Lizenzen
export const licensesData = [
  { id: '#123461', name: 'Microsoft 365 Business Premium', date: 'Sep 16, 2025', status: 'Active', cost: 299.99 },
  { id: '#123462', name: 'Adobe Creative Suite', date: 'Sep 16, 2025', status: 'Active', cost: 749.99 },
  { id: '#123463', name: 'Slack Premium', date: 'Aug 22, 2025', status: 'Active', cost: 89.99 },
  { id: '#123464', name: 'Zoom Pro', date: 'Jul 15, 2025', status: 'Active', cost: 149.90 },
  { id: '#123465', name: 'Figma Professional', date: 'Oct 3, 2025', status: 'Active', cost: 144.00 },
  { id: '#123466', name: 'Notion Pro', date: 'Sep 5, 2025', status: 'Active', cost: 96.00 },
  { id: '#123467', name: 'JetBrains IntelliJ IDEA', date: 'Aug 18, 2025', status: 'Active', cost: 599.00 },
  { id: '#123468', name: 'Atlassian Jira Software', date: 'Sep 12, 2025', status: 'Active', cost: 210.00 },
  { id: '#123469', name: 'GitHub Enterprise', date: 'Jul 28, 2025', status: 'Active', cost: 252.00 },
  { id: '#123470', name: 'Docker Pro', date: 'Aug 31, 2025', status: 'Active', cost: 60.00 },
  { id: '#123471', name: 'Salesforce Professional', date: 'Sep 1, 2025', status: 'Active', cost: 900.00 },
  { id: '#123472', name: 'Tableau Desktop', date: 'Aug 10, 2025', status: 'Active', cost: 840.00 },
  { id: '#123473', name: 'Microsoft Project Professional', date: 'Sep 20, 2025', status: 'Active', cost: 329.99 },
  { id: '#123474', name: 'Autodesk AutoCAD', date: 'Jul 5, 2025', status: 'Active', cost: 1620.00 },
  { id: '#123475', name: 'VMware vSphere', date: 'Aug 25, 2025', status: 'Active', cost: 2875.00 }
];

export class LicenseDataService {
  static getAllLicenses() {
    return licensesData.map(license => ({
      ...license,
      cost: `$${license.cost.toFixed(2)}` // Format für Anzeige
    }));
  }

  static getLicenseCount() {
    return licensesData.length;
  }

  static getTotalCost() {
    return licensesData.reduce((sum, license) => sum + license.cost, 0);
  }

  static getTotalCostFormatted() {
    return `$${this.getTotalCost().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Für License Return Page - Raw Daten mit numerischen Kosten
  static getLicensesForReturn() {
    return licensesData.map(license => ({
      id: license.id,
      software: license.name,
      status: license.status,
      price: `$${license.cost.toFixed(2)}`
    }));
  }

  // Für Homepage Table - nur eine Auswahl anzeigen
  static getHomepageLicenses(limit = 2) {
    return this.getAllLicenses().slice(0, limit);
  }

  // Monatsweise Kostenaufschlüsselung für Charts
  static getMonthlyCosts() {
    const totalCost = this.getTotalCost();
    // Simuliere monatliche Verteilung basierend auf tatsächlichen Kosten
    return [
      { month: 'Aug', value: Math.round(totalCost * 0.75) },
      { month: 'Sep', value: Math.round(totalCost * 0.95) },
      { month: 'Oct', value: Math.round(totalCost * 0.85) },
      { month: 'Nov', value: Math.round(totalCost) },
      { month: 'Dec', value: Math.round(totalCost * 1.05) }
    ];
  }

  // Für Line Chart
  static getLineChartData() {
    const baseCost = this.getTotalCost() / 100; // Skalierung für Chart
    return {
      main: [
        Math.round(baseCost * 0.45),
        Math.round(baseCost * 0.52),
        Math.round(baseCost * 0.48),
        Math.round(baseCost * 0.65),
        Math.round(baseCost * 0.59),
        Math.round(baseCost * 0.73)
      ],
      comparison: [
        Math.round(baseCost * 0.38),
        Math.round(baseCost * 0.45),
        Math.round(baseCost * 0.42),
        Math.round(baseCost * 0.58),
        Math.round(baseCost * 0.52),
        Math.round(baseCost * 0.65)
      ]
    };
  }

  // Berechne Wachstum basierend auf den letzten beiden Monaten
  static getCostGrowth() {
    const monthlyCosts = this.getMonthlyCosts();
    const currentMonth = monthlyCosts[monthlyCosts.length - 2]; // Nov
    const previousMonth = monthlyCosts[monthlyCosts.length - 3]; // Oct
    const growth = ((currentMonth.value - previousMonth.value) / previousMonth.value) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(0)}%`;
  }
}