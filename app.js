/**
 * صالون يوسف فريست (Youssef First) - Barbershop Reception & POS System
 * Core Application Engine & State Management
 */

// ==========================================
// 1. Initial State & Seed Data
// ==========================================
const STORAGE_KEY = 'barbershop_data_v1';

const DEFAULT_DATA = {
  settings: {
    shopName: 'صالون يوسف فريست',
    shopPhone: '01032232541',
    shopAddress: 'الفيوم - سنهور القبلية - ميدان المفارق أول طريق مركز سنورس',
    currency: 'ج.م',
    receiptFooter: 'شكراً لزيارتكم! نتمنى لكم مظهراً دائماً أنيقاً وجذاباً.',
    soundEnabled: true,
    adminPin: '1234',
    currentRole: 'admin',
    isLocked: false,
    loyaltyVisitThreshold: 5,
    loyaltyDiscountPercent: 10
  },
  shift: {
    isOpen: true,
    cashier: 'حسام حارس',
    startedAt: new Date().toISOString(),
    openingBalance: 500
  },
  shiftClosings: [],
  barbers: [
    {
      id: 1,
      name: 'زياد السيسي',
      phone: '01011112222',
      chairId: 1,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'ماستر باربر - قصات حديثة وفيد',
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    },
    {
      id: 2,
      name: 'محمد سعيد',
      phone: '01022223333',
      chairId: 2,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'أخصائي تصفيف وتلوين اللحية',
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    },
    {
      id: 3,
      name: 'محمد الجرداوي',
      phone: '01033334444',
      chairId: 3,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'خبير عناية بالبشرة وحمام بخار',
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    },
    {
      id: 4,
      name: 'ايسا',
      phone: '01044445555',
      chairId: 4,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'مصفف بروتين وعلاجات الشعر',
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    },
    {
      id: 5,
      name: 'يوسف النينجا',
      phone: '01055556666',
      chairId: 5,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'أخصائي قصات حديثة وسكين فيد',
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    },
    {
      id: 6,
      name: 'يوسف فرست',
      phone: '01066667777',
      chairId: 6,
      commissionRate: 0,
      avatar: 'assets/logo.jpg',
      title: 'سينيور باربر (Senior Barber) • خبرة وإتقان',
      isMaster: true,
      todayClients: 0,
      todayRevenue: 0,
      status: 'active'
    }
  ],
  chairs: [
    {
      id: 1,
      name: 'كرسي 1 (زياد السيسي)',
      barberId: 1,
      status: 'available',
      currentClient: null
    },
    {
      id: 2,
      name: 'كرسي 2 (محمد سعيد)',
      barberId: 2,
      status: 'available',
      currentClient: null
    },
    {
      id: 3,
      name: 'كرسي 3 (محمد الجرداوي)',
      barberId: 3,
      status: 'available',
      currentClient: null
    },
    {
      id: 4,
      name: 'كرسي 4 (ايسا)',
      barberId: 4,
      status: 'available',
      currentClient: null
    },
    {
      id: 5,
      name: 'كرسي 5 (يوسف النينجا)',
      barberId: 5,
      status: 'available',
      currentClient: null
    },
    {
      id: 6,
      name: 'كرسي 6 (يوسف فرست)',
      barberId: 6,
      status: 'available',
      isMaster: true,
      currentClient: null
    }
  ],
  services: [
    { id: 1001, name: 'قص شعر', category: 'شعر', price: 150, duration: 30, icon: 'fa-scissors' },
    { id: 1002, name: 'ماسك', category: 'عناية', price: 20, duration: 30, icon: 'fa-spa' },
    { id: 1003, name: 'حلاقة ذقن موس', category: 'لحية', price: 60, duration: 30, icon: 'fa-scissors' },
    { id: 1004, name: 'حلاقة ذقن ماكينة', category: 'لحية', price: 30, duration: 30, icon: 'fa-shop' },
    { id: 1005, name: 'تدريج ذقن', category: 'لحية', price: 70, duration: 30, icon: 'fa-scissors' },
    { id: 1006, name: 'استشوار', category: 'شعر', price: 70, duration: 30, icon: 'fa-wind' },
    { id: 1007, name: 'جلسة سبا عادي', category: 'سبا', price: 100, duration: 30, icon: 'fa-spa' },
    { id: 1008, name: 'جلسة سبا ديتوكس', category: 'سبا', price: 250, duration: 30, icon: 'fa-spa' },
    { id: 1009, name: 'جلسة سبا VIP', category: 'سبا', price: 600, duration: 30, icon: 'fa-crown' },
    { id: 1010, name: 'ساونا', category: 'عناية', price: 250, duration: 30, icon: 'fa-fire' },
    { id: 1011, name: 'مشروب', category: 'إضافات', price: 0, duration: 30, icon: 'fa-glass-water' },
    { id: 1012, name: 'حمام مغربي', category: 'عناية', price: 150, duration: 30, icon: 'fa-spa' },
    { id: 1013, name: 'مانيكير كامل', category: 'عناية', price: 150, duration: 30, icon: 'fa-hand' },
    { id: 1014, name: 'صبغة لون أسود شعر كامل', category: 'شعر', price: 150, duration: 30, icon: 'fa-palette' },
    { id: 1015, name: 'حمام سنفرة', category: 'عناية', price: 350, duration: 30, icon: 'fa-spa' },
    { id: 1016, name: 'واكسي', category: 'عناية', price: 70, duration: 30, icon: 'fa-star' },
    { id: 1017, name: 'فتلة', category: 'عناية', price: 40, duration: 30, icon: 'fa-scissors' },
    { id: 1018, name: 'جلسة بانثينول', category: 'عناية', price: 150, duration: 30, icon: 'fa-bottle-water' },
    { id: 1019, name: 'جلسة النانو', category: 'شعر', price: 170, duration: 30, icon: 'fa-bottle-water' },
    { id: 1020, name: 'كيراتين رجالي', category: 'شعر', price: 100, duration: 30, icon: 'fa-bottle-water' },
    { id: 1021, name: 'قص شعر ودقن ماسك فيس', category: 'باقات', price: 200, duration: 30, icon: 'fa-shop' },
    { id: 1022, name: 'سيشوار صغير', category: 'شعر', price: 180, duration: 30, icon: 'fa-wind' },
    { id: 1023, name: 'بروتين', category: 'شعر', price: 600, duration: 30, icon: 'fa-bottle-water' },
    { id: 1025, name: 'هاي لايت', category: 'شعر', price: 250, duration: 30, icon: 'fa-palette' },
    { id: 1026, name: 'تحديد شعر ودقن ماسك فيس', category: 'باقات', price: 150, duration: 30, icon: 'fa-shop' },
    { id: 1027, name: 'هاي لايت شعر كامل بيبي', category: 'شعر', price: 400, duration: 30, icon: 'fa-palette' },
    { id: 1028, name: 'واكس', category: 'عناية', price: 50, duration: 30, icon: 'fa-star' },
    { id: 1029, name: 'حمام كريم Bio B', category: 'شعر', price: 200, duration: 30, icon: 'fa-bottle-water' },
    { id: 1101, name: 'عرض الملك', category: 'باقات', price: 350, duration: 60, icon: 'fa-crown' },
    { id: 1102, name: 'عرض الخميس', category: 'باقات', price: 400, duration: 60, icon: 'fa-gift' },
    { id: 1103, name: 'باكدج العريس مميز', category: 'باقات', price: 900, duration: 60, icon: 'fa-user-tie' },
    { id: 1104, name: 'باكدج العريس خارجي', category: 'باقات', price: 1800, duration: 60, icon: 'fa-user-tie' },
    { id: 1105, name: 'عرض باكدج العريس خارجي', category: 'باقات', price: 2200, duration: 60, icon: 'fa-user-tie' },
    { id: 1106, name: 'عرض الانتعاش', category: 'باقات', price: 300, duration: 60, icon: 'fa-star' },
    { id: 1107, name: 'باقة البرونز', category: 'باقات', price: 250, duration: 60, icon: 'fa-medal' },
    { id: 1108, name: 'VIP باكدج العريس', category: 'باقات', price: 1500, duration: 60, icon: 'fa-crown' }
  ],
  products: [
    { id: 201, name: 'حمام كريم (Hair Cream Bath)', category: 'منتجات', price: 90, cost: 45, stock: 15, icon: 'fa-spa' },
    { id: 202, name: 'سيرم مغذي وملمع للشعر', category: 'منتجات', price: 180, cost: 110, stock: 12, icon: 'fa-bottle-water' },
    { id: 203, name: 'صبغة شعر ولحية احترافية', category: 'منتجات', price: 120, cost: 65, stock: 20, icon: 'fa-palette' },
    { id: 204, name: 'فوم تصفيف وتثبيت (Mousse)', category: 'منتجات', price: 110, cost: 60, stock: 14, icon: 'fa-wind' },
    { id: 205, name: 'سبراي مثبت شعر قوي (Hair Spray)', category: 'منتجات', price: 130, cost: 75, stock: 18, icon: 'fa-star' },
    { id: 206, name: 'كريم شعر (مافيا Mafia)', category: 'منتجات', price: 140, cost: 80, stock: 16, icon: 'fa-shop' },
    { id: 207, name: 'كريم شعر (عادي)', category: 'منتجات', price: 80, cost: 40, stock: 25, icon: 'fa-bottle-water' },
    { id: 208, name: 'شمع تصفيف فاخر (Matte Wax)', category: 'منتجات', price: 160, cost: 95, stock: 15, icon: 'fa-box' }
  ],
  queue: [
    {
      id: 'q_1',
      ticket: 'A-101',
      name: 'أحمد فاروق',
      phone: '01099887711',
      barberId: 1,
      services: ['قص شعر كلاسيكي وتصفيف'],
      isVip: true,
      arrivedAt: new Date(Date.now() - 15 * 60000).toISOString()
    },
    {
      id: 'q_2',
      ticket: 'A-102',
      name: 'سامح إبراهيم',
      phone: '01155443322',
      barberId: 'any',
      services: ['تحديد وتشذيب اللحية بموس ساخن'],
      isVip: false,
      arrivedAt: new Date(Date.now() - 8 * 60000).toISOString()
    },
    {
      id: 'q_3',
      ticket: 'A-103',
      name: 'هيثم مصطفى',
      phone: '01233445566',
      barberId: 2,
      services: ['قص شعر حديث (سكين فيد Fade)'],
      isVip: false,
      arrivedAt: new Date(Date.now() - 3 * 60000).toISOString()
    }
  ],
  appointments: [
    {
      id: 'apt_1',
      name: 'ياسر كمال',
      phone: '01012348899',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      barberId: 1,
      services: 'باقة VIP المتكاملة',
      status: 'confirmed'
    },
    {
      id: 'apt_2',
      name: 'عمرو الشريف',
      phone: '01122998877',
      date: new Date().toISOString().split('T')[0],
      time: '20:30',
      barberId: 3,
      services: 'تنظيف بشرة عميق',
      status: 'confirmed'
    }
  ],
  invoices: [],
  expenses: [],
  customers: [
    {
      id: 'cust_1',
      name: 'محمد عبد الله',
      phone: '01122334455',
      notes: 'يفضل القصة الكلاسيكية مع تشذيب اللحية',
      totalVisits: 8,
      totalSpent: 960,
      loyaltyPoints: 96,
      lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60000).toISOString()
    },
    {
      id: 'cust_2',
      name: 'أحمد فاروق',
      phone: '01099887711',
      notes: 'VIP - يحضر كل أسبوعين',
      totalVisits: 24,
      totalSpent: 4800,
      loyaltyPoints: 480,
      lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60000).toISOString(),
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60000).toISOString()
    },
    {
      id: 'cust_3',
      name: 'طارق حسام',
      phone: '01299887766',
      notes: 'حساس من بعض منتجات العناية',
      totalVisits: 5,
      totalSpent: 750,
      loyaltyPoints: 75,
      lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60000).toISOString()
    }
  ]
};

// ==========================================
// 2. State Controller
// ==========================================
class SalonState {
  constructor() {
    this.data = this.loadData();
    this.ticketCounter = 104;
    this.cart = [];
    this.cartDiscount = 0;
    this.cartPaymentMethod = 'vodafone_cash';
    this.activeView = 'view-chairs';
    this.pendingChairAssign = null; // if transferring client to chair
    this.broadcastChannel = null;
    this.pinBuffer = '';
    this.pinSuccessCallback = null;
    this.splitAmounts = { cash: 0, card: 0, wallet: 0 };

    try {
      this.broadcastChannel = new BroadcastChannel('barbershop_channel');
    } catch (e) {
      console.log('BroadcastChannel unsupported');
    }
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.shiftClosings = Array.isArray(parsed.shiftClosings) ? parsed.shiftClosings : [];
        // Replace only the old built-in demo catalog. Keep any services the salon added itself.
        const oldDemoServices = new Set([
          'قص شعر كلاسيكي وتصفيف', 'قص شعر حديث (سكين فيد Fade)',
          'تحديد وتشذيب اللحية بموس ساخن', 'صبغة وتلوين اللحية والشعر الأبيض',
          'استشوار وغسيل مع مساج فروة الرأس', 'تنظيف بشرة عميق بجهاز البخار',
          'ماسك الذهب الأسود وإزالة الرؤوس السوداء', 'جلسة بروتين وكيراتين برازيلي معالج',
          'باقة VIP المتكاملة (شعر + لحية + بخار + ماسك)', 'باقة العريس الملكية الخاصة'
        ]);
        if (parsed._realCatalogVersion !== 'sayed_first_photo_catalog_v1') {
          const savedServices = Array.isArray(parsed.services) ? parsed.services : [];
          parsed.services = savedServices.filter(s => !oldDemoServices.has(s.name));
          DEFAULT_DATA.services.forEach(realService => {
            const existingIdx = parsed.services.findIndex(s => s.name === realService.name);
            if (existingIdx >= 0) {
              parsed.services[existingIdx] = { ...parsed.services[existingIdx], ...realService, id: parsed.services[existingIdx].id };
            } else {
              parsed.services.push(JSON.parse(JSON.stringify(realService)));
            }
          });
          parsed._realCatalogVersion = 'sayed_first_photo_catalog_v1';
        }

        if (parsed.settings) {
          if (typeof parsed.settings.shopName === 'string' && parsed.settings.shopName.includes('سيد فرست')) {
            parsed.settings.shopName = parsed.settings.shopName.replaceAll('سيد فرست', 'يوسف فريست').replaceAll('Sayed First', 'Youssef First');
          }
          parsed.settings.loyaltyVisitThreshold = Math.max(1, Number(parsed.settings.loyaltyVisitThreshold) || 5);
          parsed.settings.loyaltyDiscountPercent = Math.min(100, Math.max(1, Number(parsed.settings.loyaltyDiscountPercent) || 10));
          if (!parsed.settings.shopName || parsed.settings.shopName.includes('الراقي') || parsed.settings.shopName.includes('Golden Blade')) {
            parsed.settings.shopName = 'صالون يوسف فريست (Youssef First)';
          }
          if (!parsed.settings.shopAddress || parsed.settings.shopAddress.includes('التحرير') || parsed.settings.shopAddress.includes('وسط البلد')) {
            parsed.settings.shopAddress = 'الفيوم - سنهور القبلية - ميدان المفارق أول طريق مركز سنورس';
          }
          if (!parsed.settings.shopPhone || parsed.settings.shopPhone === '01023456789' || parsed.settings.shopPhone === '01000000000' || !parsed._shopPhoneUpdated_v1) {
            parsed.settings.shopPhone = '01032232541';
            parsed._shopPhoneUpdated_v1 = true;
          }
          if (!parsed.settings.adminPin) parsed.settings.adminPin = '1234';
          if (!parsed.settings.currentRole) parsed.settings.currentRole = 'admin';
          if (parsed.settings.isLocked === undefined) parsed.settings.isLocked = false;
        }

        // Automatic cashier update to Hossam Hares
        if (!parsed.shift) parsed.shift = { isOpen: true, cashier: 'حسام حارس', openingBalance: 500 };
        if (!parsed.shift.startedAt) parsed.shift.startedAt = new Date().toISOString();
        if (!parsed.shift.cashier || parsed.shift.cashier.includes('أحمد') || parsed.shift.cashier === 'الاستقبال') {
          parsed.shift.cashier = 'حسام حارس';
        }

        // Automatic team update for the official 6 team members including Senior Barber (Youssef First)
        const hasOldSeed = !parsed._teamVersion || parsed._teamVersion !== 'team_sayed_first_v5_senior' ||
          (parsed.barbers && parsed.barbers.some(b => b.name === 'كريم هاني' || b.name === 'عمر فتحي')) ||
          (parsed.chairs && !parsed.chairs.some(c => c.id === 6)) ||
          (parsed.barbers && !parsed.barbers.some(b => b.id === 6 || (b.name && b.name.includes('يوسف فرست'))));
        
        if (hasOldSeed) {
          parsed._teamVersion = 'team_sayed_first_v5_senior';
          
          if (!parsed.barbers || parsed.barbers.length === 0) {
            parsed.barbers = JSON.parse(JSON.stringify(DEFAULT_DATA.barbers));
          } else {
            // Ensure Barber 6 (يوسف فرست) is present and flagged as Master
            const youssefBarber = DEFAULT_DATA.barbers.find(b => b.id === 6);
            const bIdx = parsed.barbers.findIndex(b => b.id === 6 || (b.name && b.name.includes('يوسف فرست')));
            if (bIdx !== -1) {
              parsed.barbers[bIdx] = { ...parsed.barbers[bIdx], ...youssefBarber };
            } else {
              parsed.barbers.push(JSON.parse(JSON.stringify(youssefBarber)));
            }
          }

          if (!parsed.chairs || parsed.chairs.length === 0) {
            parsed.chairs = JSON.parse(JSON.stringify(DEFAULT_DATA.chairs));
          } else {
            // Ensure Chair 6 is present and marked as Master
            const youssefChair = DEFAULT_DATA.chairs.find(c => c.id === 6);
            const cIdx = parsed.chairs.findIndex(c => c.id === 6);
            if (cIdx !== -1) {
              parsed.chairs[cIdx] = { ...parsed.chairs[cIdx], ...youssefChair };
            } else {
              parsed.chairs.push(JSON.parse(JSON.stringify(youssefChair)));
            }
            parsed.chairs.sort((a, b) => a.id - b.id);
          }
        }

        // Automatic inventory update to include user's initial products
        const hasOldInventory = !parsed._inventoryVersion || parsed._inventoryVersion !== 'inv_sayed_first_v2' ||
          !parsed.products || !parsed.products.some(p => p.name.includes('مافيا'));

        if (hasOldInventory) {
          parsed._inventoryVersion = 'inv_sayed_first_v2';
          if (!parsed.products || parsed.products.length === 0) {
            parsed.products = JSON.parse(JSON.stringify(DEFAULT_DATA.products));
          } else {
            // Ensure each requested product exists
            DEFAULT_DATA.products.forEach(defP => {
              const existingIdx = parsed.products.findIndex(p => p.id === defP.id || p.name.includes(defP.name.split(' ')[0]));
              if (existingIdx !== -1) {
                parsed.products[existingIdx] = { ...defP, ...parsed.products[existingIdx] };
              } else {
                parsed.products.push(JSON.parse(JSON.stringify(defP)));
              }
            });
          }
        }

        // Ensure 100% of revenue belongs to the salon (commissionRate = 0 for all barbers)
        if (parsed.barbers && Array.isArray(parsed.barbers)) {
          parsed.barbers.forEach(b => {
            b.commissionRate = 0;
          });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return parsed;
      }
    } catch (e) {
      console.error('Error loading stored data:', e);
    }
    this.saveData(DEFAULT_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveData(newData = null) {
    if (newData) this.data = newData;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ type: 'DATA_UPDATED' });
      }
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }

  notifyTV(type, payload) {
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type, payload });
    }
  }
}

const state = new SalonState();

