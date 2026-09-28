/**
 * صالون سيد فرست (Sayed First) - Cloud Database Engine (Firebase Firestore)
 * Enables Real-Time Cloud Synchronization, Online Customer Booking & Remote Admin Access
 */

const FIREBASE_STORAGE_CONFIG_KEY = 'salon_firebase_config_v1';

// Default Demo / Starter Cloud Configuration
// Can be customized directly from the Settings Modal inside the App
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "sayed-first-salon",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

class SalonCloudDatabase {
  constructor() {
    this.app = null;
    this.db = null;
    this.isInitialized = false;
    this.isOnline = navigator.onLine;
    this.listeners = [];
    this.onStatusChangeCallbacks = [];

    // Track network connectivity
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyStatusChange('online');
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyStatusChange('offline');
    });

    this.init();
  }

  // Load configuration from localStorage or default
  getConfig() {
    try {
      const saved = localStorage.getItem(FIREBASE_STORAGE_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading saved cloud config:', e);
    }
    return DEFAULT_FIREBASE_CONFIG;
  }

  saveConfig(newConfig) {
    try {
      localStorage.setItem(FIREBASE_STORAGE_CONFIG_KEY, JSON.stringify(newConfig));
      this.init(newConfig);
      return true;
    } catch (e) {
      console.error('Error saving cloud config:', e);
      return false;
    }
  }

  hasValidCredentials(config) {
    return Boolean(config && config.apiKey && config.apiKey.length > 10 && config.projectId && config.projectId !== 'sayed-first-salon');
  }

  init(customConfig = null) {
    const config = customConfig || this.getConfig();

    // Check if Firebase SDK is loaded on page
    if (typeof firebase === 'undefined') {
      console.log('Firebase SDK not yet loaded. Operating in offline-safe local mode.');
      this.isInitialized = false;
      this.notifyStatusChange('local');
      return;
    }

    // Only attempt remote cloud connection if valid real credentials are provided
    if (!this.hasValidCredentials(config)) {
      console.log('Running in high-speed local mode. Valid Firebase credentials not yet configured.');
      this.isInitialized = false;
      this.notifyStatusChange('local');
      return;
    }

    try {
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(config);
      } else {
        this.app = firebase.app();
      }

      this.db = firebase.firestore();
      
      // Enable Firestore offline persistence
      this.db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        if (err.code == 'failed-precondition') {
        } else if (err.code == 'unimplemented') {
        }
      });

      this.isInitialized = true;
      this.notifyStatusChange('connected');
      console.log('✅ Salon Cloud Database initialized successfully for project:', config.projectId);
    } catch (err) {
      console.warn('Firebase init warning:', err.message);
      this.isInitialized = false;
      this.notifyStatusChange('local');
    }
  }

  onStatusChange(callback) {
    this.onStatusChangeCallbacks.push(callback);
    // Send immediate initial status
    callback(this.getStatus());
  }

  notifyStatusChange(status) {
    const currentStatus = status || this.getStatus();
    this.onStatusChangeCallbacks.forEach(cb => {
      try { cb(currentStatus); } catch (e) {}
    });
  }

  getStatus() {
    if (!this.isOnline) return 'offline';
    if (!this.isInitialized) return 'local';
    return 'connected';
  }

  // ----------------------------------------------------
  // Cloud Operations: Appointments (Bookings)
  // ----------------------------------------------------

  // Listen for real-time online customer reservations
  listenToNewBookings(callback) {
    if (!this.isInitialized || !this.db) return null;

    try {
      const unsubscribe = this.db.collection('appointments')
        .where('date', '>=', new Date().toISOString().split('T')[0])
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added' || change.type === 'modified') {
              const data = change.doc.data();
              data.id = change.doc.id;
              callback(data, change.type);
            }
          });
        }, (error) => {
          console.warn('Firestore bookings listener error:', error);
        });

      this.listeners.push(unsubscribe);
      return unsubscribe;
    } catch (e) {
      console.warn('Could not attach booking listener:', e);
      return null;
    }
  }

  // Create an appointment from online customer booking page (Zero-Lag Instant Save)
  async createOnlineBooking(bookingData) {
    const docData = {
      ...bookingData,
      createdAt: new Date().toISOString(),
      source: 'online_customer_portal',
      status: 'confirmed'
    };

    const localId = 'apt_online_' + Date.now();
    docData.id = localId;

    // 1. Instant local persistence and Broadcast (Executes in <1ms)
    try {
      const STORAGE_KEY = 'barbershop_data_v1';
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (!local.appointments) local.appointments = [];
      local.appointments.push(docData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(local));

      // Broadcast to salon reception dashboard immediately
      try {
        const bc = new BroadcastChannel('barbershop_channel');
        bc.postMessage({ type: 'DATA_UPDATED', payload: docData });
      } catch (e) {}
    } catch (err) {
      console.warn('Local save warning:', err);
    }

    // 2. If valid Cloud Firestore is connected, attempt sync with 1.8s timeout
    if (this.isInitialized && this.db) {
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1800));
        const cloudPromise = this.db.collection('appointments').add(docData);
        const ref = await Promise.race([cloudPromise, timeoutPromise]);
        if (ref && ref.id) {
          docData.id = ref.id;
        }
      } catch (err) {
        console.log('Cloud write timed out or offline, data safely stored locally:', err.message);
      }
    }

    return { success: true, id: docData.id || localId, data: docData };
  }

  // ----------------------------------------------------
  // Sync Entire Salon State to/from Cloud
  // ----------------------------------------------------

  // Sync complete local salon state to Cloud Firestore
  async syncAllToCloud(salonData) {
    if (!this.isInitialized || !this.db) {
      return { success: false, message: 'قاعدة البيانات السحابية غير متصلة بعد، البيانات محفوظة محلياً.' };
    }

    try {
      const batch = this.db.batch();
      const shopDocRef = this.db.collection('salon').doc('main_store');

      batch.set(shopDocRef, {
        settings: salonData.settings || {},
        shift: salonData.shift || {},
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Save collections
      const collectionsToSync = ['barbers', 'chairs', 'services', 'products', 'appointments', 'invoices', 'customers', 'expenses'];

      for (const col of collectionsToSync) {
        if (Array.isArray(salonData[col])) {
          const colRef = this.db.collection('salon').doc('main_store').collection(col);
          salonData[col].forEach(item => {
            const itemRef = colRef.doc(String(item.id));
            batch.set(itemRef, item, { merge: true });
          });
        }
      }

      await batch.commit();
      return { success: true, message: 'تمت مزامنة جميع البيانات مع السحابة بنجاح!' };
    } catch (err) {
      console.error('Batch sync to cloud failed:', err);
      return { success: false, message: 'خطأ أثناء المزامنة: ' + err.message };
    }
  }

  // Pull latest updates from Cloud to Local
  async fetchFromCloud() {
    if (!this.isInitialized || !this.db) return null;

    try {
      const shopDoc = await this.db.collection('salon').doc('main_store').get();
      if (!shopDoc.exists) return null;

      const cloudData = shopDoc.data();
      const fullData = {
        settings: cloudData.settings,
        shift: cloudData.shift
      };

      const collectionsToFetch = ['barbers', 'chairs', 'services', 'products', 'appointments', 'invoices', 'customers', 'expenses'];
      for (const col of collectionsToFetch) {
        const snap = await this.db.collection('salon').doc('main_store').collection(col).get();
        fullData[col] = snap.docs.map(d => d.data());
      }

      return fullData;
    } catch (err) {
      console.error('Fetch from cloud failed:', err);
      return null;
    }
  }
}

// Expose singleton to window
window.SalonCloudDB = new SalonCloudDatabase();
