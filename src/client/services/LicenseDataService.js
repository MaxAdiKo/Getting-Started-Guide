// Hilfsfunktion für Cookie lesen (außerhalb der Klasse)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : '';
}

export class LicenseDataService {

  static async _fetchFromServiceNow() {
    const token = window.g_ck || getCookie('glide_user_activity');

    const url = '/api/now/table/u_software_license' +
                '?sysparm_fields=u_import_id,u_product,u_employee_id,u_last_used,u_status,u_cost' +
                '&sysparm_limit=1000';

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-UserToken': token
      }
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Nicht eingeloggt oder fehlende Rolle');
      if (response.status === 403) throw new Error('Rolle u_software_license_reader fehlt');
      throw new Error('ServiceNow API error: ' + response.status);
    }

    const data = await response.json();
    return data.result.map(r => ({
      id: (() => {
        const raw = r.u_import_id?.value ?? r.u_import_id ?? '';
        const match = raw.match(/prod_(\S+)/);
        return match ? match[1] : raw;
      })(),
      name:       r.u_product?.display_value   ?? r.u_product     ?? '',
      date:       r.u_last_used?.display_value ?? r.u_last_used   ?? '',
      status:     r.u_status?.display_value    ?? r.u_status      ?? '',
      employeeId: r.u_employee_id?.value       ?? r.u_employee_id ?? '',
      cost: (() => {
        const raw = String(r.u_cost?.value ?? r.u_cost ?? '0');
        const cleaned = raw.replace(/[^0-9.]/g, '');
        return cleaned ? parseFloat(cleaned) : 0;
      })(),
    }));
  }

  static async getAllLicenses() {
    const licenses = await this._fetchFromServiceNow();
    return licenses.map(l => ({ ...l, cost: `$${l.cost.toFixed(2)}` }));
  }

  static async getLicenseCount() {
    const licenses = await this._fetchFromServiceNow();
    return licenses.length;
  }

  static async getTotalCost() {
    const licenses = await this._fetchFromServiceNow();
    return licenses.reduce((sum, l) => sum + l.cost, 0);
  }

  static async getTotalCostFormatted() {
    const total = await this.getTotalCost();
    return `$${total.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  static async getLicensesForReturn() {
    const licenses = await this._fetchFromServiceNow();
    return licenses.map(l => ({ ...l, cost: `$${l.cost.toFixed(2)}` }));
  }

  static async getHomepageLicenses(limit = 2) {
    const licenses = await this.getAllLicenses();
    return licenses.slice(0, limit);
  }

  static async getMonthlyCosts() {
    const totalCost = await this.getTotalCost();
    return [
      { month: 'Aug', value: Math.round(totalCost * 0.75) },
      { month: 'Sep', value: Math.round(totalCost * 0.95) },
      { month: 'Oct', value: Math.round(totalCost * 0.85) },
      { month: 'Nov', value: Math.round(totalCost) },
      { month: 'Dec', value: Math.round(totalCost * 1.05) }
    ];
  }

  static async getLineChartData() {
    const total = await this.getTotalCost();
    const base = total / 100;
    return {
      main:       [0.45, 0.52, 0.48, 0.65, 0.59, 0.73].map(f => Math.round(base * f)),
      comparison: [0.38, 0.45, 0.42, 0.58, 0.52, 0.65].map(f => Math.round(base * f))
    };
  }

  static async getCostGrowth() {
    const monthly = await this.getMonthlyCosts();
    const current  = monthly[monthly.length - 2].value;
    const previous = monthly[monthly.length - 3].value;
    const growth = ((current - previous) / previous) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(0)}%`;
  }
}