// ==========================================
// 3. Audio & Voice Synthesizer
// ==========================================
const SoundSystem = {
  playChime() {
    if (!state.data.settings.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Web Audio not allowed without user gesture yet');
    }
  },

  playSuccessBeep() {
    if (!state.data.settings.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  },

  playSoftClick() {
    if (!state.data.settings.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  },

  speak(text) {
    if (!state.data.settings.soundEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'ar-SA';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  }
};

// ==========================================
// 4. UI Rendering Functions & Navigation
// ==========================================

// Switch View Tab (Core Navigation)
function switchView(viewId, bypassAuth = false) {
  if (!viewId) return;
  if (!viewId.startsWith('view-')) {
    viewId = 'view-' + viewId;
  }

  // If in Cashier mode, protect financial reports and analytics views with Admin PIN
  const currentRole = state.data.settings?.currentRole || 'admin';
  if (!bypassAuth && currentRole === 'cashier' && (viewId === 'view-reports' || viewId === 'view-analytics')) {
    requireAdminAuth(() => {
      switchView(viewId, true);
    }, viewId === 'view-reports' ? 'الاطلاع على تقارير الخزينة والأرباح' : 'الاطلاع على التحليلات المالية المتقدمة');
    return;
  }

  // 1. Hide all page views and show target view
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // 2. Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkView = link.dataset.view || link.getAttribute('data-view');
    if (linkView === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Update top header heading & subheading
  const viewHeaders = {
    'view-chairs': {
      title: 'إدارة الكراسي والانتظار المباشر',
      subtitle: 'متابعة العملاء على الكراسي وقائمة الانتظار في الوقت الفعلي',
      icon: 'fa-chair'
    },
    'view-pos': {
      title: 'نقطة البيع السريعة والفواتير (POS)',
      subtitle: 'إصدار الفواتير وتحصيل الحساب وطباعة الإيصالات الحرارية',
      icon: 'fa-cash-register'
    },
    'view-appointments': {
      title: 'جدول الحجوزات والمواعيد',
      subtitle: 'إدارة مواعيد العملاء المسبقة ومتابعة حضورهم',
      icon: 'fa-calendar-check'
    },
    'view-barbers': {
      title: 'طاقم العمل والحلاقين',
      subtitle: 'بيانات الحلاقين، الكراسي المخصصة، ومتابعة الإنتاجية',
      icon: 'fa-scissors'
    },
    'view-services': {
      title: 'كتالوج الخدمات ومنتجات العناية',
      subtitle: 'تعديل أسعار الخدمات وإدارة كميات المنتجات بالمخزون',
      icon: 'fa-spray-can'
    },
    'view-reports': {
      title: 'الخزينة والتقارير وتقفيل الوردية',
      subtitle: 'ملخص حركة النقدية، إنتاجية ومبيعات الحلاقين، وسجل الفواتير',
      icon: 'fa-chart-line'
    },
    'view-customers': {
      title: 'قاعدة بيانات العملاء ونقاط الولاء (CRM)',
      subtitle: 'متابعة سجل زيارات الزبائن ورصيد نقاط الولاء وعملاء VIP',
      icon: 'fa-address-book'
    },
    'view-analytics': {
      title: 'التحليلات المتقدمة والأداء',
      subtitle: 'إحصائيات المبيعات، الخدمات الأكثر طلباً، وتوزيع طرق الدفع',
      icon: 'fa-chart-column'
    }
  };

  const headerInfo = viewHeaders[viewId] || {
    title: 'صالون يوسف فريست',
    subtitle: 'نظام إدارة الاستقبال ونقطة البيع',
    icon: 'fa-scissors'
  };

  // Subtle audio click feedback
  SoundSystem.playSoftClick();

  // Top navigation progress bar animation
  const topProgress = document.getElementById('top-nav-progress');
  if (topProgress) {
    topProgress.classList.remove('animating');
    void topProgress.offsetWidth; // trigger reflow
    topProgress.classList.add('animating');
  }

  const pageHeading = document.getElementById('page-heading');
  const pageSubheading = document.getElementById('page-subheading');

  if (pageHeading) {
    pageHeading.classList.remove('heading-animated');
    void pageHeading.offsetWidth;
    pageHeading.innerHTML = `<i class="fa-solid ${headerInfo.icon}" style="color:var(--gold); display:inline-block; animation: headerIconBounce 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);"></i> <span>${headerInfo.title}</span>`;
    pageHeading.classList.add('heading-animated');
  }
  if (pageSubheading) {
    pageSubheading.classList.remove('heading-animated');
    void pageSubheading.offsetWidth;
    pageSubheading.textContent = headerInfo.subtitle;
    pageSubheading.classList.add('heading-animated');
  }

  // 4. Update state active view & trigger specific renders
  state.activeView = viewId;

  try {
    if (viewId === 'view-pos') {
      renderPosCatalog();
      renderPosBarberOptions();
      renderPosCart();
    } else if (viewId === 'view-reports') {
      renderReportsView();
    } else if (viewId === 'view-customers') {
      renderCustomersList();
    } else if (viewId === 'view-analytics') {
      renderAnalyticsCharts();
    } else if (viewId === 'view-appointments') {
      renderAppointments();
    } else if (viewId === 'view-chairs') {
      renderTopMetrics();
      renderChairsGrid();
      renderQueueList();
    } else if (viewId === 'view-barbers') {
      renderBarbersList();
    } else if (viewId === 'view-services') {
      renderServicesTable();
      renderProductsTable();
    }
  } catch (err) {
    console.warn('View render non-fatal warning for ' + viewId + ':', err);
  }

  // Scroll to top of view container smoothly
  const viewContainer = document.querySelector('.page-view-container');
  if (viewContainer) {
    viewContainer.scrollTop = 0;
  }

  // Close mobile sidebar if open
  const sidebar = document.querySelector('.app-sidebar');
  const mobileBackdrop = document.getElementById('sidebar-mobile-backdrop');
  if (sidebar && sidebar.classList.contains('mobile-open')) {
    sidebar.classList.remove('mobile-open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
  }
}

// Modal Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Expose globally for inline HTML event handlers
window.switchView = switchView;
window.openModal = openModal;
window.closeModal = closeModal;

function formatCurrency(amount) {
  const curr = state.data.settings.currency || 'ج.م';
  return `${Number(amount).toLocaleString('ar-EG', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${curr}`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('ar-EG');
}

// Elegant Toast Notification System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: 'fa-circle-check',
    danger: 'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icons[type] || 'fa-bell'}" style="font-size:1.15rem; color:${type === 'success' ? 'var(--success)' : (type === 'danger' ? 'var(--danger)' : (type === 'warning' ? 'var(--warning)' : 'var(--info)'))};"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// Role UI & Atmosphere updates are managed in the unified role controller below

// Update Top Metrics & Clock
function updateClockAndHeader() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' });
  
  const liveTimeEl = document.getElementById('live-time');
  const liveDateEl = document.getElementById('live-date');
  if (liveTimeEl) liveTimeEl.textContent = timeStr;
  if (liveDateEl) liveDateEl.textContent = dateStr;

  // Also update lock screen clock if open
  const lockClock = document.getElementById('lock-screen-clock');
  const lockDate = document.getElementById('lock-screen-date');
  if (lockClock) lockClock.textContent = timeStr;
  if (lockDate) lockDate.textContent = dateStr;
}
setInterval(updateClockAndHeader, 1000);
updateClockAndHeader();

function renderTopMetrics() {
  updateRoleUI();
  const currentRole = state.data.settings?.currentRole || 'admin';
  const isCashier = currentRole === 'cashier';

  const todayInvoices = (state.data.invoices || []).filter(inv => !inv.isVoided);
  const todayRevenue = todayInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = todayInvoices.length + (state.data.chairs.filter(c => c.status === 'busy').length);

  const busyChairs = state.data.chairs.filter(c => c.status === 'busy').length;
  const totalChairs = state.data.chairs.length;
  const waitingCount = (state.data.queue || []).length;

  document.getElementById('stat-today-clients').textContent = formatNumber(totalClients);
  document.getElementById('stat-waiting-now').textContent = formatNumber(waitingCount);
  document.getElementById('stat-chairs-active').textContent = `${formatNumber(busyChairs)} / ${formatNumber(totalChairs)}`;

  // Revenue Metric: Hidden for Cashier (via CSS .admin-only), populated for Admin
  const revEl = document.getElementById('stat-today-revenue');
  const revLabel = document.getElementById('label-today-revenue');
  const revIcon = document.getElementById('icon-today-revenue');

  if (revEl && !isCashier) {
    if (revLabel) revLabel.textContent = 'مبيعات اليوم الإجمالية';
    revEl.textContent = formatCurrency(todayRevenue);
    if (revIcon) revIcon.innerHTML = `<i class="fa-solid fa-coins"></i>`;
  }

  // Badge counts
  document.getElementById('badge-queue-count').textContent = formatNumber(waitingCount);
  document.getElementById('queue-header-count').textContent = formatNumber(waitingCount);

  // Drawer Cash (Supports both single cash and split payments)
  const totalCash = todayInvoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'cash') return sum + inv.total;
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.cash) || 0);
    return sum;
  }, 0);

  const totalExpenses = (state.data.expenses || []).reduce((sum, exp) => sum + exp.amount, 0);
  const openingBalance = state.data.shift.openingBalance || 0;
  const netCashInDrawer = Math.max(0, openingBalance + totalCash - totalExpenses);

  // Sidebar Drawer Cash: Hidden for Cashier, populated for Admin
  const drawerEl = document.getElementById('sidebar-drawer-val');
  const drawerLabel = document.getElementById('sidebar-drawer-label');
  if (drawerEl && !isCashier) {
    drawerEl.textContent = formatCurrency(netCashInDrawer);
    const headerDrawerEl = document.getElementById('header-drawer-val');
    if (headerDrawerEl) headerDrawerEl.textContent = formatCurrency(netCashInDrawer);
    if (drawerLabel) drawerLabel.textContent = 'خزينة النقدية:';
  }

  document.getElementById('chairs-summary-text').textContent = `${formatNumber(busyChairs)} كراسي مشغولة من أصل ${formatNumber(totalChairs)}`;
}

// ------------------------------------------
// View 1: Chairs Grid & Queue List
// ------------------------------------------
function escH(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderChairsGrid() {
  const container = document.getElementById('chairs-container');
  if (!container) return;

  container.innerHTML = state.data.chairs.map(chair => {
    const barber = state.data.barbers.find(b => b.id === chair.barberId) || { name: 'غير محدد', avatar: 'assets/logo.jpg' };
    const isBusy = chair.status === 'busy' && chair.currentClient;
    const isMaster = chair.id === 6 || chair.isMaster || (barber && (barber.isMaster || (barber.name && barber.name.includes('يوسف فرست'))));
    const services = isBusy ? (chair.currentClient.services || ['خدمة عامة']) : [];

    return `
    <article class="c-card ${isBusy ? 'is-busy' : 'is-free'} ${isMaster ? 'is-master' : ''}">
      <header class="c-head">
        <div class="c-title">
          <span class="c-name">${escH(chair.name || ('كرسي رقم ' + chair.id))}</span>
          ${isMaster ? '<span class="c-star"><i class="fa-solid fa-star"></i> سينيور</span>' : ''}
        </div>
        <div class="c-tools">
          <span class="c-state"><i></i>${isBusy ? 'مشغول' : 'متاح'}</span>
          <button class="c-icon" onclick="openEditChairModal(${chair.id})" title="تعديل اسم الكرسي والحلاق المخصص"><i class="fa-solid fa-pen"></i></button>
        </div>
      </header>
      <div class="c-barber"><i class="fa-solid fa-scissors"></i>${escH(barber.name)}</div>
      <div class="c-body">
        ${isBusy ? `
          <div class="c-client">${escH(chair.currentClient.name)}</div>
          <div class="c-tags">${services.map(s => `<span>${escH(s)}</span>`).join('')}</div>
        ` : `<div class="c-empty">جاهز لاستقبال العميل التالي</div>`}
      </div>
      <footer class="c-actions">
        ${isBusy ? `
          <button class="c-btn c-primary" onclick="finishChairService(${chair.id})"><i class="fa-solid fa-cash-register"></i>إنهاء والحساب</button>
          <button class="c-btn" onclick="openTransferChairModal(${chair.id})" title="نقل العميل لكرسي آخر"><i class="fa-solid fa-arrows-rotate"></i>نقل</button>
          <button class="c-btn c-square" onclick="freeUpChairDirectly(${chair.id})" title="تفريغ الكرسي مباشرة بدون دفع"><i class="fa-solid fa-xmark"></i></button>
        ` : `
          <button class="c-btn c-primary" onclick="promptSeatNextClient(${chair.id})"><i class="fa-solid fa-user-plus"></i>إجلاس العميل التالي</button>
        `}
      </footer>
    </article>`;
  }).join('');
}

function renderQueueList() {
  const container = document.getElementById('queue-items-container');
  if (!container) return;

  const queue = state.data.queue || [];
  if (queue.length === 0) {
    container.innerHTML = `
      <div class="q-empty">
        <i class="fa-regular fa-clock"></i>
        <strong>طابور الانتظار فارغ</strong>
        <span>اضغط "تسجيل عميل جديد" لإضافة عميل</span>
      </div>`;
    return;
  }

  container.innerHTML = queue.map((item, idx) => {
    const estWait = (idx + 1) * 15;
    const svc = item.services ? item.services.slice(0, 2).map(escH).join('، ') : '';
    return `
    <div class="q-card ${item.isVip ? 'is-vip' : ''}">
      <div class="q-main">
        <span class="q-no">${escH(item.ticket)}</span>
        <div class="q-info">
          <div class="q-name">${escH(item.name)}${item.isVip ? '<em>VIP</em>' : ''}</div>
          <div class="q-sub">${svc || '&nbsp;'}</div>
        </div>
      <span class="q-eta"><i class="fa-regular fa-hourglass"></i>${formatNumber(estWait)} د</span>
      </div>
      <div class="q-actions">
        <button class="q-btn q-seat" onclick="openAssignChairModal('${item.id}')"><i class="fa-solid fa-chair"></i>إجلاس</button>
        <button class="q-btn" onclick="callQueueClient('${item.id}')" title="نداء صوتي للعميل"><i class="fa-solid fa-bullhorn"></i>نداء</button>
        <button class="q-btn q-square" onclick="postponeQueueClient('${item.id}')" title="تأجيل الدور لآخر الطابور"><i class="fa-solid fa-angles-down"></i></button>
        <button class="q-btn q-square q-del" onclick="removeQueueClient('${item.id}')" title="حذف من الانتظار"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
  }).join('');
}

// ------------------------------------------
// ------------------------------------------
// View 2: POS Catalog & Cart
// ------------------------------------------
let activeCatalogFilter = 'all';

function renderPosCatalog() {
  const container = document.getElementById('pos-items-container');
  if (!container) return;
  container.innerHTML = '';

  const searchVal = (document.getElementById('pos-search')?.value || '').toLowerCase().trim();
  
  // Combine services and products
  let allItems = [
    ...state.data.services.map(s => ({ ...s, itemType: 'service' })),
    ...state.data.products.map(p => ({ ...p, itemType: 'product' }))
  ];

  // Update Category buttons counters
  document.querySelectorAll('.pos-cat-btn').forEach(btn => {
    const cat = btn.dataset.cat;
    let count = 0;
    if (cat === 'all') {
      count = allItems.length;
    } else {
      count = allItems.filter(item => item.category === cat).length;
    }
    const catLabels = {
      'all': 'الكل',
      'شعر': 'قص وتصفيف الشعر',
      'لحية': 'اللحية والذقن',
      'بشرة': 'تنظيف وعناية بالبشرة',
      'باقات': 'باقات VIP كاملة',
      'منتجات': 'منتجات للبيع'
    };
    btn.textContent = `${catLabels[cat] || cat} (${count})`;
  });

  if (activeCatalogFilter !== 'all') {
    allItems = allItems.filter(item => item.category === activeCatalogFilter);
  }

  if (searchVal) {
    allItems = allItems.filter(item => item.name.toLowerCase().includes(searchVal));
  }

  if (allItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-dim); background:#ffffff; border-radius:12px; border:1px dashed #cbd5e1;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:2.2rem; margin-bottom:12px; opacity:0.4; color:var(--gold);"></i>
        <p style="font-size:1rem; font-weight:800; color:var(--text-main);">لا توجد خدمات أو منتجات مطابقة للبحث</p>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">يمكنك استخدام زر "بند مخصص / سعر يدوي" لإدخال أي خدمة إضافية مباشرة!</p>
      </div>
    `;
    return;
  }

  allItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'pos-item-card';
    card.onclick = () => addItemToCart(item);

    const catIcon = item.category === 'منتجات' ? 'fa-box' : 'fa-scissors';
    const catBadge = `<i class="fa-solid ${catIcon}"></i> ${item.category === 'منتجات' ? 'منتج' : item.category}`;
    const itemIcon = /^fa-[a-z0-9-]+$/.test(item.icon || '') ? item.icon : (item.category === 'منتجات' ? 'fa-bottle-water' : 'fa-scissors');

    card.innerHTML = `
      <div>
      <div class="pos-item-top-row">
        <div class="pos-item-icon"><i class="fa-solid ${itemIcon}"></i></div>
        <span class="pos-item-cat-badge">${catBadge}</span>
      </div>
        <div class="pos-item-title">${item.name}</div>
        <div class="pos-item-price">${formatCurrency(item.price)}</div>
      </div>
      <div class="pos-item-add-btn-full">
        <i class="fa-solid fa-cart-plus"></i>
        <span>أضف للفاتورة</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderPosBarberOptions() {
  const select = document.getElementById('pos-barber-select');
  if (select) {
    select.innerHTML = '<option value="">اختر الحلاق المسؤول</option>';
    state.data.barbers.forEach(b => {
      const isMaster = b.id === 6 || b.isMaster || (b.name && b.name.includes('يوسف فرست'));
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = isMaster
        ? ` ${b.name} - سينيور باربر (كرسي ${b.chairId || 6})`
        : `${b.name} (كرسي ${b.chairId || 1})`;
      select.appendChild(opt);
    });
  }

  populatePosActiveClientsDropdown();
}

// Populate Active Clients (From Chairs and Queue) for One-Click POS Billing
function populatePosActiveClientsDropdown() {
  const clientPicker = document.getElementById('pos-active-client-pick');
  if (!clientPicker) return;

  clientPicker.innerHTML = '<option value="">-- اضغط للاختيار من العملاء الحاليين بالصالون --</option>';

  // 1. Clients on chairs
  let hasClients = false;
  state.data.chairs.forEach(chair => {
    if (chair.status === 'busy' && chair.currentClient) {
      hasClients = true;
      const barber = state.data.barbers.find(b => b.id === chair.barberId) || { name: 'حلاق' };
      const opt = document.createElement('option');
      opt.value = JSON.stringify({
        type: 'chair',
        chairId: chair.id,
        name: chair.currentClient.name,
        phone: chair.currentClient.phone || '',
        barberId: chair.barberId,
        services: chair.currentClient.services || []
      });
      opt.textContent = `[كرسي ${chair.id}] ${chair.currentClient.name} (الكابتن ${barber.name})`;
      clientPicker.appendChild(opt);
    }
  });

  // 2. Clients in queue
  (state.data.queue || []).forEach(q => {
    hasClients = true;
    const barber = q.barberId === 'any' ? null : state.data.barbers.find(b => b.id === q.barberId);
    const opt = document.createElement('option');
    opt.value = JSON.stringify({
      type: 'queue',
      queueId: q.id,
      name: q.name,
      phone: q.phone || '',
      barberId: q.barberId === 'any' ? '' : q.barberId,
      services: q.services || []
    });
    opt.textContent = `[طابور #${q.ticket}] ${q.name} ${barber ? `(${barber.name})` : '(أي حلاق)'}`;
    clientPicker.appendChild(opt);
  });

  if (!hasClients) {
    const opt = document.createElement('option');
    opt.value = "";
    opt.disabled = true;
    opt.textContent = "لا يوجد عملاء بالكراسي أو الطابور حالياً";
    clientPicker.appendChild(opt);
  }
}

function updatePosCashCalculator() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = Math.max(0, parseFloat(document.getElementById('cart-discount-input')?.value || 0));
  const tip = Math.max(0, parseFloat(document.getElementById('cart-tip-input')?.value || 0));
  const grandTotal = Math.max(0, subtotal - discount) + tip;

  const cashRecInput = document.getElementById('pos-cash-received');
  const cashChangeEl = document.getElementById('pos-cash-change');
  if (!cashChangeEl) return;

  const cashReceived = parseFloat(cashRecInput?.value || 0);

  if (cashReceived === 0 && (!cashRecInput || !cashRecInput.value)) {
    cashChangeEl.textContent = formatCurrency(0);
    cashChangeEl.style.color = 'var(--text-dim)';
    return;
  }

  const change = cashReceived - grandTotal;
  if (change >= 0) {
    cashChangeEl.textContent = formatCurrency(change);
    cashChangeEl.style.color = 'var(--success)';
  } else {
    cashChangeEl.textContent = `متبقي: ${formatCurrency(Math.abs(change))}`;
    cashChangeEl.style.color = 'var(--danger)';
  }
}

