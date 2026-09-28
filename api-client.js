/**
 * صالون سيد فرست (Sayed First) - .NET Backend API Client Bridge
 * Connects the Frontend (index.html, booking.html, queue-board.html) to the ASP.NET Core Backend & SQL Server
 */

const configuredApiBase = document.querySelector('meta[name="salon-api-base"]')?.content.trim();
const currentHost = window.location.hostname;
const isPrivateNetworkHost = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(currentHost);
const isLocalHost = currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost === '::1' || currentHost.endsWith('.local') || isPrivateNetworkHost;
const apiBaseUrl = (configuredApiBase || (isLocalHost
  ? `${window.location.protocol}//${currentHost}:5000/api`
  : `${window.location.origin}/api`)).replace(/\/+$/, '');

const SalonApi = {
  baseUrl: apiBaseUrl,
  isBackendConnected: false,
  checkInterval: null,

  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);
      let res;
      try {
        res = await fetch(`${this.baseUrl}/health`, { signal: controller.signal });
      } finally {
        clearTimeout(timeoutId);
      }

      if (res.ok) {
        const data = await res.json();
        this.isBackendConnected = (data.database === 'Connected');
        this.updateConnectionUI(true, data);
        return true;
      }
    } catch (e) {
      // Backend not running
    }
    this.isBackendConnected = false;
    this.updateConnectionUI(false);
    return false;
  },

  updateConnectionUI(isConnected, healthData = null) {
    let indicator = document.getElementById('db-connection-pill');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'db-connection-pill';
      indicator.style.cssText = `
        position: fixed;
        bottom: 14px;
        left: 14px;
        z-index: 99999;
        font-family: inherit;
        font-size: 0.78rem;
        padding: 6px 12px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        transition: all 0.3s ease;
        cursor: pointer;
      `;
      document.body.appendChild(indicator);
    }

    if (isConnected) {
      indicator.style.background = 'rgba(16, 185, 129, 0.15)';
      indicator.style.border = '1px solid #10b981';
      indicator.style.color = '#34d399';
      indicator.innerHTML = `<span style="width:8px;height:8px;background:#10b981;border-radius:50%;display:inline-block;animation:pulse 2s infinite;"></span> متصل بـ SQL Server (${healthData?.databaseName || 'SayedFirstSalonDB'})`;
      indicator.title = `الخادم متصل عبر .NET 8 | الاستجابة: ${healthData?.latencyMs || 0}ms`;
    } else {
      indicator.style.background = 'rgba(234, 179, 8, 0.15)';
      indicator.style.border = '1px solid #eab308';
      indicator.style.color = '#fde047';
      indicator.innerHTML = `<span style="width:8px;height:8px;background:#eab308;border-radius:50%;display:inline-block;"></span> وضع التخزين المحلي (Offline)`;
      indicator.title = 'الخادم الخلفي .NET غير قيد التشغيل حالياً - جاري استخدام التخزين المحلي';
    }
  },

  async startHealthMonitoring() {
    await this.checkHealth();
    if (!this.checkInterval) {
      this.checkInterval = setInterval(() => this.checkHealth(), 8000);
    }
  },

  // ==========================================
  // API Calls
  // ==========================================
  async getFullState() {
    try {
      const res = await fetch(`${this.baseUrl}/reports/sync-full`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API getFullState failed, using local storage.');
    }
    return null;
  },

  async bookAppointment(bookingPayload) {
    try {
      const res = await fetch(`${this.baseUrl}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API booking failed, using local fallback:', e);
    }
    return { success: false };
  },

  async createInvoice(invoicePayload) {
    try {
      const res = await fetch(`${this.baseUrl}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoicePayload)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API invoice failed:', e);
    }
    return { success: false };
  },

  async updateChairStatus(chairId, status, clientName, clientPhone) {
    try {
      await fetch(`${this.baseUrl}/chairs/${chairId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, clientName, clientPhone })
      });
    } catch (e) {}
  },

  async assignChairBarber(chairId, barberId) {
    try {
      await fetch(`${this.baseUrl}/chairs/${chairId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barberId })
      });
    } catch (e) {}
  },

  async createExpense(description, amount) {
    try {
      const res = await fetch(`${this.baseUrl}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: false };
  },

  async addBarber(barber) {
    try {
      const res = await fetch(`${this.baseUrl}/barbers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(barber)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async updateBarber(barber) {
    try {
      const res = await fetch(`${this.baseUrl}/barbers/${barber.barberID || barber.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(barber)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  },

  async deleteBarber(barberId) {
    try {
      await fetch(`${this.baseUrl}/barbers/${barberId}`, { method: 'DELETE' });
    } catch (e) {}
  },

  async addCustomer(customer) {
    try {
      const res = await fetch(`${this.baseUrl}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: customer.name || customer.fullName,
          phone: customer.phone,
          notes: customer.notes || ''
        })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: false };
  }
};

window.SalonApi = SalonApi;

// Automatically start monitoring backend health when page loads
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.SalonApi.startHealthMonitoring();
  });
}