function renderPosCart() {
  const container = document.getElementById('pos-cart-items');
  const btnCheckout = document.getElementById('btn-complete-checkout');
  const btnCheckoutText = document.getElementById('btn-checkout-text');
  const cartBadge = document.getElementById('pos-cart-count-badge');
  const cashCalcBox = document.getElementById('pos-cash-calc-box');
  if (!container) return;

  const totalItemsCount = state.cart.reduce((sum, i) => sum + i.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = `${totalItemsCount} عناصر`;
  }

  // Toggle cash calc box
  if (cashCalcBox) {
    cashCalcBox.style.display = state.cartPaymentMethod === 'cash' ? 'flex' : 'none';
  }

  if (state.cart.length === 0) {
    const discountInput = document.getElementById('cart-discount-input');
    if (discountInput) {
      discountInput.value = '0';
      delete discountInput.dataset.loyaltyReward;
      delete discountInput.dataset.loyaltyCustomerId;
    }
    container.innerHTML = `
      <div class="cart-empty-prompt">
        <i class="fa-solid fa-cart-shopping" style="font-size:2.8rem; color:var(--gold); opacity:0.4;"></i>
        <p style="font-size:0.95rem; font-weight:800; color:var(--text-main);">الفاتورة فارغة حالياً</p>
        <span style="font-size:0.8rem; color:var(--text-muted);">انقر على أي خدمة أو منتج لإضافته، أو استخدم زر "بند مخصص"</span>
      </div>
    `;
    document.getElementById('cart-subtotal').textContent = formatCurrency(0);
    document.getElementById('cart-grand-total').textContent = formatCurrency(0);
    if (btnCheckout) {
      btnCheckout.disabled = true;
      if (btnCheckoutText) btnCheckoutText.textContent = 'اختر خدمات لإصدار الفاتورة';
    }
    updatePosCashCalculator();
    return;
  }

  container.innerHTML = '';
  let subtotal = 0;

  state.cart.forEach((cartItem, idx) => {
    const itemTotal = cartItem.price * cartItem.qty;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${cartItem.name}</div>
        <div class="cart-item-meta">${formatCurrency(cartItem.price)} × ${cartItem.qty} قطعة</div>
      </div>

      <div class="cart-qty-ctrls">
        <button class="btn-qty" onclick="changeCartQty(${idx}, -1)" title="تقليل">-</button>
        <span class="qty-val">${cartItem.qty}</span>
        <button class="btn-qty" onclick="changeCartQty(${idx}, 1)" title="زيادة">+</button>
      </div>

      <div class="cart-item-price-col">${formatCurrency(itemTotal)}</div>

      <button class="btn-cart-remove" onclick="removeCartItem(${idx})" title="حذف البند">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    container.appendChild(row);
  });

  syncLoyaltyDiscount(subtotal);
  const discount = Math.max(0, parseFloat(document.getElementById('cart-discount-input')?.value || 0));
  const tip = Math.max(0, parseFloat(document.getElementById('cart-tip-input')?.value || 0));
  const grandTotal = Math.max(0, subtotal - discount) + tip;

  document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('cart-grand-total').textContent = formatCurrency(grandTotal);

  if (btnCheckout) {
    btnCheckout.disabled = false;
    if (btnCheckoutText) {
      btnCheckoutText.textContent = `دفع وطباعة الفاتورة (${formatCurrency(grandTotal)})`;
    }
  }

  updatePosCashCalculator();
}

function addItemToCart(item) {
  const existing = state.cart.find(ci => ci.id === item.id && ci.itemType === item.itemType);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      itemType: item.itemType,
      qty: 1
    });
  }
  SoundSystem.playSuccessBeep();
  renderPosCart();
}

function changeCartQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  renderPosCart();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  renderPosCart();
}

function normalizeCustomerPhone(phone) {
  return String(phone || '').replace(/\D/g, '').replace(/^20/, '0');
}

function findCustomerByPhone(phone) {
  const normalized = normalizeCustomerPhone(phone);
  if (!normalized) return null;
  return (state.data.customers || []).find(c => normalizeCustomerPhone(c.phone) === normalized) || null;
}

function getLoyaltyReward(customer) {
  if (!customer) return null;
  const visits = Math.max(0, Number(customer.totalVisits) || 0);
  const redeemedAt = Math.max(0, Number(customer.lastLoyaltyRewardVisits) || 0);
  const threshold = Math.max(1, Number(state.data.settings.loyaltyVisitThreshold) || 5);
  if (visits < threshold || visits - redeemedAt < threshold) return null;
  return {
    visits,
    threshold,
    percent: Math.min(100, Math.max(1, Number(state.data.settings.loyaltyDiscountPercent) || 10))
  };
}

function syncLoyaltyDiscount(subtotal) {
  const discountInput = document.getElementById('cart-discount-input');
  const phone = document.getElementById('pos-client-phone')?.value || '';
  if (!discountInput) return;

  const previousReward = Number(discountInput.dataset.loyaltyRewardAmount) || 0;
  const currentDiscount = Math.max(0, Number(discountInput.value) || 0);
  const manualDiscount = previousReward > 0 ? Math.max(0, currentDiscount - previousReward) : currentDiscount;
  const customer = findCustomerByPhone(phone);
  const reward = getLoyaltyReward(customer);

  if (!reward || subtotal <= 0) {
    discountInput.value = String(manualDiscount);
    delete discountInput.dataset.loyaltyRewardAmount;
    delete discountInput.dataset.loyaltyRewardVisits;
    delete discountInput.dataset.loyaltyRewardPhone;
    return;
  }

  const rewardAmount = Math.min(subtotal, Math.round(subtotal * reward.percent / 100));
  discountInput.value = String(manualDiscount + rewardAmount);
  discountInput.dataset.loyaltyRewardAmount = String(rewardAmount);
  discountInput.dataset.loyaltyRewardVisits = String(reward.visits);
  discountInput.dataset.loyaltyRewardPhone = normalizeCustomerPhone(phone);
}

// ------------------------------------------
// View 3: Appointments
// ------------------------------------------
function renderAppointments() {
  const container = document.getElementById('appointments-container');
  if (!container) return;
  container.innerHTML = '';

  const picker = document.getElementById('apt-date-picker');
  const selectedDate = picker ? picker.value : new Date().toISOString().split('T')[0];

  const filtered = (state.data.appointments || []).filter(a => a.date === selectedDate);
  document.getElementById('badge-apt-count').textContent = filtered.length;
  document.getElementById('badge-apt-count').style.display = filtered.length > 0 ? 'inline-block' : 'none';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:50px; color:var(--text-dim);">
        <i class="fa-regular fa-calendar-xmark" style="font-size:2.5rem; margin-bottom:12px; opacity:0.4;"></i>
        <p style="font-size:1.05rem; font-weight:700;">لا توجد حجوزات مسجلة في هذا اليوم</p>
        <span style="font-size:0.85rem; color:var(--text-muted);">انقر على "تسجيل حجز جديد" لإضافة موعد</span>
      </div>
    `;
    return;
  }

  filtered.forEach(apt => {
    const barber = state.data.barbers.find(b => b.id === apt.barberId) || { name: 'أي حلاق' };

    let waButton = '';
    if (apt.phone) {
      let rawPhone = apt.phone.replace(/[^0-9]/g, '');
      if (rawPhone.startsWith('0')) rawPhone = '2' + rawPhone;
      const waMsg = encodeURIComponent(`مرحباً أستاذ ${apt.name}، يسعدنا تذكيركم بموعدكم في ${state.data.settings.shopName} اليوم في تمام الساعة ${apt.time} مع الكابتن ${barber.name}. نتمنى لكم يوماً رائعاً ومظهراً أنيقاً دائماً! `);
      waButton = `
        <a href="https://wa.me/${rawPhone}?text=${waMsg}" target="_blank" class="btn-whatsapp-direct" title="إرسال تذكير واتساب فوري">
          <i class="fa-brands fa-whatsapp"></i> واتساب
        </a>
      `;
    }

    const card = document.createElement('div');
    card.className = 'appointment-card';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="apt-time-badge"><i class="fa-regular fa-clock"></i> ${apt.time}</span>
        <span class="apt-status-pill ${apt.status}">
          ${apt.status === 'confirmed' ? 'حجز مؤكد' : (apt.status === 'arrived' ? 'حضر الصالون' : 'ملغي')}
        </span>
      </div>

      <div>
        <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-main);">${apt.name}</h4>
        <div style="font-size:0.85rem; color:var(--text-muted); font-family:var(--font-latin);">${apt.phone || 'بدون هاتف'}</div>
      </div>

      <div style="font-size:0.85rem; color:var(--gold-light);">
        <i class="fa-solid fa-scissors"></i> الحلاق المطلوب: ${barber.name}
      </div>

      <div style="font-size:0.8rem; color:var(--text-muted);">
        <i class="fa-solid fa-list-check"></i> الخدمات: ${apt.services || 'عامة'}
      </div>

      <div style="display:flex; gap:8px; margin-top:8px; align-items:center; flex-wrap:wrap;">
        ${apt.status === 'confirmed' ? `
          <button class="btn-chair-action btn-chair-assign" onclick="transferAppointmentToQueue('${apt.id}')" style="flex:1;">
            <i class="fa-solid fa-user-check"></i>
            <span>حضر العميل (إدخال للدور)</span>
          </button>
        ` : ''}
        ${waButton}
        <button class="btn-secondary" onclick="deleteAppointment('${apt.id}')" style="padding:6px 10px;" title="إلغاء الحجز">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ------------------------------------------
// View 4: Barbers
// ------------------------------------------
function renderBarbersList() {
  const container = document.getElementById('barbers-container');
  if (!container) return;
  container.innerHTML = '';

  state.data.barbers.forEach(barber => {
    const card = document.createElement('div');
    card.className = 'barber-profile-card';
    card.innerHTML = `
      <h4 class="barber-card-name">${barber.name}</h4>

      <div class="admin-only" style="display:flex; gap:8px; width:100%; margin-top:8px;">
        <button class="btn-primary" style="flex:1; font-size:0.82rem; padding:8px 12px;" onclick="openEditBarberModal(${barber.id})">
          <i class="fa-solid fa-pen-to-square"></i> تعديل البيانات
        </button>
        <button class="btn-danger" style="font-size:0.82rem; padding:8px 12px;" onclick="deleteBarber(${barber.id})" title="حذف الحلاق">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openEditBarberModal(barberId) {
  requireAdminAuth(() => {
    const barber = state.data.barbers.find(b => b.id === barberId);
    if (!barber) return;

    const heading = document.getElementById('modal-barber-heading');
    if (heading) heading.innerHTML = `<i class="fa-solid fa-user-pen"></i> تعديل بيانات الحلاق: ${barber.name}`;

    document.getElementById('barber-edit-id').value = barber.id;
    document.getElementById('barber-input-name').value = barber.name || '';
    document.getElementById('barber-input-phone').value = barber.phone || '';
    document.getElementById('barber-input-chair').value = barber.chairId || 1;
    const commInput = document.getElementById('barber-input-comm');
    if (commInput) commInput.value = '0';
    document.getElementById('barber-input-title').value = barber.title || '';

    openModal('modal-add-barber');
  }, 'تعديل بيانات الحلاق');
}

function deleteBarber(barberId) {
  requireAdminAuth(() => {
    const barber = state.data.barbers.find(b => b.id === barberId);
    if (!barber) return;

    if (state.data.barbers.length <= 1) {
      alert('يجب الإبقاء على حلاق واحد على الأقل في طاقم العمل!');
      return;
    }

    const isBusyOnChair = state.data.chairs.some(c => c.barberId === barberId && c.status === 'busy');
    if (isBusyOnChair) {
      alert(`لا يمكن حذف الحلاق (${barber.name}) حالياً لأنه يباشر عميلاً على أحد الكراسي!`);
      return;
    }

    if (!confirm(`هل أنت متأكد من حذف الحلاق (${barber.name}) من طاقم العمل؟`)) return;

    state.data.barbers = state.data.barbers.filter(b => b.id !== barberId);
    // Unassign from chairs
    state.data.chairs.forEach(c => {
      if (c.barberId === barberId) c.barberId = null;
    });

    if (window.SalonApi && typeof window.SalonApi.deleteBarber === 'function') {
      window.SalonApi.deleteBarber(barberId).catch(() => {});
    }

    state.saveData();
    renderApp();
    showToast(`تم حذف الحلاق (${barber.name}) بنجاح`, 'success');
  }, 'حذف حلاق من الفريق');
}

function openEditChairModal(chairId) {
  const chair = state.data.chairs.find(c => c.id === chairId);
  if (!chair) return;

  const heading = document.getElementById('modal-chair-heading');
  if (heading) heading.innerHTML = `<i class="fa-solid fa-chair"></i> تعديل بيانات ${chair.name || ('كرسي رقم ' + chair.id)}`;
  
  document.getElementById('chair-edit-id').value = chair.id;
  document.getElementById('chair-input-name').value = chair.name || ('كرسي رقم ' + chair.id);

  // Populate barbers select
  const barberSelect = document.getElementById('chair-input-barber');
  if (barberSelect) {
    barberSelect.innerHTML = '<option value="">-- بدون حلاق مخصص (أي حلاق) --</option>' +
      state.data.barbers.map(b => {
        const isM = b.id === 6 || b.isMaster || (b.name && b.name.includes('يوسف فرست'));
        return `<option value="${b.id}" ${b.id === chair.barberId ? 'selected' : ''}>${isM ? ' ' : ''}${b.name} (${b.title || 'حلاق'})</option>`;
      }).join('');
  }

  // Delete button visibility
  const delBtn = document.getElementById('btn-delete-chair');
  if (delBtn) {
    delBtn.style.display = (chair.status !== 'busy' && state.data.chairs.length > 1) ? 'inline-flex' : 'none';
  }

  openModal('modal-edit-chair');
}

function openAddChairModal() {
  const nextId = (state.data.chairs.length > 0 ? Math.max(...state.data.chairs.map(c => c.id)) : 0) + 1;
  const heading = document.getElementById('modal-chair-heading');
  if (heading) heading.innerHTML = `<i class="fa-solid fa-plus"></i> إضافة كرسي صالون جديد`;
  
  document.getElementById('chair-edit-id').value = 'new';
  document.getElementById('chair-input-name').value = `كرسي رقم ${nextId}`;

  const barberSelect = document.getElementById('chair-input-barber');
  if (barberSelect) {
    barberSelect.innerHTML = '<option value="">-- بدون حلاق مخصص (أي حلاق) --</option>' +
      state.data.barbers.map(b => {
        const isM = b.id === 6 || b.isMaster || (b.name && b.name.includes('يوسف فرست'));
        return `<option value="${b.id}">${isM ? ' ' : ''}${b.name} (${b.title || 'حلاق'})</option>`;
      }).join('');
  }

  const delBtn = document.getElementById('btn-delete-chair');
  if (delBtn) delBtn.style.display = 'none';

  openModal('modal-edit-chair');
}

// ------------------------------------------
// View 5: Services & Products
// ------------------------------------------
function renderServicesTable() {
  const tbody = document.getElementById('services-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.data.services.forEach(srv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${srv.name}</strong></td>
      <td><strong style="color:var(--gold-light); font-family:var(--font-latin);">${formatCurrency(srv.price)}</strong></td>
      <td class="admin-only">
        <button class="btn-cart-remove" onclick="deleteCatalogService(${srv.id})" title="حذف الخدمة">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderProductsTable() {
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.data.products.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${prod.name}</strong></td>
      <td><strong style="color:var(--gold-light); font-family:var(--font-latin);">${formatCurrency(prod.price)}</strong></td>
      <td class="admin-only">
        <button class="btn-cart-remove" onclick="deleteCatalogProduct(${prod.id})" title="حذف المنتج">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ------------------------------------------
// View 6: Reports & Register
// ------------------------------------------
function getCurrentShiftWindow() {
  const start = new Date(state.data.shift?.startedAt || Date.now()).getTime();
  const end = Date.now();
  const inWindow = value => {
    const time = new Date(value || 0).getTime();
    return Number.isFinite(time) && time >= start && time <= end;
  };
  return { start, end, inWindow };
}

function buildShiftClosingRecord(notes = '') {
  const closedAt = new Date().toISOString();
  const openedAt = state.data.shift?.startedAt || closedAt;
  const startMs = new Date(openedAt).getTime();
  const endMs = new Date(closedAt).getTime();
  const withinShift = value => {
    const time = new Date(value || 0).getTime();
    return Number.isFinite(time) && time >= startMs && time <= endMs;
  };
  const invoices = (state.data.invoices || []).filter(inv => withinShift(inv.timestamp));
  const activeInvoices = invoices.filter(inv => !inv.isVoided);
  const expenses = (state.data.expenses || []).filter(exp => withinShift(exp.timestamp || exp.createdAt));
  const revenue = activeInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const vodafoneCash = activeInvoices.filter(inv => inv.paymentMethod === 'vodafone_cash').reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
  const cash = activeInvoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'cash') return sum + (Number(inv.total) || 0);
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.cash) || 0);
    return sum;
  }, 0);
  const expenseTotal = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
  const openingBalance = Number(state.data.shift?.openingBalance) || 0;

  return {
    id: `shift_${Date.now()}`,
    cashier: state.data.shift?.cashier || 'الكاشير',
    openedAt,
    closedAt,
    openingBalance,
    revenue,
    vodafoneCash,
    cash,
    expenseTotal,
    netDrawer: Math.max(0, openingBalance + cash - expenseTotal),
    activeInvoiceCount: activeInvoices.length,
    voidedInvoiceCount: invoices.length - activeInvoices.length,
    notes,
    invoices: JSON.parse(JSON.stringify(invoices)),
    expenses: JSON.parse(JSON.stringify(expenses))
  };
}

function closeCurrentShift(notes = '') {
  const record = buildShiftClosingRecord(notes);
  state.data.shiftClosings = Array.isArray(state.data.shiftClosings) ? state.data.shiftClosings : [];
  state.data.shiftClosings.unshift(record);
  state.data.shift = {
    ...(state.data.shift || {}),
    isOpen: true,
    startedAt: record.closedAt,
    openingBalance: record.netDrawer
  };
  state.saveData();
  generateShiftZReport(notes, record);
  renderShiftHistoryTable();
  renderReportsView();
}

function renderShiftHistoryTable() {
  const tbody = document.getElementById('shift-history-table-body');
  if (!tbody) return;
  const records = state.data.shiftClosings || [];
  if (!records.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:18px; color:var(--text-muted);">لسه مفيش ورديات اتقفلت</td></tr>';
    return;
  }
  tbody.innerHTML = records.map(record => `
    <tr>
      <td>${new Date(record.openedAt).toLocaleString('ar-EG')}</td>
      <td>${new Date(record.closedAt).toLocaleString('ar-EG')}</td>
      <td>${record.activeInvoiceCount || 0} نشطة / ${record.voidedInvoiceCount || 0} ملغاة</td>
      <td>${formatCurrency(record.revenue || 0)}</td>
      <td>${formatCurrency(record.vodafoneCash || 0)}</td>
      <td>${formatCurrency(record.expenseTotal || 0)}</td>
      <td>${formatCurrency(record.netDrawer || 0)}</td>
    </tr>`).join('');
}

function exportShiftHistoryToCSV() {
  const records = state.data.shiftClosings || [];
  const invoices = state.data.invoices || [];
  const expenses = state.data.expenses || [];
  if (!records.length && !invoices.length && !expenses.length) {
    showToast('لا توجد حركات لتصديرها حتى الآن', 'warning');
    return;
  }
  const cell = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const rows = [[
    'نوع الحركة', 'رقم الوردية', 'فتح الوردية', 'إغلاق الوردية', 'تاريخ الحركة', 'رقم الفاتورة',
    'العميل', 'الهاتف', 'الحلاق', 'البند', 'سعر الوحدة', 'الكمية', 'قيمة البند',
    'المجموع الفرعي', 'الخصم', 'الإكرامية', 'الإجمالي', 'طريقة الدفع', 'بند المصروف', 'قيمة المصروف',
    'رصيد الافتتاح', 'مبيعات الوردية', 'فودافون كاش', 'إجمالي المصروفات', 'صافي الدرج', 'ملاحظات'
  ]];
  records.forEach(record => rows.push([
    'ملخص وردية', record.id, record.openedAt, record.closedAt, record.closedAt, '', '', '', record.cashier,
    '', '', '', '', '', '', '', '', '', '', '', record.openingBalance, record.revenue,
    record.vodafoneCash, record.expenseTotal, record.netDrawer, record.notes
  ]));

  const shiftForDate = value => {
    const time = new Date(value || 0).getTime();
    const record = records.find(r => time >= new Date(r.openedAt).getTime() && time <= new Date(r.closedAt).getTime());
    if (record) return record;
    const currentStart = new Date(state.data.shift?.startedAt || Date.now()).getTime();
    return time >= currentStart ? { id: 'الوردية الحالية', openedAt: state.data.shift.startedAt, closedAt: '' } : { id: 'قبل تسجيل الورديات', openedAt: '', closedAt: '' };
  };
  invoices.forEach(inv => {
    const shift = shiftForDate(inv.timestamp);
    const items = Array.isArray(inv.items) && inv.items.length ? inv.items : [{ name: '', price: '', qty: '', itemType: '' }];
    items.forEach(item => rows.push([
      inv.isVoided ? 'فاتورة ملغاة' : 'فاتورة', shift.id, shift.openedAt, shift.closedAt, inv.timestamp,
      inv.invoiceNumber, inv.clientName, inv.clientPhone, inv.barberName, item.name, item.price,
      item.qty, Number(item.price || 0) * Number(item.qty || 1), inv.subtotal, inv.discount, inv.tip,
      inv.total, inv.paymentMethod === 'vodafone_cash' ? 'فودافون كاش' : inv.paymentMethod,
      '', '', '', '', '', '', '', ''
    ]));
  });
  expenses.forEach(exp => {
    const date = exp.timestamp || exp.createdAt;
    const shift = shiftForDate(date);
    rows.push(['مصروف', shift.id, shift.openedAt, shift.closedAt, date, '', '', '', '', '', '', '', '', '', '', '', '', '', exp.desc || exp.description, exp.amount, '', '', '', '', '', '']);
  });
  const csv = rows.map(row => row.map(cell).join(',')).join('\r\n');
  downloadCSV(csv, `سجل_الورديات_والحركات_يوسف_فريست_${new Date().toISOString().split('T')[0]}.csv`);
  showToast('تم تصدير سجل الورديات والفواتير والمصروفات إلى Excel', 'success');
}

function renderReportsView() {
  renderShiftHistoryTable();
  const allInvoices = state.data.invoices || [];
  const { inWindow } = getCurrentShiftWindow();
  const activeInvoices = allInvoices.filter(inv => !inv.isVoided && inWindow(inv.timestamp));
  const expenses = (state.data.expenses || []).filter(exp => inWindow(exp.timestamp || exp.createdAt));

  const totalRevenue = activeInvoices.reduce((sum, inv) => sum + inv.total, 0);
  
  // Split payments and single payment handling
  const totalCash = activeInvoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'cash') return sum + inv.total;
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.cash) || 0);
    return sum;
  }, 0);

  const totalDigital = activeInvoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'card' || inv.paymentMethod === 'wallet' || inv.paymentMethod === 'vodafone_cash') return sum + inv.total;
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.card) || 0) + (Number(inv.paymentSplit.wallet) || 0);
    return sum;
  }, 0);

  const totalExp = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const openingBalance = state.data.shift.openingBalance || 0;
  const netCashInDrawer = Math.max(0, openingBalance + totalCash - totalExp);

  document.getElementById('rep-total-revenue').textContent = formatCurrency(totalRevenue);
  document.getElementById('rep-cash-in-drawer').textContent = formatCurrency(netCashInDrawer);
  document.getElementById('rep-digital-payments').textContent = formatCurrency(totalDigital);
  document.getElementById('rep-total-expenses').textContent = formatCurrency(totalExp);

  // Modal close shift values
  document.getElementById('shift-modal-cash').textContent = formatCurrency(netCashInDrawer);
  document.getElementById('shift-modal-digital').textContent = formatCurrency(totalDigital);
  document.getElementById('shift-modal-expenses').textContent = formatCurrency(totalExp);
  const shiftUser = document.getElementById('shift-modal-user');
  if (shiftUser) shiftUser.innerHTML = `<i class="fa-solid fa-user-check" style="color:var(--gold);"></i> ${state.data.shift.cashier || 'الكاشير'}`;

  // Barber Production & Salon Revenue Table (100% to salon)
  const barberTbody = document.getElementById('barber-commissions-table-body');
  if (barberTbody) {
    barberTbody.innerHTML = '';
    state.data.barbers.forEach(barber => {
      const bInvoices = activeInvoices.filter(inv => inv.barberId == barber.id);
      const bClients = bInvoices.length;
      let bServicesTotal = 0;
      let bProductsTotal = 0;
      bInvoices.forEach(inv => {
        if (inv.items && Array.isArray(inv.items)) {
          inv.items.forEach(it => {
            const itemPrice = (it.price || 0) * (it.qty || 1);
            if (it.type === 'product') bProductsTotal += itemPrice;
            else bServicesTotal += itemPrice;
          });
        } else {
          bServicesTotal += (inv.total || 0);
        }
      });
      const bTotalRevenue = bInvoices.reduce((sum, inv) => sum + inv.total, 0);
      const isMaster = barber.id === 6 || barber.isMaster || (barber.name && barber.name.includes('يوسف فرست'));

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${barber.name}</strong> ${isMaster ? '<span style="color:#d97706; font-size:0.78rem; font-weight:700;"> سينيور باربر</span>' : ''}</td>
        <td><span class="badge" style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-subtle); font-size:0.75rem;">كرسي ${barber.chairId || 1}</span></td>
        <td><strong>${bClients}</strong> زبائن</td>
        <td>${formatCurrency(bServicesTotal)}</td>
        <td>${formatCurrency(bProductsTotal)}</td>
        <td style="color:var(--success); font-weight:800; font-size:0.95rem;">${formatCurrency(bTotalRevenue)}</td>
      `;
      barberTbody.appendChild(tr);
    });
  }

  // Invoices Table
  const invTbody = document.getElementById('invoices-table-body');
  if (invTbody) {
    invTbody.innerHTML = '';
    if (allInvoices.length === 0) {
      invTbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-dim);">لا توجد فواتير مسجلة اليوم حتى الآن</td></tr>`;
      return;
    }
    allInvoices.slice().reverse().forEach(inv => {
      const barber = state.data.barbers.find(b => b.id == inv.barberId) || { name: 'عام' };
      let payLabel = '';
      if (inv.paymentMethod === 'cash') payLabel = 'نقدي (كاش)';
      else if (inv.paymentMethod === 'card') payLabel = 'بطاقة / فيزا';
      else if (inv.paymentMethod === 'wallet') payLabel = 'محفظة / إنستاباي';
      else if (inv.paymentMethod === 'vodafone_cash') payLabel = 'فودافون كاش';
      else if (inv.paymentMethod === 'split') payLabel = 'دفع متعدد (Split)';
      else payLabel = 'أخرى';

      const invoiceDate = new Date(inv.timestamp || 0);
      const dateStr = Number.isNaN(invoiceDate.getTime()) ? '—' : invoiceDate.toLocaleDateString('ar-EG');
      const timeStr = Number.isNaN(invoiceDate.getTime()) ? '—' : invoiceDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

      const tr = document.createElement('tr');
      if (inv.isVoided) {
        tr.style.opacity = '0.55';
        tr.style.background = '#fef2f2';
      }

      tr.innerHTML = `
        <td><strong>#${inv.invoiceNumber}</strong> ${inv.isVoided ? '<span style="color:var(--danger); font-size:0.72rem; font-weight:800; display:block;">[ملغاة]</span>' : ''}</td>
        <td>${dateStr}</td>
        <td>${timeStr}</td>
        <td>
          <div style="font-weight:700;">${inv.clientName || 'عميل عام'}</div>
          ${inv.clientPhone ? `<div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-latin);">${inv.clientPhone}</div>` : ''}
        </td>
        <td>
          <div style="font-weight:800; color:var(--text-main);">${barber.name}</div>
        </td>
        <td>${payLabel}</td>
        <td><strong style="color:${inv.isVoided ? 'var(--text-muted)' : 'var(--gold-light)'}; font-family:var(--font-latin); text-decoration:${inv.isVoided ? 'line-through' : 'none'};">${formatCurrency(inv.total)}</strong></td>
        <td>
          <div style="display:flex; gap:6px; align-items:center;">
            <button class="btn-chair-action btn-chair-finish" style="padding:4px 8px; font-size:0.75rem;" onclick="reprintInvoice('${inv.id}')" title="إعادة طباعة">
              <i class="fa-solid fa-print"></i> طباعة
            </button>
            <button class="btn-secondary" style="background:#dcfce7; color:#15803d; border-color:#86efac; padding:4px 8px; font-size:0.75rem;" onclick="sendInvoiceWhatsApp('${inv.id}')" title="إرسال الفاتورة عبر واتساب للعميل">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
            ${!inv.isVoided ? `
              <button class="btn-secondary" style="background:#fee2e2; color:#dc2626; border-color:#fca5a5; padding:4px 8px; font-size:0.75rem;" onclick="promptVoidInvoice('${inv.id}')" title="إلغاء واسترجاع الفاتورة">
                <i class="fa-solid fa-ban"></i>
              </button>
            ` : ''}
          </div>
        </td>
      `;
      invTbody.appendChild(tr);
    });
  }
}

// ------------------------------------------
// Full Render Trigger
// ------------------------------------------
function renderApp() {
  updateRoleUI();
  renderTopMetrics();
  renderChairsGrid();
  renderQueueList();
  renderPosCatalog();
  renderPosBarberOptions();
  renderPosCart();
  renderAppointments();
  renderBarbersList();
  renderServicesTable();
  renderProductsTable();
  renderReportsView();
  renderCustomersList();
  renderAnalyticsCharts();
}

// ==========================================
// CRM: Customer Database
// ==========================================
function renderCustomersList() {
  const container = document.getElementById('customers-container');
  if (!container) return;

  const searchVal = (document.getElementById('crm-search')?.value || '').toLowerCase().trim();
  const loyaltyVisitsInput = document.getElementById('crm-loyalty-visits');
  const loyaltyPercentInput = document.getElementById('crm-loyalty-percent');
  if (loyaltyVisitsInput) loyaltyVisitsInput.value = state.data.settings.loyaltyVisitThreshold || 5;
  if (loyaltyPercentInput) loyaltyPercentInput.value = state.data.settings.loyaltyDiscountPercent || 10;
  let customers = [...(state.data.customers || [])];

  if (searchVal) {
    customers = customers.filter(c =>
      c.name.toLowerCase().includes(searchVal) ||
      (c.phone || '').includes(searchVal)
    );
  }

  // Sort by totalVisits desc
  customers.sort((a, b) => b.totalVisits - a.totalVisits);

  const totalCustomers = state.data.customers?.length || 0;
  const vipCustomers = (state.data.customers || []).filter(c => c.totalVisits >= 10).length;
  const totalLoyalty = (state.data.customers || []).reduce((s, c) => s + (c.loyaltyPoints || 0), 0);

  // Update stats
  const statEl = document.getElementById('crm-total-stat');
  if (statEl) statEl.textContent = formatNumber(totalCustomers);
  const vipEl = document.getElementById('crm-vip-stat');
  if (vipEl) vipEl.textContent = formatNumber(vipCustomers);
  const ptEl = document.getElementById('crm-points-stat');
  if (ptEl) ptEl.textContent = formatNumber(totalLoyalty);

  container.innerHTML = '';

  if (customers.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-dim);">
        <i class="fa-solid fa-users" style="font-size:3rem; opacity:0.25; margin-bottom:14px; color:var(--gold);"></i>
        <p style="font-weight:800; font-size:1.05rem;">لا توجد نتائج للبحث</p>
        <span style="font-size:0.85rem; color:var(--text-muted);">جرب اسماً أو رقماً مختلفاً</span>
      </div>`;
    return;
  }

  customers.forEach(cust => {
    const lastVisitDate = cust.lastVisit
      ? new Date(cust.lastVisit).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'لم يزر بعد';
    const daysSince = cust.lastVisit
      ? Math.floor((Date.now() - new Date(cust.lastVisit).getTime()) / (1000 * 60 * 60 * 24))
      : 9999;
    const isVip = cust.totalVisits >= 10;
    const loyaltyThreshold = Math.max(1, Number(state.data.settings.loyaltyVisitThreshold) || 5);
    const rewardReady = Boolean(getLoyaltyReward(cust));
    const visitsSinceReward = Math.max(0, (Number(cust.totalVisits) || 0) - (Number(cust.lastLoyaltyRewardVisits) || 0));
    const visitsRemaining = Math.max(0, loyaltyThreshold - visitsSinceReward);
    const loyaltyMessage = rewardReady
      ? ` خصم ${state.data.settings.loyaltyDiscountPercent || 10}% جاهز على الفاتورة القادمة`
      : `باقي ${visitsRemaining} زيارة للخصم`;
    const tierColor = isVip ? 'var(--gold)' : (cust.totalVisits >= 5 ? 'var(--info)' : 'var(--text-muted)');
    const tierLabel = isVip ? ' VIP' : (cust.totalVisits >= 5 ? ' منتظم' : ' جديد');
    const statusColor = daysSince <= 14 ? 'var(--success)' : (daysSince <= 30 ? 'var(--warning)' : 'var(--danger)');

    const card = document.createElement('div');
    card.className = 'customer-card';
    card.innerHTML = `
      <div class="customer-card-header">
        <div class="customer-avatar">${cust.name.charAt(0)}</div>
        <div class="customer-info">
          <h4>${cust.name} <span style="font-size:0.75rem; color:${tierColor}; font-weight:800;">${tierLabel}</span></h4>
          <div style="font-size:0.82rem; color:var(--text-muted); font-family:var(--font-latin);">${cust.phone || 'بدون هاتف'}</div>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn-icon-header" onclick="openEditCustomerModal('${cust.id}')" title="تعديل" style="width:32px; height:32px; font-size:0.8rem;">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-icon-header" onclick="addCustomerToQueue('${cust.id}')" title="إضافة للطابور" style="width:32px; height:32px; font-size:0.8rem; background:var(--gold); color:#fff;">
            <i class="fa-solid fa-chair"></i>
          </button>
        </div>
      </div>

      ${cust.notes ? `<div style="font-size:0.8rem; color:var(--text-muted); background:var(--bg-input); padding:6px 10px; border-radius:8px; margin-bottom:10px; border-right:3px solid var(--gold);"><i class="fa-solid fa-note-sticky" style="color:var(--gold);"></i> ${cust.notes}</div>` : ''}

      <div class="customer-stats-row">
        <div class="customer-stat">
          <span class="cstat-val">${cust.totalVisits}</span>
          <span class="cstat-lbl">زيارة</span>
        </div>
        <div class="customer-stat">
          <span class="cstat-val">${formatCurrency(cust.totalSpent || 0)}</span>
          <span class="cstat-lbl">إجمالي الإنفاق</span>
        </div>
        <div class="customer-stat" style="border-color:var(--gold);">
          <span class="cstat-val" style="color:var(--gold);"> ${cust.loyaltyPoints || 0}</span>
          <span class="cstat-lbl">نقطة ولاء</span>
        </div>
      </div>

      <div class="customer-loyalty-progress ${rewardReady ? 'is-ready' : ''}">${loyaltyMessage}</div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px; font-size:0.78rem; color:var(--text-muted);">
        <span><i class="fa-regular fa-calendar"></i> آخر زيارة: ${lastVisitDate}</span>
        <span style="color:${statusColor}; font-weight:800;">${daysSince === 9999 ? '' : (daysSince === 0 ? ' اليوم' : (daysSince <= 7 ? ` منذ ${daysSince} أيام` : (daysSince <= 30 ? ` منذ ${daysSince} يوم` : ` منذ ${daysSince} يوم`)))}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function openAddCustomerModal() {
  document.getElementById('crm-modal-title').textContent = 'إضافة عميل جديد';
  document.getElementById('crm-input-id').value = '';
  document.getElementById('crm-input-name').value = '';
  document.getElementById('crm-input-phone').value = '';
  document.getElementById('crm-input-notes').value = '';
  document.getElementById('crm-input-points').value = '0';
  openModal('modal-add-customer-crm');
}

function openEditCustomerModal(customerId) {
  const cust = (state.data.customers || []).find(c => c.id === customerId);
  if (!cust) return;
  document.getElementById('crm-modal-title').textContent = 'تعديل بيانات العميل';
  document.getElementById('crm-input-id').value = cust.id;
  document.getElementById('crm-input-name').value = cust.name;
  document.getElementById('crm-input-phone').value = cust.phone || '';
  document.getElementById('crm-input-notes').value = cust.notes || '';
  document.getElementById('crm-input-points').value = cust.loyaltyPoints || 0;
  openModal('modal-add-customer-crm');
}

function saveCustomerCRM() {
  if (!state.data.customers) state.data.customers = [];
  const id = document.getElementById('crm-input-id').value;
  const name = document.getElementById('crm-input-name').value.trim();
  const phone = document.getElementById('crm-input-phone').value.trim();
  const notes = document.getElementById('crm-input-notes').value.trim();
  const points = parseInt(document.getElementById('crm-input-points').value) || 0;

  if (!name) { alert('يرجى إدخال اسم العميل'); return; }

  if (id) {
    // Edit existing
    const cust = state.data.customers.find(c => c.id === id);
    if (cust) {
      cust.name = name;
      cust.phone = phone;
      cust.notes = notes;
      cust.loyaltyPoints = points;
    }
  } else {
    // Add new
    state.data.customers.push({
      id: 'cust_' + Date.now(),
      name, phone, notes,
      totalVisits: 0,
      totalSpent: 0,
      loyaltyPoints: points,
      lastVisit: null,
      createdAt: new Date().toISOString()
    });
  }

  // Sync customer to SQL Server Backend
  if (window.SalonApi && typeof window.SalonApi.addCustomer === 'function' && phone) {
    window.SalonApi.addCustomer({ name, phone, notes }).catch(() => {});
  }

  state.saveData();
  renderApp();
  closeModal('modal-add-customer-crm');
}

function deleteCustomer(customerId) {
  if (!confirm('هل تريد حذف هذا العميل من قاعدة البيانات؟')) return;
  state.data.customers = (state.data.customers || []).filter(c => c.id !== customerId);
  state.saveData();
  renderApp();
}

function addCustomerToQueue(customerId) {
  const cust = (state.data.customers || []).find(c => c.id === customerId);
  if (!cust) return;
  // Pre-fill the queue modal
  document.getElementById('queue-input-name').value = cust.name;
  document.getElementById('queue-input-phone').value = cust.phone || '';
  if (cust.totalVisits >= 10) {
    document.getElementById('queue-input-vip').checked = true;
  }
  openModal('modal-add-customer');
  // Switch to chairs view
  switchView('view-chairs');
}

// Update customer record on checkout
function updateCustomerOnCheckout(clientName, clientPhone, amount, redeemedRewardVisits = 0) {
  if (!state.data.customers) state.data.customers = [];
  let cust = findCustomerByPhone(clientPhone);
  if (!cust && clientName && clientName !== 'عميل عام') {
    cust = state.data.customers.find(c =>
      c.name.trim() === clientName.trim()
    );
  }
  if (cust) {
    if (redeemedRewardVisits && Number(cust.totalVisits) === Number(redeemedRewardVisits)) {
      cust.lastLoyaltyRewardVisits = Number(redeemedRewardVisits);
    }
    cust.totalVisits = (cust.totalVisits || 0) + 1;
    cust.totalSpent = (cust.totalSpent || 0) + amount;
    cust.loyaltyPoints = Math.floor((cust.totalSpent) / 10); // 1 point per 10 EGP
    cust.lastVisit = new Date().toISOString();
  }
}

// ==========================================
// Analytics Charts (CSS-based)
// ==========================================
function renderAnalyticsCharts() {
  const chartContainer = document.getElementById('analytics-services-chart');
  if (!chartContainer) return;

  const invoices = state.data.invoices || [];
  if (invoices.length === 0) {
    chartContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-dim); font-size:0.9rem;"><i class="fa-solid fa-chart-bar" style="font-size:2rem; opacity:0.3; display:block; margin-bottom:8px;"></i>لا توجد مبيعات بعد</div>`;
    return;
  }

  // Count service sales
  const serviceCounts = {};
  invoices.forEach(inv => {
    (inv.items || []).forEach(item => {
      if (!serviceCounts[item.name]) serviceCounts[item.name] = { count: 0, revenue: 0 };
      serviceCounts[item.name].count += item.qty;
      serviceCounts[item.name].revenue += item.price * item.qty;
    });
  });

  const sorted = Object.entries(serviceCounts)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 6);

  if (sorted.length === 0) {
    chartContainer.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-dim);">لا توجد بيانات كافية</div>`;
    return;
  }

  const maxRevenue = sorted[0][1].revenue;

  chartContainer.innerHTML = sorted.map(([name, data]) => {
    const pct = Math.round((data.revenue / maxRevenue) * 100);
    return `
      <div class="analytics-bar-row">
        <div class="analytics-bar-label" title="${name}">${name.length > 22 ? name.substring(0, 22) + '...' : name}</div>
        <div class="analytics-bar-track">
          <div class="analytics-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="analytics-bar-val">${formatCurrency(data.revenue)}</div>
      </div>
    `;
  }).join('');

  // Payment method donut
  const totalCash = invoices.filter(i => i.paymentMethod === 'cash').reduce((s, i) => s + i.total, 0);
  const totalCard = invoices.filter(i => i.paymentMethod === 'card').reduce((s, i) => s + i.total, 0);
  const totalWallet = invoices.filter(i => i.paymentMethod === 'wallet' || i.paymentMethod === 'vodafone_cash').reduce((s, i) => s + i.total, 0);
  const grandTotal = totalCash + totalCard + totalWallet || 1;

  const payChartEl = document.getElementById('analytics-payment-chart');
  if (payChartEl) {
    payChartEl.innerHTML = `
      <div class="pay-method-bar-row">
        <div class="pay-method-label"><i class="fa-solid fa-money-bill-wave" style="color:var(--success);"></i> نقدي</div>
        <div class="analytics-bar-track" style="flex:1;">
          <div class="analytics-bar-fill" style="width:${Math.round(totalCash/grandTotal*100)}%; background:var(--success);"></div>
        </div>
        <div class="analytics-bar-val">${Math.round(totalCash/grandTotal*100)}%</div>
      </div>
      <div class="pay-method-bar-row">
        <div class="pay-method-label"><i class="fa-solid fa-credit-card" style="color:var(--info);"></i> فيزا</div>
        <div class="analytics-bar-track" style="flex:1;">
          <div class="analytics-bar-fill" style="width:${Math.round(totalCard/grandTotal*100)}%; background:var(--info);"></div>
        </div>
        <div class="analytics-bar-val">${Math.round(totalCard/grandTotal*100)}%</div>
      </div>
      <div class="pay-method-bar-row">
        <div class="pay-method-label"><i class="fa-solid fa-mobile-screen" style="color:var(--warning);"></i> محفظة</div>
        <div class="analytics-bar-track" style="flex:1;">
          <div class="analytics-bar-fill" style="width:${Math.round(totalWallet/grandTotal*100)}%; background:var(--warning);"></div>
        </div>
        <div class="analytics-bar-val">${Math.round(totalWallet/grandTotal*100)}%</div>
      </div>
    `;
  }

  // Stock Status Panel in Analytics
  const stockPanel = document.getElementById('analytics-stock-panel');
  if (stockPanel) {
    const products = state.data.products || [];
    if (products.length === 0) {
      stockPanel.innerHTML = '<div style="color:var(--text-dim); font-size:0.85rem; text-align:center; padding:15px;">لا توجد منتجات مسجلة</div>';
    } else {
      stockPanel.innerHTML = products.map(p => {
        const isLow = p.stock <= 3;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; background:var(--bg-input); border-radius:8px; border:1px solid ${isLow ? 'rgba(220,38,38,0.3)' : 'var(--border-subtle)'};">
            <span style="font-weight:700; font-size:0.9rem;">${p.name}</span>
            <span style="padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:800; background:${isLow ? 'var(--danger-bg)' : 'var(--success-bg)'}; color:${isLow ? 'var(--danger)' : 'var(--success)'};">
              ${p.stock} قطعة ${isLow ? ' منخفض' : '✓ متوفر'}
            </span>
          </div>
        `;
      }).join('');
    }
  }
}

// ==========================================
// Low Stock Alerts
// ==========================================
function checkLowStockAlerts() {
  const alertBar = document.getElementById('low-stock-alert-bar');
  if (!alertBar) return;

  const lowItems = (state.data.products || []).filter(p => p.stock <= 3);
  if (lowItems.length === 0) {
    alertBar.style.display = 'none';
    return;
  }

  alertBar.style.display = 'flex';
  document.getElementById('low-stock-alert-text').textContent =
    ` تنبيه مخزون: ${lowItems.map(p => `${p.name} (متبقي: ${p.stock})`).join(' | ')}`;
}



// ==========================================
// 5. Actions & Operations
// ==========================================

// Add Client to Queue
function addClientToQueue(clientData) {
  state.ticketCounter += 1;
  const newTicket = `A-${state.ticketCounter}`;

  const newQueueItem = {
    id: 'q_' + Date.now(),
    ticket: newTicket,
    name: clientData.name,
    phone: clientData.phone || '',
    barberId: clientData.barberId || 'any',
    services: clientData.services || ['قص شعر وتصفيف'],
    isVip: Boolean(clientData.isVip),
    arrivedAt: new Date().toISOString()
  };

  if (!state.data.queue) state.data.queue = [];

  // VIP clients go to the front
  if (newQueueItem.isVip) {
    state.data.queue.unshift(newQueueItem);
  } else {
    state.data.queue.push(newQueueItem);
  }

  state.saveData();
  renderApp();
  SoundSystem.playChime();
}

// Seat / Move client to Chair
function openAssignChairModal(queueItemId) {
  const queueItem = state.data.queue.find(q => q.id === queueItemId);
  if (!queueItem) return;

  state.pendingChairAssign = queueItem;
  const select = document.getElementById('select-target-chair');
  select.innerHTML = '';

  const availableChairs = state.data.chairs.filter(c => c.status === 'available');
  if (availableChairs.length === 0) {
    alert('جميع الكراسي مشغولة حالياً! يرجى الانتظار حتى يفرغ أحد الكراسي.');
    return;
  }

  availableChairs.forEach(chair => {
    const barber = state.data.barbers.find(b => b.id === chair.barberId) || { name: 'حلاق' };
    const isMaster = chair.id === 6 || chair.isMaster || (barber && (barber.isMaster || (barber.name && barber.name.includes('يوسف فرست'))));
    const opt = document.createElement('option');
    opt.value = chair.id;
    opt.textContent = isMaster
      ? ` كرسي 6 - الكابتن ${barber.name} (سينيور باربر)`
      : `كرسي ${chair.id} - الكابتن ${barber.name}`;
    select.appendChild(opt);
  });

  document.getElementById('assign-chair-prompt-text').textContent = `تسكين العميل: ${queueItem.name} (${queueItem.ticket})`;
  openModal('modal-assign-chair');
}

function promptSeatNextClient(chairId) {
  const chair = state.data.chairs.find(c => c.id === chairId);
  if (!chair) return;

  if (state.data.queue.length === 0) {
    openModal('modal-add-customer');
    return;
  }

  // Find next suitable client (either assigned to this barber or 'any')
  const nextClientIndex = state.data.queue.findIndex(q => q.barberId === 'any' || q.barberId == chair.barberId);
  const clientToSeat = nextClientIndex !== -1 ? state.data.queue[nextClientIndex] : state.data.queue[0];

  seatClientOnChair(clientToSeat, chair.id);
}

function seatClientOnChair(queueItem, chairId) {
  const chair = state.data.chairs.find(c => c.id === chairId);
  if (!chair) return;

  chair.status = 'busy';
  chair.currentClient = {
    id: queueItem.id,
    name: queueItem.name,
    phone: queueItem.phone,
    services: queueItem.services,
    startedAt: new Date().toISOString()
  };

  // Remove from queue
  state.data.queue = state.data.queue.filter(q => q.id !== queueItem.id);

  const barber = state.data.barbers.find(b => b.id === chair.barberId) || { name: 'الحلاق' };

  state.saveData();
  renderApp();

  // Sync chair status to SQL Server Backend
  if (window.SalonApi && typeof window.SalonApi.updateChairStatus === 'function') {
    window.SalonApi.updateChairStatus(chair.id, 'busy', queueItem.name, queueItem.phone || '').catch(() => {});
  }

  // Audio & TV Broadcast
  SoundSystem.playChime();
  SoundSystem.speak(`العميل ${queueItem.name}، تفضل إلى كرسي رقم ${chair.id}`);
  state.notifyTV('CUSTOMER_CALLED', {
    customerName: queueItem.name,
    chairId: chair.id,
    barberName: ''
  });
}

function callQueueClient(queueItemId) {
  const queueItem = state.data.queue.find(q => q.id === queueItemId);
  if (!queueItem) return;

  const barber = queueItem.barberId === 'any' ? null : state.data.barbers.find(b => b.id === queueItem.barberId);
  const barberName = barber ? barber.name : 'الصالون';

  SoundSystem.playChime();
  SoundSystem.speak(`العميل ${queueItem.name}، رقم التذكرة ${queueItem.ticket}، يرجى التوجه للاستقبال`);
  state.notifyTV('CUSTOMER_CALLED', {
    customerName: queueItem.name,
    chairId: 'الاستقبال',
    barberName: barberName
  });
}

function removeQueueClient(queueItemId) {
  if (!confirm('هل تريد بالتأكيد إزالة العميل من قائمة الانتظار؟')) return;
  state.data.queue = state.data.queue.filter(q => q.id !== queueItemId);
  state.saveData();
  renderApp();
}

// Finish Service on Chair -> Move to POS
function finishChairService(chairId) {
  const chair = state.data.chairs.find(c => c.id === chairId);
  if (!chair || !chair.currentClient) return;

  const client = chair.currentClient;
  const barber = state.data.barbers.find(b => b.id === chair.barberId);

  // Populate POS cart with client's services
  state.cart = [];
  (client.services || []).forEach(srvName => {
    const srv = state.data.services.find(s => s.name === srvName);
    if (srv) {
      state.cart.push({
        id: srv.id,
        name: srv.name,
        price: srv.price,
        itemType: 'service',
        qty: 1
      });
    } else {
      // Custom generic service if name not found in catalog
      state.cart.push({
        id: 'srv_gen_' + Date.now(),
        name: srvName,
        price: 120,
        itemType: 'service',
        qty: 1
      });
    }
  });

  // Switch to POS Tab
  switchView('view-pos');

  // Prefill Client & Barber
  document.getElementById('pos-client-name').value = client.name;
  const phoneInput = document.getElementById('pos-client-phone');
  if (phoneInput) phoneInput.value = client.phone || '';
  if (barber) {
    document.getElementById('pos-barber-select').value = barber.id;
  }

  // Store active chair reference on checkout button to free chair after payment
  document.getElementById('btn-complete-checkout').dataset.pendingChairId = chairId;

  renderPosCart();
}

function freeUpChairDirectly(chairId) {
  if (!confirm('هل تريد تفريغ الكرسي مباشرة دون إصدار فاتورة؟')) return;
  const chair = state.data.chairs.find(c => c.id === chairId);
  if (chair) {
    chair.status = 'available';
    chair.currentClient = null;
    if (window.SalonApi && typeof window.SalonApi.updateChairStatus === 'function') {
      window.SalonApi.updateChairStatus(chair.id, 'available', null, null).catch(() => {});
    }
    state.saveData();
    renderApp();
  }
}

// Checkout & Complete POS Invoice
function completeCheckout() {
  if (state.cart.length === 0) return;

  const clientName = document.getElementById('pos-client-name').value.trim() || 'عميل عام';
  const clientPhone = document.getElementById('pos-client-phone')?.value.trim() || '';
  const barberId = parseInt(document.getElementById('pos-barber-select').value) || (state.data.barbers[0]?.id || 1);
  const barber = state.data.barbers.find(b => b.id === barberId);

  const discount = Math.max(0, parseFloat(document.getElementById('cart-discount-input')?.value || 0));
  const discountInput = document.getElementById('cart-discount-input');
  const loyaltyRewardVisits = Number(discountInput?.dataset.loyaltyRewardVisits) || 0;
  const loyaltyRewardAmount = Number(discountInput?.dataset.loyaltyRewardAmount) || 0;
  const redeemedLoyaltyRewardVisits = loyaltyRewardAmount > 0 && discount >= loyaltyRewardAmount ? loyaltyRewardVisits : 0;
  const tip = Math.max(0, parseFloat(document.getElementById('cart-tip-input')?.value || 0));
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const grandTotal = Math.max(0, subtotal - discount) + tip;

  const invoiceNumber = 1000 + (state.data.invoices.length + 1);
  const invoice = {
    id: 'inv_' + Date.now(),
    invoiceNumber: invoiceNumber,
    timestamp: new Date().toISOString(),
    clientName: clientName,
    clientPhone: clientPhone,
    barberId: barberId,
    barberName: barber ? barber.name : 'فريق العمل',
    actualBarberName: barber ? barber.name : 'فريق العمل',
    items: JSON.parse(JSON.stringify(state.cart)),
    subtotal: subtotal,
    discount: discount,
    loyaltyRewardVisits: redeemedLoyaltyRewardVisits,
    tip: tip,
    total: grandTotal,
    paymentMethod: 'vodafone_cash',
    isVoided: false
  };

  // Deduct inventory for product items
  state.cart.forEach(ci => {
    if (ci.itemType === 'product') {
      const prod = state.data.products.find(p => p.id === ci.id);
      if (prod && prod.stock > 0) {
        prod.stock = Math.max(0, prod.stock - ci.qty);
      }
    }
  });

  // Free up chair if was linked
  const checkoutBtn = document.getElementById('btn-complete-checkout');
  const linkedChairId = parseInt(checkoutBtn.dataset.pendingChairId);
  if (linkedChairId) {
    const chair = state.data.chairs.find(c => c.id === linkedChairId);
    if (chair) {
      chair.status = 'available';
      chair.currentClient = null;
      if (window.SalonApi && typeof window.SalonApi.updateChairStatus === 'function') {
        window.SalonApi.updateChairStatus(chair.id, 'available', null, null).catch(() => {});
      }
    }
    delete checkoutBtn.dataset.pendingChairId;
  }

  // Save invoice
  if (!state.data.invoices) state.data.invoices = [];
  state.data.invoices.push(invoice);
  state.lastActiveInvoice = invoice;

  // Sync Invoice to .NET Backend API & Microsoft SQL Server
  if (window.SalonApi && typeof window.SalonApi.createInvoice === 'function') {
    const apiInvoice = {
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName || 'عميل عام',
      clientPhone: invoice.clientPhone || null,
      barberID: invoice.barberId || null,
      barberName: invoice.barberName || null,
      paymentMethod: invoice.paymentMethod || 'cash',
      subtotal: invoice.subtotal || invoice.total,
      discount: invoice.discount || 0,
      tipAmount: invoice.tip || 0,
      totalAmount: invoice.total,
      items: (invoice.items || []).map(it => ({
        itemName: it.name,
        itemType: it.itemType || 'service',
        unitPrice: it.price,
        quantity: it.qty || 1
      }))
    };
    window.SalonApi.createInvoice(apiInvoice).catch(err => console.warn('Backend invoice sync:', err));
  }

  // Update Customer CRM & Loyalty
  updateCustomerOnCheckout(clientName, clientPhone, grandTotal, redeemedLoyaltyRewardVisits);

  // Clear Cart & reset inputs
  state.cart = [];
  document.getElementById('pos-client-name').value = '';
  const phoneInp = document.getElementById('pos-client-phone');
  if (phoneInp) phoneInp.value = '';
  document.getElementById('cart-discount-input').value = '0';
  const tipInp = document.getElementById('cart-tip-input');
  if (tipInp) tipInp.value = '0';

  state.saveData();
  renderApp();

  // Print Receipt & Sound
  SoundSystem.playSuccessBeep();
  renderThermalReceipt(invoice);
  openModal('printable-receipt-modal');
  showToast(`تم إصدار الفاتورة #${invoice.invoiceNumber} بنجاح`, 'success');
}

// Render Thermal 80mm Receipt
function renderThermalReceipt(invoice) {
  const container = document.getElementById('thermal-receipt-content');
  if (!container) return;

  const dateFormatted = new Date(invoice.timestamp).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  let payText = 'فودافون كاش';
  if (invoice.paymentMethod === 'card') payText = 'بطاقة / فيزا';
  else if (invoice.paymentMethod === 'wallet') payText = 'محفظة / إنستاباي';
  else if (invoice.paymentMethod === 'vodafone_cash') payText = 'فودافون كاش';
  else if (invoice.paymentMethod === 'split') payText = 'دفع متعدد (Split)';

  const origin = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'http://localhost:8080';
  const bookingUrl = `${origin}/booking.html`;
  let qrCodeSvg = '';
  try {
    if (window.QRCode && typeof window.QRCode.generateSVG === 'function') {
      qrCodeSvg = window.QRCode.generateSVG(bookingUrl, 110);
    }
  } catch (e) {
    console.warn('QR Code generation notice:', e);
  }

  container.innerHTML = `
    <div class="receipt-header">
      <img src="assets/logo.jpg" style="width:50px; height:50px; border-radius:50%; margin-bottom:4px;" alt="Logo">
      <h2>${state.data.settings.shopName}</h2>
      <p style="font-size:11px; font-weight:700; line-height:1.4;">${state.data.settings.shopAddress}</p>
      <p style="font-size:11px; font-family:monospace;">هاتف: ${state.data.settings.shopPhone || '01032232541'}</p>
    </div>

    <div class="receipt-divider"></div>

    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
      <span>فاتورة رقم: #${invoice.invoiceNumber}</span>
      <span>${payText}</span>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:11.5px; color:#1e293b; margin-bottom:4px;">
      <span>التاريخ: ${dateFormatted}</span>
      <span>الحلاق: <strong style="color:#0f172a; font-size:12px;">${invoice.actualBarberName || invoice.barberName || 'فريق العمل'}</strong></span>
    </div>
    <div style="text-align:right; font-size:12px; font-weight:bold; margin-bottom:6px;">
      العميل: ${invoice.clientName}
    </div>

    <div class="receipt-divider"></div>

    <table class="receipt-table">
      <thead>
        <tr>
          <th>الصنف</th>
          <th style="text-align:left;">المبلغ</th>
        </tr>
      </thead>
      <tbody>
        ${invoice.items.map(item => `
          <tr>
            <td>${item.name}</td>
            <td style="text-align:left;">${formatCurrency(item.price * item.qty)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="receipt-divider"></div>

    <div class="receipt-totals-row">
      <span>المجموع الفرعي:</span>
      <span>${formatCurrency(invoice.subtotal)}</span>
    </div>
    ${invoice.discount > 0 ? `
      <div class="receipt-totals-row" style="color:#b91c1c;">
        <span>الخصم الممنوح:</span>
        <span>- ${formatCurrency(invoice.discount)}</span>
      </div>
    ` : ''}
    ${invoice.tip > 0 ? `
      <div class="receipt-totals-row" style="color:#059669; font-weight:700;">
        <span>إكرامية الحلاق (Tip):</span>
        <span>+ ${formatCurrency(invoice.tip)}</span>
      </div>
    ` : ''}
    <div class="receipt-totals-row" style="font-size:16px; font-weight:bold; border-top:1px solid #000; padding-top:4px; margin-top:4px;">
      <span>الإجمالي المدفوع:</span>
      <span>${formatCurrency(invoice.total)}</span>
    </div>

    <div class="receipt-divider"></div>

    <!-- Real Scannable QR Code For Online Customer Booking -->
    <div style="margin:12px 0 6px 0; text-align:center; padding:8px; background:#fff; border:1.5px dashed #94a3b8; border-radius:8px;">
      <div id="receipt-qr-wrapper" style="display:flex; justify-content:center; align-items:center; margin:3px auto;">
        ${qrCodeSvg ? qrCodeSvg : `<img src="https://api.qrserver.com/v1/create-qr-code/?size=115x115&margin=2&data=${encodeURIComponent(bookingUrl)}" alt="QR Code" style="width:105px; height:105px; display:block; margin:auto;" />`}
      </div>
      <div style="font-size:10px; font-weight:900; color:#0f172a; margin-top:5px;">
        <i class="fa-solid fa-qrcode" style="color:#b45309;"></i> امسح الكود واحجز موعدك القادم أونلاين
      </div>
      <div style="font-size:8px; color:#64748b; font-family:monospace; margin-top:2px;">${bookingUrl}</div>
    </div>

    <p style="font-size:11px; margin-top:6px; font-weight:600;">${state.data.settings.receiptFooter}</p>
  `;
}

function reprintInvoice(invoiceId) {
  const invoice = state.data.invoices.find(inv => inv.id === invoiceId);
  if (!invoice) return;
  renderThermalReceipt(invoice);
  openModal('printable-receipt-modal');
}

// Convert Appointment to Queue
function transferAppointmentToQueue(appointmentId) {
  const apt = state.data.appointments.find(a => a.id === appointmentId);
  if (!apt) return;

  apt.status = 'arrived';
  addClientToQueue({
    name: apt.name,
    phone: apt.phone,
    barberId: apt.barberId,
    services: [apt.services || 'حجز مسبق'],
    isVip: true
  });
  renderAppointments();
}

function deleteAppointment(appointmentId) {
  if (!confirm('هل تريد إلغاء هذا الحجز؟')) return;
  state.data.appointments = state.data.appointments.filter(a => a.id !== appointmentId);
  state.saveData();
  renderAppointments();
}

// Add Expense
function addExpense(desc, amount) {
  if (!desc || amount <= 0) return;
  if (!state.data.expenses) state.data.expenses = [];
  const expItem = {
    id: 'exp_' + Date.now(),
    desc: desc,
    amount: amount,
    timestamp: new Date().toISOString()
  };
  state.data.expenses.push(expItem);
  if (window.SalonApi && typeof window.SalonApi.createExpense === 'function') {
    window.SalonApi.createExpense(desc, amount).catch(() => {});
  }
  state.saveData();
  renderApp();
}

// Add / Delete Catalog Items
function deleteCatalogService(id) {
  if (!confirm('هل تريد حذف هذه الخدمة من القائمة؟')) return;
  state.data.services = state.data.services.filter(s => s.id !== id);
  state.saveData();
  renderApp();
}

function deleteCatalogProduct(id) {
  if (!confirm('هل تريد حذف هذا المنتج من المخزون؟')) return;
  state.data.products = state.data.products.filter(p => p.id !== id);
  state.saveData();
  renderApp();
}

function editBarberCommission(barberId) {
  showToast('تم إلغاء نظام العمولات، كامل دخل الخدمات والمنتجات للمحل بنسبة 100%', 'info');
}

// Postpone / Skip queue turn to end
function postponeQueueClient(queueItemId) {
  const itemIndex = state.data.queue.findIndex(q => q.id === queueItemId);
  if (itemIndex === -1) return;

  const [item] = state.data.queue.splice(itemIndex, 1);
  item.isVip = false; // removes top priority on skip
  state.data.queue.push(item);

  state.saveData();
  renderApp();
  showToast(`تم تأجيل دور العميل (${item.name}) ونقله لنهاية قائمة الانتظار`, 'warning');
}

// Transfer Active Client to Another Chair
function openTransferChairModal(sourceChairId) {
  const chair = state.data.chairs.find(c => c.id === sourceChairId);
  if (!chair || !chair.currentClient) return;

  const select = document.getElementById('transfer-target-chair-select');
  select.innerHTML = '';

  const availableChairs = state.data.chairs.filter(c => c.status === 'available');
  if (availableChairs.length === 0) {
    showToast('لا توجد كراسي شاغرة ومتاحة حالياً لنقل العميل إليها!', 'warning');
    return;
  }

  availableChairs.forEach(c => {
    const barber = state.data.barbers.find(b => b.id === c.barberId) || { name: 'حلاق' };
    const isMaster = c.id === 6 || c.isMaster || (barber && (barber.isMaster || (barber.name && barber.name.includes('يوسف فرست'))));
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = isMaster
      ? ` كرسي رقم 6 - الكابتن ${barber.name} (سينيور باربر)`
      : `كرسي رقم ${c.id} - الكابتن ${barber.name}`;
    select.appendChild(opt);
  });

  document.getElementById('transfer-source-chair-id').value = sourceChairId;
  document.getElementById('transfer-client-info-text').textContent =
    `نقل العميل (${chair.currentClient.name}) من كرسي رقم ${chair.id} إلى كرسي شاغر آخر:`;
  openModal('modal-transfer-chair');
}

function confirmTransferChair() {
  const sourceId = parseInt(document.getElementById('transfer-source-chair-id').value);
  const targetId = parseInt(document.getElementById('transfer-target-chair-select').value);

  const sourceChair = state.data.chairs.find(c => c.id === sourceId);
  const targetChair = state.data.chairs.find(c => c.id === targetId);

  if (!sourceChair || !targetChair || !sourceChair.currentClient) return;

  targetChair.status = 'busy';
  targetChair.currentClient = JSON.parse(JSON.stringify(sourceChair.currentClient));

  sourceChair.status = 'available';
  sourceChair.currentClient = null;

  state.saveData();
  renderApp();
  closeModal('modal-transfer-chair');
  showToast(`تم نقل العميل بنجاح إلى كرسي رقم ${targetId}`, 'success');

  const targetBarber = state.data.barbers.find(b => b.id === targetChair.barberId) || { name: 'الحلاق' };
  SoundSystem.speak(`العميل ${targetChair.currentClient.name}، يرجى التوجه لكرسي رقم ${targetId}`);
  state.notifyTV('CUSTOMER_CALLED', {
    customerName: targetChair.currentClient.name,
    chairId: targetId,
    barberName: targetBarber.name
  });
}

// Void / Cancel Invoice (Requires Admin PIN)
function promptVoidInvoice(invoiceId) {
  requireAdminAuth(() => {
    const invoice = state.data.invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    if (invoice.isVoided) {
      showToast('هذه الفاتورة تم إلغاؤها بالفعل مسبقاً!', 'warning');
      return;
    }

    if (!confirm(`هل أنت متأكد من إلغاء الفاتورة #${invoice.invoiceNumber} بقيمة (${formatCurrency(invoice.total)})؟\nسيتم استرجاع المنتجات للمخزون وخصم المبلغ من الإيراد.`)) {
      return;
    }

    invoice.isVoided = true;
    invoice.voidedAt = new Date().toISOString();

    // Restore stock
    (invoice.items || []).forEach(item => {
      if (item.itemType === 'product') {
        const prod = state.data.products.find(p => p.id === item.id);
        if (prod) prod.stock += item.qty;
      }
    });

    state.saveData();
    renderApp();
    showToast(`تم إلغاء الفاتورة #${invoice.invoiceNumber} واسترجاع المخزون بنجاح`, 'success');
  }, 'إلغاء فاتورة');
}

// Thermal Shift Z-Report
function generateShiftZReport(notes = '', shiftRecord = null) {
  const openedAt = shiftRecord?.openedAt || state.data.shift?.startedAt || new Date().toISOString();
  const closedAt = shiftRecord?.closedAt || new Date().toISOString();
  const startMs = new Date(openedAt).getTime();
  const endMs = new Date(closedAt).getTime();
  const inShift = value => {
    const time = new Date(value || 0).getTime();
    return Number.isFinite(time) && time >= startMs && time <= endMs;
  };
  const shiftInvoices = shiftRecord?.invoices || (state.data.invoices || []).filter(i => inShift(i.timestamp));
  const invoices = shiftInvoices.filter(i => !i.isVoided);
  const voidedInvoices = shiftInvoices.filter(i => i.isVoided);
  const expenses = shiftRecord?.expenses || (state.data.expenses || []).filter(e => inShift(e.timestamp || e.createdAt));

  const totalRev = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalCash = invoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'cash') return sum + inv.total;
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.cash) || 0);
    return sum;
  }, 0);
  const totalDigital = invoices.reduce((sum, inv) => {
    if (inv.paymentMethod === 'card' || inv.paymentMethod === 'wallet' || inv.paymentMethod === 'vodafone_cash') return sum + inv.total;
    if (inv.paymentMethod === 'split' && inv.paymentSplit) return sum + (Number(inv.paymentSplit.card) || 0) + (Number(inv.paymentSplit.wallet) || 0);
    return sum;
  }, 0);

  const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
  const openBal = Number(shiftRecord?.openingBalance ?? state.data.shift.openingBalance) || 0;
  const netDrawer = Number(shiftRecord?.netDrawer ?? Math.max(0, openBal + totalCash - totalExp));

  const dateNow = new Date(closedAt).toLocaleString('ar-EG', {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const container = document.getElementById('z-report-thermal-content');
  if (!container) return;

  container.innerHTML = `
    <div class="receipt-header">
      <img src="assets/logo.jpg" style="width:50px; height:50px; border-radius:50%; margin-bottom:4px;" alt="Logo">
      <h2>${state.data.settings.shopName}</h2>
      <p style="font-weight:900; font-size:13px; margin-top:2px; letter-spacing:1px; color:#b45309;">*** تقرير تقفيل الوردية Z-REPORT ***</p>
      <p style="font-size:11px;">تاريخ التقفيل: ${dateNow}</p>
      <p style="font-size:11.5px; font-weight:700;">المسؤول / الكاشير: ${shiftRecord?.cashier || state.data.shift.cashier || 'الكاشير'}</p>
    </div>

    <div class="receipt-divider"></div>

    <div style="font-size:12px; font-weight:800; margin-bottom:6px; color:#1e293b;">1. الملخص المالي للخزينة:</div>
    <div class="receipt-totals-row">
      <span>رصيد الافتتاح:</span>
      <span>${formatCurrency(openBal)}</span>
    </div>
    <div class="receipt-totals-row">
      <span>إجمالي المبيعات النشطة:</span>
      <span style="font-weight:800;">${formatCurrency(totalRev)}</span>
    </div>
    <div class="receipt-totals-row" style="font-size:11px; color:#555;">
      <span>• النقدية المحصلة (كاش):</span>
      <span>${formatCurrency(totalCash)}</span>
    </div>
    <div class="receipt-totals-row" style="font-size:11px; color:#555;">
      <span>• فودافون كاش:</span>
      <span>${formatCurrency(totalDigital)}</span>
    </div>
    <div class="receipt-totals-row" style="color:#b91c1c;">
      <span>إجمالي المصروفات والسلف:</span>
      <span>- ${formatCurrency(totalExp)}</span>
    </div>

    <div class="receipt-divider"></div>

    <div class="receipt-totals-row" style="font-size:15px; font-weight:900; border-top:2px solid #000; padding-top:6px;">
      <span>الصافي الفعلي بالدرج:</span>
      <span>${formatCurrency(netDrawer)}</span>
    </div>

    <div class="receipt-divider"></div>

    <div style="font-size:12px; font-weight:800; margin-bottom:6px; color:#1e293b;">2. إحصائيات العمل:</div>
    <div class="receipt-totals-row" style="font-size:11px;">
      <span>عدد الفواتير النشطة:</span>
      <span>${invoices.length} فاتورة</span>
    </div>
    <div class="receipt-totals-row" style="font-size:11px;">
      <span>الفواتير الملغاة (Void):</span>
      <span>${voidedInvoices.length} فاتورة</span>
    </div>

    <div class="receipt-divider"></div>

    <div style="font-size:12px; font-weight:800; margin-bottom:6px; color:#1e293b;">3. إنتاجية ومبيعات الحلاقين (100% للمحل):</div>
    <table class="receipt-table" style="font-size:10px;">
      <thead>
        <tr>
          <th>الحلاق</th>
          <th>الزبائن</th>
          <th>المبيعات</th>
          <th>دخل المحل</th>
        </tr>
      </thead>
      <tbody>
        ${state.data.barbers.map(b => {
          const bInvs = invoices.filter(inv => inv.barberId == b.id);
          const bRev = bInvs.reduce((s, inv) => s + inv.total, 0);
          return `
            <tr>
              <td>${b.name}</td>
              <td style="text-align:center;">${bInvs.length}</td>
              <td style="text-align:left;">${formatCurrency(bRev)}</td>
              <td style="text-align:left; font-weight:bold; color:#15803d;">${formatCurrency(bRev)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div class="receipt-divider"></div>

    ${notes ? `
      <div style="font-size:11px; margin-bottom:8px; text-align:right;">
        <strong>ملاحظات التقفيل:</strong> ${notes}
      </div>
    ` : ''}

    <div style="margin-top:25px; display:flex; justify-content:space-between; font-size:11px; border-top:1px dashed #777; padding-top:10px;">
      <div>توقيع الكاشير (${shiftRecord?.cashier || state.data.shift.cashier || 'الكاشير'}): ...............</div>
      <div>توقيع الإدارة (يوسف فريست): ...............</div>
    </div>
  `;

  openModal('modal-z-report');
}

// ==========================================
// Role Switching & Atmosphere Controller (Admin vs Cashier)
// ==========================================

// Sound Effects for Role Switch using Web Audio API (100% offline & instant)
function playRoleSound(role) {
  try {
    if (state.data.settings?.soundEnabled === false) return;
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (role === 'admin') {
      // Royal ascending majestic fanfare (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.36);
      });
    } else {
      // Crisp POS Terminal beep-beep (G5 -> C6)
      [784, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.15, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.19);
      });
    }
  } catch (e) {
    console.warn('Audio note error:', e);
  }
}

// Visual Drop Splash Notification
function showRoleSwitchBanner(role) {
  let banner = document.getElementById('role-switch-splash');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'role-switch-splash';
    banner.className = 'role-switch-splash';
    document.body.appendChild(banner);
  }

  if (role === 'admin') {
    banner.className = 'role-switch-splash show role-splash-admin';
    banner.innerHTML = `
      <div class="role-splash-content">
        <div class="role-splash-icon"><i class="fa-solid fa-crown"></i></div>
        <div class="role-splash-text">
          <h3> وضع الإدارة العامة (Admin Mode)</h3>
          <p>أهلًا بك. جميع صلاحيات الإدارة والتقارير متاحة.</p>
        </div>
      </div>
    `;
  } else {
    banner.className = 'role-switch-splash show role-splash-cashier';
    banner.innerHTML = `
      <div class="role-splash-content">
        <div class="role-splash-icon"><i class="fa-solid fa-cash-register"></i></div>
        <div class="role-splash-text">
          <h3> وضع الكاشير ونقطة البيع (Cashier Mode)</h3>
          <p>واجهة الكاشير جاهزة لاستقبال العملاء وإتمام عمليات البيع.</p>
        </div>
      </div>
    `;
  }

  clearTimeout(banner._timeout);
  banner._timeout = setTimeout(() => {
    banner.classList.remove('show');
  }, 2400);
}

// Comprehensive Role UI & Atmosphere Synchronizer
function updateRoleUI(triggerEffects = false) {
  const currentRole = state.data.settings?.currentRole || 'admin';
  const isAdmin = currentRole === 'admin';

  // 1. Atmosphere Classes on Document Body
  document.body.classList.toggle('role-mode-admin', isAdmin);
  document.body.classList.toggle('role-mode-cashier', !isAdmin);

  // 2. Header Role Badge
  const btn = document.getElementById('btn-role-toggle');
  const icon = document.getElementById('role-badge-icon');
  const name = document.getElementById('role-badge-name');
  const sub = document.getElementById('role-badge-sub');

  if (btn) {
    btn.className = `btn-role-badge ${isAdmin ? 'role-admin' : 'role-cashier'}`;
    btn.title = isAdmin
      ? 'أنت الآن في وضع المدير (Admin) - انقر للتحويل السريع لوضع الكاشير'
      : 'أنت الآن في وضع الكاشير (Cashier) - انقر وأدخل رمز PIN للتحويل للمدير';
  }
  if (icon) icon.className = isAdmin ? 'fa-solid fa-crown' : 'fa-solid fa-cash-register';
  if (name) name.textContent = isAdmin ? 'المدير (Admin)' : 'الكاشير (Cashier)';
  if (sub) sub.textContent = isAdmin ? 'كامل الصلاحيات ' : 'نقطة البيع والاستقبال';

  // 3. Top Mode Strip Banner
  const strip = document.getElementById('role-mode-strip');
  const stripIcon = document.getElementById('role-strip-icon');
  const stripTitle = document.getElementById('role-strip-title');
  const stripDesc = document.getElementById('role-strip-desc');
  const stripBtnText = document.getElementById('btn-strip-toggle-text');

  if (strip) {
    strip.className = `role-mode-strip ${isAdmin ? 'mode-admin-strip' : 'mode-cashier-strip'}`;
    if (stripIcon) stripIcon.className = isAdmin ? 'fa-solid fa-crown' : 'fa-solid fa-cash-register';
    if (stripTitle) stripTitle.textContent = isAdmin ? 'وضع الإدارة العامة (Admin Mode)' : 'وضع الكاشير ونقطة البيع (Cashier Mode)';
    if (stripDesc) {
      stripDesc.textContent = isAdmin
        ? 'المدير — جميع الصلاحيات والتقارير متاحة.'
        : 'الكاشير — المبيعات واستقبال العملاء.';
    }
    if (stripBtnText) {
      stripBtnText.textContent = isAdmin ? 'التحويل لوضع الكاشير ' : 'تسجيل دخول كمدير ';
    }
  }

  // 4. Sidebar Brand Section Role Badge
  const sideBadge = document.getElementById('sidebar-role-badge');
  const sideIcon = document.getElementById('sidebar-role-icon');
  const sideLabel = document.getElementById('sidebar-role-label');
  if (sideBadge) sideBadge.className = `role-brand-badge ${isAdmin ? 'admin' : 'cashier'}`;
  if (sideIcon) sideIcon.className = isAdmin ? 'fa-solid fa-crown' : 'fa-solid fa-user-check';
  if (sideLabel) sideLabel.textContent = isAdmin ? 'المدير' : 'الكاشير';

  // 5. Sidebar Shift Status Card
  const shiftUserName = document.getElementById('shift-user-name');
  if (shiftUserName) {
    shiftUserName.textContent = isAdmin ? 'المدير' : 'الكاشير';
  }

  // 6. Sidebar Navigation Links Visibility (Completely hidden for Cashier)
  const navReports = document.getElementById('nav-reports');
  const navAnalytics = document.getElementById('nav-analytics');
  const tagReports = document.getElementById('tag-nav-reports');
  const tagAnalytics = document.getElementById('tag-nav-analytics');

  if (navReports) {
    navReports.style.display = isAdmin ? 'flex' : 'none';
  }
  if (navAnalytics) {
    navAnalytics.style.display = isAdmin ? 'flex' : 'none';
  }
  if (tagReports) tagReports.innerHTML = '';
  if (tagAnalytics) tagAnalytics.innerHTML = '';

  // 7. Sensory & Visual Effects if requested
  if (triggerEffects) {
    playRoleSound(currentRole);
    showRoleSwitchBanner(currentRole);
  }
}

// Unified Role Switch Handler
function toggleRole() {
  const currentRole = state.data.settings?.currentRole || 'admin';
  if (currentRole === 'admin') {
    state.data.settings.currentRole = 'cashier';
    state.saveData();
    updateRoleUI(true);
    renderTopMetrics();
    renderBarbersList();

    // If currently viewing sensitive financial reports, transition safely to POS
    const activeView = document.querySelector('.page-view.active')?.id;
    if (activeView === 'view-reports' || activeView === 'view-analytics') {
      switchView('view-pos');
      showToast('تم التحويل لوضع الكاشير وتفعيل شاشة نقطة البيع', 'info');
    } else {
      showToast('تم التحويل لوضع الكاشير بنجاح', 'info');
    }
  } else {
    requireAdminAuth(() => {
      state.data.settings.currentRole = 'admin';
      state.saveData();
      updateRoleUI(true);
      renderTopMetrics();
      renderBarbersList();
      showToast('أهلاً بك يا مستر يوسف فريست! تم فتح وضع الإدارة وعرض إجمالي الخزينة ', 'success');
    }, 'تسجيل الدخول كمدير عام');
  }
}

// PIN Security Verification System
function requireAdminAuth(actionCallback, reasonText = 'الوصول محمي') {
  const currentRole = state.data.settings?.currentRole || 'admin';
  if (currentRole === 'admin') {
    actionCallback();
    return;
  }

  // Cashier role must enter Admin PIN
  state.pinSuccessCallback = actionCallback;
  state.pinBuffer = '';
  updatePinDots();
  const descEl = document.getElementById('pin-prompt-desc');
  if (descEl) descEl.textContent = `يتطلب إجراء (${reasonText}) إدخال رمز PIN للمدير للمتابعة:`;
  const errEl = document.getElementById('pin-error-msg');
  if (errEl) errEl.style.display = 'none';
  openModal('modal-pin-prompt');
}

function updatePinDots() {
  const dots = document.querySelectorAll('#pin-display-dots .pin-dot');
  dots.forEach((dot, index) => {
    if (index < state.pinBuffer.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function handlePinKeyPress(val) {
  const errEl = document.getElementById('pin-error-msg');
  if (errEl) errEl.style.display = 'none';

  if (val === 'clear') {
    state.pinBuffer = state.pinBuffer.slice(0, -1);
    updatePinDots();
    return;
  }

  if (val === 'submit') {
    submitPinCheck();
    return;
  }

  if (state.pinBuffer.length < 6) {
    state.pinBuffer += val;
    updatePinDots();
    if (state.pinBuffer.length === 4) {
      setTimeout(submitPinCheck, 220);
    }
  }
}

function submitPinCheck() {
  const correctPin = String(state.data.settings.adminPin || '1234');
  if (state.pinBuffer === correctPin) {
    closeModal('modal-pin-prompt');
    const cb = state.pinSuccessCallback;
    state.pinBuffer = '';
    state.pinSuccessCallback = null;
    updatePinDots();
    showToast('تم التحقق بنجاح!', 'success');
    if (typeof cb === 'function') cb();
  } else {
    const errEl = document.getElementById('pin-error-msg');
    if (errEl) {
      errEl.textContent = 'رمز PIN غير صحيح! حاول مجدداً';
      errEl.style.display = 'block';
    }
    state.pinBuffer = '';
    updatePinDots();
  }
}

// Lock System Functions
function lockSystem() {
  const overlay = document.getElementById('system-lock-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  state.data.settings.isLocked = true;
  state.saveData();

  const pinInput = document.getElementById('input-lock-pin');
  if (pinInput) {
    pinInput.value = '';
    pinInput.focus();
  }
  const err = document.getElementById('lock-error-msg');
  if (err) err.style.display = 'none';
  showToast('تم قفل النظام لحماية البيانات', 'info');
}

function unlockSystem() {
  const pinInput = document.getElementById('input-lock-pin');
  const entered = pinInput ? pinInput.value.trim() : '';
  const correctPin = String(state.data.settings.adminPin || '1234');

  if (entered === correctPin) {
    const overlay = document.getElementById('system-lock-overlay');
    if (overlay) overlay.style.display = 'none';
    state.data.settings.isLocked = false;
    state.saveData();
    showToast('تم إلغاء قفل النظام بنجاح', 'success');
    SoundSystem.playSuccessBeep();
  } else {
    const err = document.getElementById('lock-error-msg');
    if (err) err.style.display = 'block';
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

// Populate Add Customer Services Checklist
function populateQueueServicesChips() {
  const container = document.getElementById('queue-services-chips');
  if (!container) return;
  container.innerHTML = '';

  state.data.services.forEach(srv => {
    const label = document.createElement('label');
    label.className = 'chip-label';
    label.innerHTML = `
      <input type="checkbox" name="queue_services" value="${srv.name}">
      <span>${srv.name} (${formatCurrency(srv.price)})</span>
    `;
    container.appendChild(label);
  });
}

function populateQueueBarbersDropdown() {
  const select = document.getElementById('queue-input-barber');
  if (!select) return;
  select.innerHTML = '<option value="any">أي حلاق متاح (الأسرع دوراً)</option>';
  state.data.barbers.forEach(b => {
    const isMaster = b.id === 6 || b.isMaster || (b.name && b.name.includes('يوسف فرست'));
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = isMaster
      ? ` الكابتن ${b.name} (سينيور باربر - كرسي ${b.chairId || 6})`
      : `الكابتن ${b.name} (كرسي ${b.chairId})`;
    select.appendChild(opt);
  });

  const aptSelect = document.getElementById('apt-input-barber');
  if (aptSelect) {
    aptSelect.innerHTML = select.innerHTML;
  }
}

// ==========================================
// 6.5. Additional Advanced Features: WhatsApp, Excel, Dark Mode
// ==========================================

// Send Electronic Invoice via WhatsApp Direct
function sendInvoiceWhatsApp(invoiceId) {
  let inv = (state.data.invoices || []).find(i => i.id === invoiceId);
  if (!inv) inv = state.lastActiveInvoice;
  if (!inv) {
    showToast('لا توجد فاتورة محددة لإرسالها!', 'warning');
    return;
  }

  let phone = inv.clientPhone;
  if (!phone) {
    phone = prompt('يرجى إدخال رقم هاتف أو واتساب العميل لإرسال الفاتورة (مثال: 01012345678):', '');
    if (!phone) return;
  }

  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = '2' + cleanPhone;

  const barber = state.data.barbers.find(b => b.id == inv.barberId) || { name: 'فريق العمل' };
  const itemsText = (inv.items || []).map(it => `• ${it.name}: ${it.price * it.qty} ${state.data.settings.currency}`).join('\n');

  let payLabel = 'كاش نقدي';
  if (inv.paymentMethod === 'card') payLabel = 'بطاقة / فيزا';
  else if (inv.paymentMethod === 'wallet') payLabel = 'محفظة إلكترونية / إنستاباي';
  else if (inv.paymentMethod === 'vodafone_cash') payLabel = 'فودافون كاش';
  else if (inv.paymentMethod === 'split') payLabel = 'دفع متعدد مقسم';

  const rawMsg = ` *${state.data.settings.shopName}*\n`
    + ` *إيصال إلكتروني - فاتورة رقم #${inv.invoiceNumber}*\n`
    + `━━━━━━━━━━━━━━━━━━\n`
    + ` *العميل:* ${inv.clientName || 'عميل كريم'}\n`
    + ` *الحلاق:* ${barber.name || 'فريق العمل'}\n`
    + ` *رابط حجز موعدك القادم:* ${window.location.origin && window.location.origin !== 'null' ? window.location.origin + '/booking.html' : 'http://localhost:8080/booking.html'}\n`
    + ` *التاريخ:* ${new Date(inv.timestamp).toLocaleDateString('ar-EG')} - ${new Date(inv.timestamp).toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit', hour12:true})}\n`
    + `━━━━━━━━━━━━━━━━━━\n`
    + ` *تفاصيل الخدمات والمشتريات:*\n${itemsText}\n`
    + `━━━━━━━━━━━━━━━━━━\n`
    + (inv.discount > 0 ? ` *الخصم:* -${inv.discount} ${state.data.settings.currency}\n` : '')
    + (inv.tip > 0 ? ` *إكرامية الحلاق (Tip):* +${inv.tip} ${state.data.settings.currency}\n` : '')
    + ` *الإجمالي النهائي: ${inv.total} ${state.data.settings.currency}*\n`
    + ` *طريقة الدفع:* ${payLabel}\n`
    + `━━━━━━━━━━━━━━━━━━\n`
    + ` *${state.data.settings.receiptFooter || 'شكراً لزيارتكم! نتمنى لكم مظهراً أنيقاً دائماً.'}*\n`
    + ` ${state.data.settings.shopAddress || ''}\n`
    + ` هاتف: ${state.data.settings.shopPhone || '01032232541'}`;

  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawMsg)}`, '_blank');
  showToast('تم فتح واتساب لإرسال الفاتورة للعميل', 'success');
}

// Helper: Download Excel / CSV File with UTF-8 BOM for Arabic support
function downloadCSV(csvContent, filename) {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export Invoices to Excel / CSV
function exportInvoicesToCSV() {
  const invoices = state.data.invoices || [];
  if (invoices.length === 0) {
    showToast('لا توجد فواتير لتصديرها حالياً', 'warning');
    return;
  }
  let csv = 'رقم الفاتورة,التاريخ والوقت,اسم العميل,رقم الهاتف,اسم الحلاق,طريقة الدفع,المجموع الفرعي,الخصم,الإكرامية (Tip),الإجمالي النهائي,الحالة,الخدمات والمنتجات\n';
  invoices.forEach(inv => {
    const timeStr = new Date(inv.timestamp).toLocaleString('ar-EG');
    const itemsNames = (inv.items || []).map(i => `${i.name} (x${i.qty})`).join(' + ');
    const status = inv.isVoided ? 'ملغاة' : 'نشطة/مسددة';
    let payMethod = inv.paymentMethod === 'vodafone_cash' ? 'فودافون كاش' : (inv.paymentMethod === 'cash' ? 'كاش نقدي' : (inv.paymentMethod === 'card' ? 'فيزا/بطاقة' : (inv.paymentMethod === 'wallet' ? 'محفظة/إنستاباي' : 'دفع مقسم')));
    csv += `"${inv.invoiceNumber}","${timeStr}","${inv.clientName || 'عميل عام'}","${inv.clientPhone || ''}","${inv.barberName || ''}","${payMethod}","${inv.subtotal || inv.total}","${inv.discount || 0}","${inv.tip || 0}","${inv.total}","${status}","${itemsNames.replace(/"/g, '""')}"\n`;
  });
  downloadCSV(csv, `سجل_فواتير_صالون_يوسف_فريست_${new Date().toISOString().split('T')[0]}.csv`);
  showToast('تم تصدير ملف إكسيل الفواتير بنجاح!', 'success');
}

// Export Barber Production & Salon Revenue to Excel / CSV
function exportCommissionsToCSV() {
  const activeInvoices = (state.data.invoices || []).filter(i => !i.isVoided);
  let csv = 'اسم الحلاق,الكرسي,عدد الزبائن,مبيعات الخدمات,مبيعات المنتجات,إجمالي دخل المحل (100%)\n';
  (state.data.barbers || []).forEach(barber => {
    const bInvoices = activeInvoices.filter(inv => inv.barberId == barber.id);
    let bServicesTotal = 0;
    let bProductsTotal = 0;
    bInvoices.forEach(inv => {
      if (inv.items && Array.isArray(inv.items)) {
        inv.items.forEach(it => {
          const itemPrice = (it.price || 0) * (it.qty || 1);
          if (it.type === 'product') bProductsTotal += itemPrice;
          else bServicesTotal += itemPrice;
        });
      } else {
        bServicesTotal += (inv.total || 0);
      }
    });
    const bTotalRevenue = bInvoices.reduce((sum, inv) => sum + inv.total, 0);
    csv += `"${barber.name}","كرسي ${barber.chairId || 1}","${bInvoices.length}","${bServicesTotal}","${bProductsTotal}","${bTotalRevenue}"\n`;
  });
  downloadCSV(csv, `تقرير_إنتاجية_مبيعات_الحلاقين_${new Date().toISOString().split('T')[0]}.csv`);
  showToast('تم تصدير تقرير إنتاجية ومبيعات الحلاقين بنجاح!', 'success');
}

// Dark / Light Mode Switcher
function toggleDarkMode() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('salon_dark_theme', isDark ? 'true' : 'false');
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  showToast(isDark ? 'تم تفعيل الوضع الليلي الفاخر (Dark Mode)' : 'تم تفعيل الوضع النهاري الفاتح (Light Mode)', 'info');
}

// ==========================================
// 7. Event Listeners Initialization
// ==========================================

function initializeApp() {
  // Navigation tabs click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget || link;
      const viewId = target.dataset.view || link.getAttribute('data-view');
      if (viewId) switchView(viewId);
    });
  });

  // Modal close triggers
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-backdrop');
      if (modal) modal.classList.remove('active');
    });
  });

  // Click outside modal backdrop to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  // Quick Add Customer button
  document.getElementById('btn-quick-add-customer')?.addEventListener('click', () => {
    populateQueueServicesChips();
    populateQueueBarbersDropdown();
    document.getElementById('queue-input-name').value = '';
    document.getElementById('queue-input-phone').value = '';
    document.getElementById('queue-input-vip').checked = false;
    openModal('modal-add-customer');
  });

  document.getElementById('btn-queue-add-modal')?.addEventListener('click', () => {
    populateQueueServicesChips();
    populateQueueBarbersDropdown();
    openModal('modal-add-customer');
  });

  // Submit Add Customer to Queue
  document.getElementById('btn-submit-add-queue')?.addEventListener('click', () => {
    const name = document.getElementById('queue-input-name').value.trim();
    if (!name) {
      alert('يرجى إدخال اسم العميل');
      return;
    }

    const phone = document.getElementById('queue-input-phone').value.trim();
    const barberId = document.getElementById('queue-input-barber').value;
    const isVip = document.getElementById('queue-input-vip').checked;

    const selectedServices = [];
    document.querySelectorAll('input[name="queue_services"]:checked').forEach(cb => {
      selectedServices.push(cb.value);
    });

    addClientToQueue({
      name,
      phone,
      barberId: barberId === 'any' ? 'any' : parseInt(barberId),
      services: selectedServices.length > 0 ? selectedServices : ['قص شعر وتصفيف'],
      isVip
    });

    closeModal('modal-add-customer');
  });

  // Confirm Assign Chair
  document.getElementById('btn-confirm-assign-chair')?.addEventListener('click', () => {
    if (!state.pendingChairAssign) return;
    const chairId = parseInt(document.getElementById('select-target-chair').value);
    seatClientOnChair(state.pendingChairAssign, chairId);
    state.pendingChairAssign = null;
    closeModal('modal-assign-chair');
  });

  // POS Category filter buttons
  document.querySelectorAll('.pos-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pos-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCatalogFilter = btn.dataset.cat;
      renderPosCatalog();
    });
  });

  // POS Search input
  document.getElementById('pos-search')?.addEventListener('input', () => {
    renderPosCatalog();
  });

  // POS Active Client Picker change
  document.getElementById('pos-active-client-pick')?.addEventListener('change', (e) => {
    if (!e.target.value) return;
    try {
      const data = JSON.parse(e.target.value);
      document.getElementById('pos-client-name').value = data.name || '';
      const phoneInput = document.getElementById('pos-client-phone');
      if (phoneInput) phoneInput.value = data.phone || '';
      if (data.barberId) {
        document.getElementById('pos-barber-select').value = data.barberId;
      }
      if (data.type === 'chair' && data.chairId) {
        document.getElementById('btn-complete-checkout').dataset.pendingChairId = data.chairId;
      }
      if (data.services && data.services.length > 0) {
        state.cart = [];
        data.services.forEach(srvName => {
          const srv = state.data.services.find(s => s.name === srvName);
          if (srv) {
            state.cart.push({ id: srv.id, name: srv.name, price: srv.price, itemType: 'service', qty: 1 });
          } else {
            state.cart.push({ id: 'srv_' + Date.now(), name: srvName, price: 120, itemType: 'service', qty: 1 });
          }
        });
        renderPosCart();
      }
      showToast(`تم استدعاء بيانات العميل (${data.name})`, 'info');
    } catch (err) {
      console.error(err);
    }
  });

  // POS Discount & Tip input change
  document.getElementById('cart-discount-input')?.addEventListener('input', () => {
    renderPosCart();
  });
  document.getElementById('pos-client-phone')?.addEventListener('change', () => {
    renderPosCart();
    const customer = findCustomerByPhone(document.getElementById('pos-client-phone').value);
    if (state.cart.length && getLoyaltyReward(customer)) {
      showToast(`تم تطبيق خصم الولاء ${state.data.settings.loyaltyDiscountPercent || 10}% على الفاتورة`, 'success');
    }
  });
  document.getElementById('cart-tip-input')?.addEventListener('input', () => {
    renderPosCart();
  });

  // Clear Cart
  document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    state.cart = [];
    renderPosCart();
  });

  // Complete Checkout button
  document.getElementById('btn-complete-checkout')?.addEventListener('click', () => {
    completeCheckout();
  });

  // Print Receipt Trigger
  document.getElementById('btn-trigger-print')?.addEventListener('click', () => {
    window.print();
  });

  // Send Receipt via WhatsApp
  document.getElementById('btn-send-receipt-whatsapp')?.addEventListener('click', () => {
    sendInvoiceWhatsApp();
  });

  // Theme Toggle Button
  document.getElementById('btn-toggle-theme')?.addEventListener('click', () => {
    toggleDarkMode();
  });

  // Keyboard Shortcuts Modal Trigger
  document.getElementById('btn-keyboard-shortcuts')?.addEventListener('click', () => {
    openModal('modal-shortcuts');
  });

  // Reports Excel / CSV Exports
  document.getElementById('btn-export-invoices-csv')?.addEventListener('click', () => {
    exportInvoicesToCSV();
  });
  document.getElementById('btn-export-commissions-csv')?.addEventListener('click', () => {
    exportCommissionsToCSV();
  });
  document.getElementById('btn-export-shift-history')?.addEventListener('click', () => {
    exportShiftHistoryToCSV();
  });

  // Sound Toggle
  document.getElementById('btn-toggle-sound')?.addEventListener('click', () => {
    state.data.settings.soundEnabled = !state.data.settings.soundEnabled;
    const icon = document.getElementById('sound-icon');
    if (state.data.settings.soundEnabled) {
      icon.className = 'fa-solid fa-volume-high';
      icon.style.color = 'var(--gold)';
    } else {
      icon.className = 'fa-solid fa-volume-xmark';
      icon.style.color = 'var(--danger)';
    }
    state.saveData();
  });

  // Fullscreen Toggle
  document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => alert(err.message));
    } else {
      document.exitFullscreen();
    }
  });

  // Appointments controls
  const aptPicker = document.getElementById('apt-date-picker');
  if (aptPicker) {
    aptPicker.value = new Date().toISOString().split('T')[0];
    aptPicker.addEventListener('change', renderAppointments);
  }
  document.getElementById('btn-apt-today')?.addEventListener('click', () => {
    if (aptPicker) aptPicker.value = new Date().toISOString().split('T')[0];
    renderAppointments();
  });

  document.getElementById('btn-open-add-apt')?.addEventListener('click', () => {
    populateQueueBarbersDropdown();
    document.getElementById('apt-input-date').value = new Date().toISOString().split('T')[0];
    openModal('modal-add-appointment');
  });

  document.getElementById('btn-submit-appointment')?.addEventListener('click', () => {
    const name = document.getElementById('apt-input-name').value.trim();
    const phone = document.getElementById('apt-input-phone').value.trim();
    const date = document.getElementById('apt-input-date').value;
    const time = document.getElementById('apt-input-time').value;
    const barberId = parseInt(document.getElementById('apt-input-barber').value) || 1;
    const services = document.getElementById('apt-input-services').value.trim() || 'قص وتصفيف';

    if (!name || !phone || !date || !time) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (!state.data.appointments) state.data.appointments = [];
    state.data.appointments.push({
      id: 'apt_' + Date.now(),
      name,
      phone,
      date,
      time,
      barberId,
      services,
      status: 'confirmed'
    });

    state.saveData();
    renderAppointments();
    closeModal('modal-add-appointment');
    SoundSystem.playSuccessBeep();
  });

  // Barbers Modal Trigger
  document.getElementById('btn-open-add-barber')?.addEventListener('click', () => {
    const heading = document.getElementById('modal-barber-heading');
    if (heading) heading.innerHTML = '<i class="fa-solid fa-scissors"></i> إضافة حلاق جديد';
    document.getElementById('barber-edit-id').value = '';
    document.getElementById('barber-input-name').value = '';
    document.getElementById('barber-input-phone').value = '';
    document.getElementById('barber-input-chair').value = (state.data.barbers.length + 1);
    const commEl = document.getElementById('barber-input-comm');
    if (commEl) commEl.value = '0';
    document.getElementById('barber-input-title').value = '';
    openModal('modal-add-barber');
  });

  // Submit Add / Edit Barber
  document.getElementById('btn-submit-barber')?.addEventListener('click', () => {
    const editId = document.getElementById('barber-edit-id').value;
    const name = document.getElementById('barber-input-name').value.trim();
    const phone = document.getElementById('barber-input-phone').value.trim();
    const chairId = parseInt(document.getElementById('barber-input-chair').value) || 1;
    const commissionRate = 0; // 100% of revenue to the salon
    const title = document.getElementById('barber-input-title').value.trim() || 'حلاق محترف';

    if (!name) {
      alert('يرجى إدخال اسم الحلاق');
      return;
    }

    if (editId) {
      // Update existing barber
      const barber = state.data.barbers.find(b => b.id.toString() === editId.toString());
      if (barber) {
        barber.name = name;
        barber.phone = phone;
        barber.chairId = chairId;
        barber.commissionRate = commissionRate;
        barber.title = title;

        // Auto map chair if matching
        const chair = state.data.chairs.find(c => c.id === chairId);
        if (chair) chair.barberId = barber.id;

        if (window.SalonApi && typeof window.SalonApi.updateBarber === 'function') {
          window.SalonApi.updateBarber({
            barberID: barber.id,
            fullName: name,
            phone,
            commissionRate,
            title
          }).catch(() => {});
        }

        showToast(`تم تعديل بيانات الحلاق (${name}) بنجاح`, 'success');
      }
    } else {
      // Create new barber
      const newBarber = {
        id: Date.now(),
        name,
        phone,
        chairId,
        commissionRate,
        avatar: 'assets/logo.jpg',
        title,
        todayClients: 0,
        todayRevenue: 0,
        status: 'active'
      };
      state.data.barbers.push(newBarber);

      // Link to chair if available
      const chair = state.data.chairs.find(c => c.id === chairId);
      if (chair) chair.barberId = newBarber.id;

      if (window.SalonApi && typeof window.SalonApi.addBarber === 'function') {
        window.SalonApi.addBarber({
          fullName: name,
          phone,
          commissionRate,
          title
        }).catch(() => {});
      }

      showToast(`تم إضافة الحلاق (${name}) بنجاح`, 'success');
    }

    state.saveData();
    renderApp();
    closeModal('modal-add-barber');
    SoundSystem.playSuccessBeep();
  });

  // Chairs Management Buttons
  document.getElementById('btn-add-new-chair')?.addEventListener('click', () => {
    openAddChairModal();
  });

  document.getElementById('btn-submit-chair')?.addEventListener('click', () => {
    const editId = document.getElementById('chair-edit-id').value;
    const name = document.getElementById('chair-input-name').value.trim();
    const barberVal = document.getElementById('chair-input-barber').value;
    const barberId = barberVal ? parseInt(barberVal) : null;

    if (!name) {
      alert('يرجى إدخال اسم الكرسي');
      return;
    }

    if (editId === 'new') {
      const nextId = (state.data.chairs.length > 0 ? Math.max(...state.data.chairs.map(c => c.id)) : 0) + 1;
      const newChair = {
        id: nextId,
        name: name,
        barberId: barberId,
        status: 'available',
        currentClient: null
      };
      state.data.chairs.push(newChair);
      showToast(`تم إضافة (${name}) بنجاح`, 'success');
    } else {
      const chair = state.data.chairs.find(c => c.id.toString() === editId.toString());
      if (chair) {
        chair.name = name;
        chair.barberId = barberId;
        if (window.SalonApi && typeof window.SalonApi.assignChairBarber === 'function') {
          window.SalonApi.assignChairBarber(chair.id, barberId).catch(() => {});
        }
        showToast(`تم تحديث بيانات (${name}) بنجاح`, 'success');
      }
    }

    state.saveData();
    renderApp();
    closeModal('modal-edit-chair');
    SoundSystem.playSuccessBeep();
  });

  document.getElementById('btn-delete-chair')?.addEventListener('click', () => {
    const editId = document.getElementById('chair-edit-id').value;
    const chair = state.data.chairs.find(c => c.id.toString() === editId.toString());
    if (!chair) return;

    if (chair.status === 'busy') {
      alert('لا يمكن حذف الكرسي لأنه مشغول حالياً بعميل! يرجى إنهاء الحساب أولاً.');
      return;
    }

    if (state.data.chairs.length <= 1) {
      alert('يجب الإبقاء على كرسي واحد على الأقل في الصالون!');
      return;
    }

    if (!confirm(`هل أنت متأكد من حذف (${chair.name || 'كرسي رقم ' + chair.id})؟`)) return;

    state.data.chairs = state.data.chairs.filter(c => c.id.toString() !== editId.toString());
    state.saveData();
    renderApp();
    closeModal('modal-edit-chair');
    showToast('تم حذف الكرسي بنجاح', 'success');
  });

  // Services / Products Subnav Toggle
  document.getElementById('tab-btn-services-list')?.addEventListener('click', () => {
    document.getElementById('tab-btn-services-list').classList.add('active');
    document.getElementById('tab-btn-products-list').classList.remove('active');
    document.getElementById('services-table-wrapper').style.display = 'block';
    document.getElementById('products-table-wrapper').style.display = 'none';
    document.getElementById('btn-catalog-label').textContent = 'إضافة خدمة جديدة';
  });

  document.getElementById('tab-btn-products-list')?.addEventListener('click', () => {
    document.getElementById('tab-btn-products-list').classList.add('active');
    document.getElementById('tab-btn-services-list').classList.remove('active');
    document.getElementById('services-table-wrapper').style.display = 'none';
    document.getElementById('products-table-wrapper').style.display = 'block';
    document.getElementById('btn-catalog-label').textContent = 'إضافة منتج جديد';
  });

  // Open Add Catalog Item Modal
  document.getElementById('btn-open-add-catalog-item')?.addEventListener('click', () => {
    const isService = document.getElementById('tab-btn-services-list').classList.contains('active');
    document.getElementById('modal-item-title').innerHTML = isService ?
      '<i class="fa-solid fa-scissors"></i> إضافة خدمة جديدة' :
      '<i class="fa-solid fa-box"></i> إضافة منتج للبيع';

    document.getElementById('group-item-cat').style.display = isService ? 'flex' : 'none';
    document.getElementById('group-item-duration').style.display = isService ? 'flex' : 'none';
    document.getElementById('group-item-stock').style.display = isService ? 'none' : 'flex';
    openModal('modal-add-item');
  });

  document.getElementById('btn-submit-item')?.addEventListener('click', () => {
    const isService = document.getElementById('tab-btn-services-list').classList.contains('active');
    const name = document.getElementById('item-input-name').value.trim();
    const price = parseFloat(document.getElementById('item-input-price').value) || 0;

    if (!name || price <= 0) {
      alert('يرجى إدخال اسم وسعر صحيح');
      return;
    }

    if (isService) {
      const category = document.getElementById('item-input-category').value;
      const duration = parseInt(document.getElementById('item-input-duration').value) || 30;
      state.data.services.push({
        id: Date.now(),
        name,
        category,
        price,
        duration,
        icon: 'fa-shop'
      });
    } else {
      const stock = parseInt(document.getElementById('item-input-stock').value) || 10;
      state.data.products.push({
        id: Date.now(),
        name,
        category: 'منتجات',
        price,
        cost: price * 0.6,
        stock,
        icon: 'fa-bottle-water'
      });
    }

    state.saveData();
    renderApp();
    closeModal('modal-add-item');
  });

  // Expenses Modal
  document.getElementById('btn-open-expense-modal')?.addEventListener('click', () => {
    openModal('modal-add-expense');
  });

  document.getElementById('btn-submit-expense')?.addEventListener('click', () => {
    const desc = document.getElementById('exp-input-desc').value.trim();
    const amount = parseFloat(document.getElementById('exp-input-amount').value) || 0;
    if (!desc || amount <= 0) {
      alert('يرجى إدخال بند المصروف والمبلغ');
      return;
    }
    addExpense(desc, amount);
    closeModal('modal-add-expense');
    document.getElementById('exp-input-desc').value = '';
    document.getElementById('exp-input-amount').value = '';
  });

  // Close Shift Modal
  document.getElementById('btn-open-close-shift')?.addEventListener('click', () => {
    requireAdminAuth(() => {
      openModal('modal-close-shift');
    }, 'تقفيل الوردية ومعاينة الحسابات');
  });

  document.getElementById('btn-confirm-close-shift')?.addEventListener('click', () => {
    const notes = document.getElementById('shift-modal-notes').value.trim();
    closeModal('modal-close-shift');
    closeCurrentShift(notes);
    showToast('تم حفظ قفلة الوردية وفتح وردية جديدة، التقرير جاهز للطباعة', 'success');
  });

  // Print Z-Report
  document.getElementById('btn-print-z-report')?.addEventListener('click', () => {
    window.print();
  });

  // Transfer Chair Confirmation
  document.getElementById('btn-confirm-transfer-chair')?.addEventListener('click', () => {
    confirmTransferChair();
  });

  // Settings Modal (Protected with Admin Auth)
  const openSettingsHandler = () => {
    requireAdminAuth(() => {
      document.getElementById('set-shop-name').value = state.data.settings.shopName || '';
      document.getElementById('set-shop-phone').value = state.data.settings.shopPhone || '';
      document.getElementById('set-shop-currency').value = state.data.settings.currency || 'ج.م';
      document.getElementById('set-shop-address').value = state.data.settings.shopAddress || '';
      document.getElementById('set-receipt-footer').value = state.data.settings.receiptFooter || '';
      document.getElementById('set-admin-pin').value = state.data.settings.adminPin || '1234';

      if (window.SalonCloudDB) {
        const cloudCfg = window.SalonCloudDB.getConfig();
        const projEl = document.getElementById('cloud-project-id');
        const keyEl = document.getElementById('cloud-api-key');
        if (projEl) projEl.value = cloudCfg.projectId || 'sayed-first-salon';
        if (keyEl) keyEl.value = cloudCfg.apiKey || '';
      }

      openModal('modal-settings');
    }, 'إعدادات الصالون');
  };

  document.getElementById('btn-open-settings')?.addEventListener('click', openSettingsHandler);
  document.getElementById('cloud-status-badge')?.addEventListener('click', openSettingsHandler);

  document.getElementById('btn-save-settings')?.addEventListener('click', () => {
    state.data.settings.shopName = document.getElementById('set-shop-name').value.trim();
    state.data.settings.shopPhone = document.getElementById('set-shop-phone').value.trim();
    state.data.settings.currency = document.getElementById('set-shop-currency').value;
    state.data.settings.shopAddress = document.getElementById('set-shop-address').value.trim();
    state.data.settings.receiptFooter = document.getElementById('set-receipt-footer').value.trim();
    const newPin = document.getElementById('set-admin-pin').value.trim();
    if (newPin && newPin.length >= 4) {
      state.data.settings.adminPin = newPin;
    }

    // Save Cloud DB configuration
    const projId = document.getElementById('cloud-project-id')?.value.trim();
    const apiKey = document.getElementById('cloud-api-key')?.value.trim();
    if (window.SalonCloudDB && projId) {
      window.SalonCloudDB.saveConfig({ projectId: projId, apiKey: apiKey || '' });
    }

    document.getElementById('sidebar-shop-name').textContent = state.data.settings.shopName;
    document.getElementById('currency-tag-discount').textContent = state.data.settings.currency;

    state.saveData();
    renderApp();
    closeModal('modal-settings');
    showToast('تم حفظ إعدادات الصالون وقاعدة البيانات السحابية بنجاح', 'success');
  });

  document.getElementById('btn-save-loyalty-settings')?.addEventListener('click', () => {
    requireAdminAuth(() => {
      const visits = Math.max(1, Math.min(100, parseInt(document.getElementById('crm-loyalty-visits').value) || 5));
      const percent = Math.max(1, Math.min(100, parseInt(document.getElementById('crm-loyalty-percent').value) || 10));
      state.data.settings.loyaltyVisitThreshold = visits;
      state.data.settings.loyaltyDiscountPercent = percent;
      state.saveData();
      renderCustomersList();
      showToast(`تم تحديث الولاء: خصم ${percent}% بعد كل ${visits} زيارات`, 'success');
    }, 'تعديل نظام الولاء');
  });

  // Manual Trigger: Sync Local Salon Data to Cloud
  document.getElementById('btn-sync-to-cloud')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-sync-to-cloud');
    if (!btn || !window.SalonCloudDB) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري رفع ومزامنة البيانات...';

    const result = await window.SalonCloudDB.syncAllToCloud(state.data);
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> مزامنة البيانات للسحابة الآن';

    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'info');
    }
  });

  // Role Toggle Switchers (Header badge & Status strip button)
  document.getElementById('btn-role-toggle')?.addEventListener('click', toggleRole);
  document.getElementById('btn-strip-toggle')?.addEventListener('click', toggleRole);

  // System Lock Screen
  document.getElementById('btn-lock-system')?.addEventListener('click', () => {
    lockSystem();
  });

  document.getElementById('btn-submit-unlock')?.addEventListener('click', () => {
    unlockSystem();
  });

  document.getElementById('input-lock-pin')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') unlockSystem();
  });

  // PIN Keypad buttons
  document.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = btn.dataset.num;
      if (num !== undefined) {
        handlePinKeyPress(num);
      } else if (btn.id === 'btn-pin-clear') {
        handlePinKeyPress('clear');
      } else if (btn.id === 'btn-pin-submit') {
        handlePinKeyPress('submit');
      }
    });
  });

  // Mobile sidebar drawer
  const sidebar = document.querySelector('.app-sidebar');
  const mobileBackdrop = document.getElementById('sidebar-mobile-backdrop');
  const toggleBtn = document.getElementById('btn-toggle-sidebar');

  toggleBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
    mobileBackdrop?.classList.toggle('active');
  });

  mobileBackdrop?.addEventListener('click', () => {
    sidebar?.classList.remove('mobile-open');
    mobileBackdrop?.classList.remove('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        sidebar?.classList.remove('mobile-open');
        mobileBackdrop?.classList.remove('active');
      }
    });
  });

  // Backup: Export JSON
  document.getElementById('btn-export-backup')?.addEventListener('click', () => {
    const jsonStr = JSON.stringify(state.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barbershop_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير النسخة الاحتياطية بنجاح', 'success');
  });

  // Backup: Import JSON
  document.getElementById('input-import-backup')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.chairs && imported.barbers) {
          state.saveData(imported);
          renderApp();
          showToast('تم استيراد النسخة الاحتياطية بنجاح!', 'success');
        } else {
          showToast('الملف غير صالح أو لا يحتوي على بنية بيانات الصالون الصحيحة.', 'danger');
        }
      } catch (err) {
        showToast('خطأ أثناء قراءة ملف النسخة الاحتياطية: ' + err.message, 'danger');
      }
    };
    reader.readAsText(file);
  });

  // Reset Demo Data
  document.getElementById('btn-reset-demo-data')?.addEventListener('click', () => {
    requireAdminAuth(() => {
      if (confirm('هل تريد بالتأكيد إعادة ضبط النظام إلى البيانات التوضيحية الافتراضية؟ سيتم مسح التغييرات الحالية.')) {
        state.saveData(DEFAULT_DATA);
        renderApp();
        showToast('تمت إعادة ضبط البيانات بنجاح', 'info');
      }
    }, 'إعادة ضبط بيانات النظام');
  });

  // Listen to remote changes
  window.addEventListener('storage', () => {
    state.data = state.loadData();
    renderApp();
  });

  // Splash Screen Intro Animation: Auto-dismiss & Click-to-dismiss
  const splashEl = document.getElementById('salon-splash-screen');
  if (splashEl) {
    const dismissSplash = () => {
      if (splashEl.classList.contains('fade-out')) return;
      splashEl.classList.add('fade-out');
      setTimeout(() => {
        splashEl.style.display = 'none';
      }, 650);
    };

    // Keep the intro brief so the reception screen is ready quickly.
    setTimeout(dismissSplash, 700);

    // Instant dismiss if clicked anywhere
    splashEl.addEventListener('click', dismissSplash);
  }

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If inside modal and pressed Escape
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        return;
      }
    }

    // Function keys or Alt combinations
    if (e.key === 'F1') {
      e.preventDefault();
      switchView('view-chairs');
    } else if (e.key === 'F2') {
      e.preventDefault();
      switchView('view-pos');
    } else if (e.key === 'F3') {
      e.preventDefault();
      switchView('view-appointments');
    } else if (e.key === 'F4') {
      e.preventDefault();
      populateQueueServicesChips();
      populateQueueBarbersDropdown();
      document.getElementById('queue-input-name').value = '';
      document.getElementById('queue-input-phone').value = '';
      document.getElementById('queue-input-vip').checked = false;
      openModal('modal-add-customer');
    } else if (e.key === 'F7') {
      e.preventDefault();
      switchView('view-reports');
    } else if (e.key === 'F8') {
      e.preventDefault();
      openModal('modal-quick-custom-item');
    } else if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      const checkoutBtn = document.getElementById('btn-complete-checkout');
      if (checkoutBtn && !checkoutBtn.disabled && state.cart.length > 0) {
        completeCheckout();
      }
    } else if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      lockSystem();
    } else if (e.altKey && (e.key === 't' || e.key === 'T' || e.key === 'ف')) {
      e.preventDefault();
      toggleDarkMode();
    }
  });

  // Check saved dark theme preference
  if (localStorage.getItem('salon_dark_theme') === 'true') {
    document.body.classList.add('dark-theme');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  // Initial check for system lock
  if (state.data.settings && state.data.settings.isLocked) {
    lockSystem();
  }

  // Cloud Database Integration & Listeners
  if (window.SalonCloudDB) {
    const updateCloudUI = (status) => {
      const headerBadge = document.getElementById('cloud-status-badge');
      const headerText = document.getElementById('cloud-status-text');
      const modalBadge = document.getElementById('modal-cloud-badge');
      const modalText = document.getElementById('modal-cloud-text');

      let label = 'سحابي متصل';
      if (status === 'local') label = 'تخزين محلي';
      else if (status === 'offline') label = 'بدون إنترنت';

      [headerBadge, modalBadge].forEach(b => {
        if (b) b.className = `cloud-status-badge ${status}`;
      });
      [headerText, modalText].forEach(t => {
        if (t) t.textContent = label;
      });
    };

    window.SalonCloudDB.onStatusChange(updateCloudUI);

    // Listen for incoming customer reservations in Real-Time
    window.SalonCloudDB.listenToNewBookings((booking, changeType) => {
      if (changeType === 'added') {
        if (!state.data.appointments) state.data.appointments = [];
        const exists = state.data.appointments.some(a => (booking.id && a.id === booking.id) || (booking.bookingRef && a.bookingRef === booking.bookingRef));
        if (!exists) {
          state.data.appointments.push(booking);
          state.saveData();
          renderAppointments();
          SoundSystem.playChime();
          showToast(` حجز جديد أونلاين: ${booking.name} (${booking.time})`, 'success');
        }
      }
    });
  }

  // ==========================================
  // .NET 8 Backend API & Microsoft SQL Server Real-Time Sync
  // ==========================================
  if (window.SalonApi) {
    window.SalonApi.checkHealth().then(async (isConnected) => {
      if (isConnected) {
        try {
          const remoteState = await window.SalonApi.getFullState();
          if (remoteState && remoteState.success) {
            // Sync barbers if available
            if (remoteState.barbers && remoteState.barbers.length > 0) {
              remoteState.barbers.forEach(rb => {
                const localB = state.data.barbers.find(b => b.id === rb.barberID || b.name === rb.fullName);
                if (localB) {
                  localB.todayClients = rb.todayClients;
                  localB.todayRevenue = rb.todayRevenue;
                }
              });
            }
            // Sync appointments from SQL Server
            if (remoteState.appointments && remoteState.appointments.length > 0) {
              remoteState.appointments.forEach(ra => {
                const exists = (state.data.appointments || []).some(a => a.bookingRef === ra.bookingRef || a.id === 'apt_' + ra.appointmentID);
                if (!exists) {
                  state.data.appointments.unshift({
                    id: 'apt_' + ra.appointmentID,
                    bookingRef: ra.bookingRef,
                    name: ra.customerName,
                    phone: ra.customerPhone,
                    date: ra.appointmentDate,
                    time: ra.appointmentTime,
                    services: ra.servicesRequested,
                    barberId: ra.barberID || 'any',
                    status: ra.status
                  });
                }
              });
            }

            // Sync chairs from SQL Server
            if (remoteState.chairs && remoteState.chairs.length > 0) {
              remoteState.chairs.forEach(rc => {
                const localC = state.data.chairs.find(c => c.id === rc.chairID);
                if (localC) {
                  if (rc.barberID) localC.barberId = rc.barberID;
                  if (rc.status === 'busy' && rc.currentClientName) {
                    localC.status = 'busy';
                    if (!localC.currentClient) {
                      localC.currentClient = {
                        name: rc.currentClientName,
                        phone: rc.currentClientPhone || '',
                        services: ['خدمات الصالون'],
                        startedAt: rc.startedAt || new Date().toISOString()
                      };
                    }
                  } else if (rc.status === 'available') {
                    localC.status = 'available';
                    localC.currentClient = null;
                  }
                }
              });
            }

            // Sync Invoices from SQL Server
            if (remoteState.invoices && remoteState.invoices.length > 0) {
              remoteState.invoices.forEach(ri => {
                const exists = (state.data.invoices || []).some(inv => inv.invoiceNumber === ri.invoiceNumber);
                if (!exists) {
                  state.data.invoices.push({
                    id: 'inv_sql_' + ri.invoiceID,
                    invoiceNumber: ri.invoiceNumber,
                    timestamp: ri.createdAt,
                    clientName: ri.clientName,
                    clientPhone: ri.clientPhone,
                    barberId: ri.barberID,
                    barberName: ri.barberName || 'مستر / يوسف فريست',
                    items: (ri.items || []).map(it => ({
                      id: it.itemID,
                      name: it.itemName,
                      price: it.unitPrice,
                      itemType: it.itemType,
                      qty: it.quantity
                    })),
                    subtotal: ri.subtotal,
                    discount: ri.discount,
                    tip: ri.tipAmount,
                    total: ri.totalAmount,
                    paymentMethod: ri.paymentMethod,
                    isVoided: ri.isVoided
                  });
                }
              });
            }

            // Sync Expenses from SQL Server
            if (remoteState.expenses && remoteState.expenses.length > 0) {
              remoteState.expenses.forEach(re => {
                const exists = (state.data.expenses || []).some(exp => exp.id === 'exp_' + re.expenseID);
                if (!exists) {
                  state.data.expenses.push({
                    id: 'exp_' + re.expenseID,
                    desc: re.description,
                    amount: re.amount,
                    timestamp: re.createdAt
                  });
                }
              });
            }

            // Sync Customers CRM from SQL Server
            if (remoteState.customers && remoteState.customers.length > 0) {
              remoteState.customers.forEach(rc => {
                const localCust = (state.data.customers || []).find(c => c.phone && c.phone === rc.phone);
                if (!localCust) {
                  state.data.customers.push({
                    id: 'cust_sql_' + rc.customerID,
                    name: rc.fullName,
                    phone: rc.phone,
                    notes: rc.notes || '',
                    totalVisits: rc.totalVisits,
                    totalSpent: rc.totalSpent,
                    loyaltyPoints: rc.loyaltyPoints,
                    lastVisit: null,
                    createdAt: rc.createdAt
                  });
                } else {
                  localCust.totalVisits = Math.max(localCust.totalVisits || 0, rc.totalVisits);
                  localCust.totalSpent = Math.max(localCust.totalSpent || 0, rc.totalSpent);
                  localCust.loyaltyPoints = Math.max(localCust.loyaltyPoints || 0, rc.loyaltyPoints);
                }
              });
            }

            renderApp();
          }
        } catch (err) {
          console.warn('Backend full state sync:', err);
        }
      }
    });

    // Real-Time Polling for new online bookings from SQL Server (every 8 seconds)
    setInterval(async () => {
      if (window.SalonApi.isBackendConnected) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const res = await fetch(`${window.SalonApi.baseUrl}/appointments?date=${today}`);
          if (res.ok) {
            const list = await res.json();
            let newBookingCount = 0;
            list.forEach(ra => {
              const exists = (state.data.appointments || []).some(a => a.bookingRef === ra.bookingRef || a.id === 'apt_' + ra.appointmentID);
              if (!exists) {
                state.data.appointments.unshift({
                  id: 'apt_' + ra.appointmentID,
                  bookingRef: ra.bookingRef,
                  name: ra.customerName,
                  phone: ra.customerPhone,
                  date: ra.appointmentDate,
                  time: ra.appointmentTime,
                  services: ra.servicesRequested,
                  barberId: ra.barberID || 'any',
                  status: ra.status
                });
                newBookingCount++;
              }
            });
            if (newBookingCount > 0) {
              state.saveData();
              renderAppointments();
              SoundSystem.playChime();
              showToast(` تم استلام ${newBookingCount} حجز جديد من قاعدة بيانات SQL Server!`, 'success');
            }
          }
        } catch (e) {}
      }
    }, 8000);
  }

  // Initial render & Role UI
  updateRoleUI();
  renderApp();
}

// Execute immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
