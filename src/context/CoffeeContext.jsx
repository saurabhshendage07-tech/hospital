import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_WAITERS,
  INITIAL_ORDERS,
  INITIAL_DISCOUNTS,
  SHOP_INFO
} from '../data/initialData';
import { db, auth } from '../firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('coffe_role') || 'admin');
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => localStorage.getItem('coffe_admin_auth') === 'true');
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem('coffe_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [activeWaiter, setActiveWaiter] = useState(() => {
    const saved = localStorage.getItem('coffe_waiter');
    return saved ? JSON.parse(saved) : INITIAL_WAITERS[0];
  });

  // Local State with INITIAL_DATA defaults
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('coffe_menu_v5');
    if (!saved) return INITIAL_MENU_ITEMS;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length < INITIAL_MENU_ITEMS.length || !parsed.some(i => i.category === 'hot')) {
        return INITIAL_MENU_ITEMS;
      }
      return parsed;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('coffe_tables_v5');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('coffe_orders_v5');
    if (!saved) return INITIAL_ORDERS;
    try {
      const parsed = JSON.parse(saved);
      return parsed;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [waiters] = useState(INITIAL_WAITERS);
  const [discounts] = useState(INITIAL_DISCOUNTS);
  const [shopInfo] = useState(SHOP_INFO);

  const [toast, setToast] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTableId, setSelectedTableId] = useState(1);
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  // Billing & Receipt modal state
  const [billingModalOrder, setBillingModalOrder] = useState(null);
  const [kotModalOrder, setKotModalOrder] = useState(null);

  // Activity Log
  const [logs, setLogs] = useState(() => {
    return [
      { id: 'l1', text: 'System initialized with Cafe Pailwan menu board', time: new Date().toLocaleTimeString(), type: 'system' },
      { id: 'l2', text: 'Table 02 requested final bill settlement', time: new Date(Date.now() - 50000).toLocaleTimeString(), type: 'bill' },
      { id: 'l3', text: 'Rahul Sharma created Order #ORD-1001 for Table 01', time: new Date(Date.now() - 120000).toLocaleTimeString(), type: 'order' }
    ];
  });

  // LocalStorage Fallback Backup
  useEffect(() => {
    localStorage.setItem('coffe_role', role);
    localStorage.setItem('coffe_admin_auth', adminLoggedIn);
    if (authUser) {
      localStorage.setItem('coffe_auth_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('coffe_auth_user');
    }
    localStorage.setItem('coffe_waiter', JSON.stringify(activeWaiter));
    localStorage.setItem('coffe_menu_v5', JSON.stringify(menuItems));
    localStorage.setItem('coffe_tables_v5', JSON.stringify(tables));
    localStorage.setItem('coffe_orders_v5', JSON.stringify(orders));
  }, [role, adminLoggedIn, authUser, activeWaiter, menuItems, tables, orders]);

  // Firebase Auth State Listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Admin',
        };
        setAuthUser(userData);
        setAdminLoggedIn(true);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // ==================== FIREBASE FIRESTORE REAL-TIME SYNC ====================
  useEffect(() => {
    let unsubscribeOrders;
    let unsubscribeTables;
    let unsubscribeMenu;

    try {
      // 1. Sync Orders Collection
      const ordersCol = collection(db, 'orders');
      unsubscribeOrders = onSnapshot(ordersCol, (snapshot) => {
        setFirebaseConnected(true);
        if (!snapshot.empty) {
          const remoteOrders = snapshot.docs.map(docSnap => docSnap.data());
          // Sort by createdAt descending
          remoteOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(remoteOrders);
        } else {
          // Initialize Firestore with default orders if empty
          INITIAL_ORDERS.forEach(ord => {
            setDoc(doc(db, 'orders', ord.id), ord).catch(() => {});
          });
        }
      }, (err) => {
        console.warn('Firebase orders subscription warning:', err);
        setFirebaseConnected(false);
      });

      // 2. Sync Tables Collection
      const tablesCol = collection(db, 'tables');
      unsubscribeTables = onSnapshot(tablesCol, (snapshot) => {
        if (!snapshot.empty) {
          const remoteTables = snapshot.docs.map(docSnap => docSnap.data());
          remoteTables.sort((a, b) => Number(a.id) - Number(b.id));
          setTables(remoteTables);
        } else {
          // Initialize Firestore with default tables if empty
          INITIAL_TABLES.forEach(tbl => {
            setDoc(doc(db, 'tables', String(tbl.id)), tbl).catch(() => {});
          });
        }
      }, (err) => {
        console.warn('Firebase tables subscription warning:', err);
      });

      // 3. Sync Menu Items Collection
      const menuCol = collection(db, 'menu_items');
      unsubscribeMenu = onSnapshot(menuCol, (snapshot) => {
        if (!snapshot.empty) {
          const remoteMenu = snapshot.docs.map(docSnap => docSnap.data());
          setMenuItems(remoteMenu);
        } else {
          // Initialize Firestore with default menu items if empty
          INITIAL_MENU_ITEMS.forEach(item => {
            setDoc(doc(db, 'menu_items', item.id), item).catch(() => {});
          });
        }
      }, (err) => {
        console.warn('Firebase menu subscription warning:', err);
      });

    } catch (error) {
      console.warn('Firebase connection setup error:', error);
      setFirebaseConnected(false);
    }

    return () => {
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeTables) unsubscribeTables();
      if (unsubscribeMenu) unsubscribeMenu();
    };
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Log Helper
  const addLog = (text, type = 'info') => {
    const newLog = {
      id: 'log_' + Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
      type
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Audio cue simulator
  const playBellSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio fallback
    }
  };

  // Firebase Error Translator
  const formatAuthError = (err) => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please check or register a new account.';
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in or use another email.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/operation-not-allowed':
        return 'Email/Password provider is disabled in Firebase Console. Please enable "Email/Password" in Firebase Console under Authentication > Sign-in method.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Temporarily disabled. Please try again in a few minutes.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      default:
        return err?.message || 'Authentication failed. Please try again.';
    }
  };

  // Auth Handlers
  const loginWithEmail = async (email, password) => {
    if (!email || !password) {
      showToast('Please provide both email and password', 'error');
      return { success: false, error: 'Email and password required' };
    }
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Admin'
      };
      setAuthUser(userData);
      setAdminLoggedIn(true);
      showToast(`Welcome back, ${userData.displayName}! Logged in successfully.`, 'success');
      addLog(`Admin logged in: ${userData.displayName} (${user.email})`, 'auth');
      return { success: true, user: userData };
    } catch (err) {
      console.error('Firebase login error:', err);
      const msg = formatAuthError(err);
      showToast(msg, 'error');
      return { success: false, error: msg, code: err.code };
    } finally {
      setAuthLoading(false);
    }
  };

  const registerWithEmail = async (email, password, username) => {
    if (!email || !password) {
      showToast('Please provide email and password', 'error');
      return { success: false, error: 'Email and password required' };
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return { success: false, error: 'Password too short' };
    }
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      const displayName = (username && username.trim()) ? username.trim() : email.split('@')[0];
      
      try {
        await updateProfile(user, { displayName });
      } catch (profileErr) {
        console.warn('Profile name update warning:', profileErr);
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName
      };
      setAuthUser(userData);
      setAdminLoggedIn(true);
      showToast(`Account created for ${displayName}! Logged in as Admin.`, 'success');
      addLog(`New admin registered: ${displayName} (${user.email})`, 'auth');
      return { success: true, user: userData };
    } catch (err) {
      console.error('Firebase register error:', err);
      const msg = formatAuthError(err);
      showToast(msg, 'error');
      return { success: false, error: msg, code: err.code };
    } finally {
      setAuthLoading(false);
    }
  };

  const loginAdmin = (pin) => {
    if (pin === '1234' || pin === 'admin') {
      const demoUser = {
        uid: 'demo_admin',
        email: 'admin@cafepailwan.com',
        displayName: 'Demo Admin'
      };
      setAuthUser(demoUser);
      setAdminLoggedIn(true);
      showToast('Welcome Admin! (Demo PIN Bypass)', 'success');
      addLog('Admin logged in via Demo PIN', 'auth');
      return true;
    } else {
      showToast('Invalid Admin PIN. Use registered Email & Password or Demo PIN: 1234', 'error');
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('Firebase signout warning:', err);
    }
    setAdminLoggedIn(false);
    setAuthUser(null);
    localStorage.removeItem('coffe_auth_user');
    localStorage.setItem('coffe_admin_auth', 'false');
    showToast('Admin logged out successfully', 'info');
    addLog('Admin logged out', 'auth');
  };

  const loginWaiter = (waiterId, pin) => {
    const waiter = waiters.find(w => w.id === waiterId);
    if (waiter && (waiter.pin === pin || pin === '1234')) {
      setActiveWaiter(waiter);
      showToast(`Welcome ${waiter.name}! Logged in as Waiter.`, 'success');
      addLog(`Waiter ${waiter.name} logged in`, 'auth');
      return true;
    }
    showToast(`Invalid Waiter PIN for ${waiter ? waiter.name : 'user'}`, 'error');
    return false;
  };

  const logoutWaiter = () => {
    showToast('Waiter session ended', 'info');
  };

  // Menu CRUD + Firebase Sync
  const addMenuItem = async (itemData) => {
    const newItem = {
      ...itemData,
      id: 'm_' + Date.now(),
      available: itemData.available !== undefined ? itemData.available : true,
      price: parseFloat(itemData.price) || 0
    };
    setMenuItems(prev => [newItem, ...prev]);
    showToast(`Added new menu item: ${newItem.name}`, 'success');
    addLog(`Menu updated: Added ${newItem.name}`, 'menu');

    try {
      await setDoc(doc(db, 'menu_items', newItem.id), newItem);
    } catch (err) {
      console.warn('Firebase menu add error:', err);
    }
  };

  const updateMenuItem = async (id, updatedData) => {
    const merged = { ...updatedData, price: parseFloat(updatedData.price) };
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...merged } : item));
    showToast(`Updated menu item`, 'success');
    addLog(`Menu updated item ID ${id}`, 'menu');

    try {
      await updateDoc(doc(db, 'menu_items', id), merged);
    } catch (err) {
      console.warn('Firebase menu update error:', err);
    }
  };

  const deleteMenuItem = async (id) => {
    const item = menuItems.find(i => i.id === id);
    setMenuItems(prev => prev.filter(i => i.id !== id));
    showToast(`Deleted ${item ? item.name : 'item'}`, 'info');
    addLog(`Deleted menu item ${item ? item.name : id}`, 'menu');

    try {
      await deleteDoc(doc(db, 'menu_items', id));
    } catch (err) {
      console.warn('Firebase menu delete error:', err);
    }
  };

  const toggleItemAvailability = async (id) => {
    let nextAvailable = true;
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        nextAvailable = !item.available;
        showToast(`${item.name} is now ${nextAvailable ? 'In Stock' : 'Out of Stock'}`, nextAvailable ? 'success' : 'warning');
        return { ...item, available: nextAvailable };
      }
      return item;
    }));

    try {
      await updateDoc(doc(db, 'menu_items', id), { available: nextAvailable });
    } catch (err) {
      console.warn('Firebase toggle availability error:', err);
    }
  };

  // Table Management + Firebase Sync
  const updateTableStatus = async (tableId, status, waiterId = null) => {
    let updatedTable;
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        updatedTable = {
          ...t,
          status,
          waiterId: waiterId !== null ? waiterId : (status === 'vacant' ? null : t.waiterId)
        };
        return updatedTable;
      }
      return t;
    }));
    addLog(`Table 0${tableId} status updated to ${status.toUpperCase()}`, 'table');

    try {
      if (updatedTable) {
        await setDoc(doc(db, 'tables', String(tableId)), updatedTable);
      }
    } catch (err) {
      console.warn('Firebase table status update error:', err);
    }
  };

  // Order Operations + Firebase Sync
  const createOrder = async (tableId, orderItems, discountCode = '') => {
    const table = tables.find(t => t.id === tableId);
    const orderNum = 'ORD-' + (1000 + orders.length + 1);
    
    // Calculate subtotal
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Discount
    let discountAmount = 0;
    if (discountCode) {
      const disc = discounts.find(d => d.code.toUpperCase() === discountCode.toUpperCase());
      if (disc) {
        if (disc.type === 'percent') {
          discountAmount = (subtotal * disc.percentage) / 100;
        } else if (disc.type === 'flat') {
          discountAmount = Math.min(disc.flat, subtotal);
        }
      }
    }

    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const tax = (taxableAmount * shopInfo.taxRate) / 100;
    const serviceCharge = (taxableAmount * shopInfo.serviceChargeRate) / 100;
    const total = taxableAmount + tax + serviceCharge;

    const newOrder = {
      id: orderNum,
      tableId,
      tableName: table ? table.name : `Table ${tableId}`,
      waiterId: activeWaiter ? activeWaiter.id : 'w1',
      waiterName: activeWaiter ? activeWaiter.name : 'Staff Server',
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'unpaid',
      items: orderItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      serviceCharge: parseFloat(serviceCharge.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      discountCode: discountCode.toUpperCase(),
      total: parseFloat(total.toFixed(2))
    };

    setOrders(prev => [newOrder, ...prev]);
    updateTableStatus(tableId, 'occupied', activeWaiter ? activeWaiter.id : 'w1');

    playBellSound();
    showToast(`Order ${orderNum} created for ${newOrder.tableName}!`, 'success');
    addLog(`New Order ${orderNum} placed for ${newOrder.tableName} (₹${newOrder.total.toFixed(2)})`, 'order');

    try {
      await setDoc(doc(db, 'orders', orderNum), newOrder);
    } catch (err) {
      console.warn('Firebase order create error:', err);
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));

    playBellSound();
    showToast(`Order ${orderId} status set to ${newStatus.toUpperCase()}`, 'info');
    addLog(`Order ${orderId} updated to ${newStatus}`, 'order');

    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (err) {
      console.warn('Firebase order status update error:', err);
    }
  };

  const addItemToOrder = async (orderId, item, quantity = 1, notes = '') => {
    let updatedOrderObj;
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const existingIndex = order.items.findIndex(i => i.id === item.id && i.notes === notes);
        let updatedItems = [...order.items];
        if (existingIndex > -1) {
          updatedItems[existingIndex].quantity += quantity;
        } else {
          updatedItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity,
            notes
          });
        }
        const subtotal = updatedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        const taxableAmount = Math.max(0, subtotal - (order.discountAmount || 0));
        const tax = (taxableAmount * shopInfo.taxRate) / 100;
        const serviceCharge = (taxableAmount * shopInfo.serviceChargeRate) / 100;
        const total = taxableAmount + tax + serviceCharge;

        updatedOrderObj = {
          ...order,
          items: updatedItems,
          subtotal: parseFloat(subtotal.toFixed(2)),
          tax: parseFloat(tax.toFixed(2)),
          serviceCharge: parseFloat(serviceCharge.toFixed(2)),
          total: parseFloat(total.toFixed(2))
        };
        return updatedOrderObj;
      }
      return order;
    }));

    showToast(`Added ${item.name} to order`, 'success');

    try {
      if (updatedOrderObj) {
        await setDoc(doc(db, 'orders', orderId), updatedOrderObj);
      }
    } catch (err) {
      console.warn('Firebase add item error:', err);
    }
  };

  const requestBillForTable = (tableId) => {
    updateTableStatus(tableId, 'bill_requested');
    const tableOrder = orders.find(o => o.tableId === tableId && o.paymentStatus === 'unpaid' && o.status !== 'cancelled');
    if (tableOrder) {
      setBillingModalOrder(tableOrder);
    }
    showToast(`Bill requested for Table 0${tableId}`, 'info');
    addLog(`Table 0${tableId} requested bill`, 'bill');
  };

  const payAndCompleteOrder = async (orderId, paymentMethod = 'Cash', customDiscountCode = '') => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    let finalDiscountAmount = order.discountAmount;
    let finalCode = order.discountCode;

    if (customDiscountCode && customDiscountCode !== order.discountCode) {
      const disc = discounts.find(d => d.code.toUpperCase() === customDiscountCode.toUpperCase());
      if (disc) {
        if (disc.type === 'percent') {
          finalDiscountAmount = (order.subtotal * disc.percentage) / 100;
        } else if (disc.type === 'flat') {
          finalDiscountAmount = Math.min(disc.flat, order.subtotal);
        }
        finalCode = customDiscountCode.toUpperCase();
      }
    }

    const taxableAmount = Math.max(0, order.subtotal - finalDiscountAmount);
    const tax = (taxableAmount * shopInfo.taxRate) / 100;
    const serviceCharge = (taxableAmount * shopInfo.serviceChargeRate) / 100;
    const finalTotal = taxableAmount + tax + serviceCharge;

    const paidData = {
      status: 'paid',
      paymentStatus: 'paid',
      paymentMethod,
      paidAt: new Date().toISOString(),
      discountAmount: parseFloat(finalDiscountAmount.toFixed(2)),
      discountCode: finalCode,
      total: parseFloat(finalTotal.toFixed(2))
    };

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, ...paidData };
      }
      return o;
    }));

    updateTableStatus(order.tableId, 'vacant', null);

    playBellSound();
    showToast(`Payment of ₹${finalTotal.toFixed(2)} received via ${paymentMethod}! Table 0${order.tableId} is now vacant.`, 'success');
    addLog(`Paid & Closed Order ${orderId} (₹${finalTotal.toFixed(2)} via ${paymentMethod})`, 'bill');

    try {
      await updateDoc(doc(db, 'orders', orderId), paidData);
    } catch (err) {
      console.warn('Firebase payment update error:', err);
    }
  };

  const cancelOrder = async (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
      updateTableStatus(order.tableId, 'vacant', null);
      showToast(`Order ${orderId} cancelled`, 'warning');
      addLog(`Cancelled Order ${orderId}`, 'order');

      try {
        await updateDoc(doc(db, 'orders', orderId), { status: 'cancelled' });
      } catch (err) {
        console.warn('Firebase cancel order error:', err);
      }
    }
  };

  const resetToDefaultData = () => {
    setRole('admin');
    setAdminLoggedIn(true);
    setActiveWaiter(INITIAL_WAITERS[0]);
    setMenuItems(INITIAL_MENU_ITEMS);
    setTables(INITIAL_TABLES);
    setOrders(INITIAL_ORDERS);
    setLogs([
      { id: 'l1', text: 'System reset to fresh Cafe Pailwan dataset', time: new Date().toLocaleTimeString(), type: 'system' }
    ]);
    localStorage.clear();

    // Re-initialize Firestore collections
    INITIAL_ORDERS.forEach(ord => {
      setDoc(doc(db, 'orders', ord.id), ord).catch(() => {});
    });
    INITIAL_TABLES.forEach(tbl => {
      setDoc(doc(db, 'tables', String(tbl.id)), tbl).catch(() => {});
    });
    INITIAL_MENU_ITEMS.forEach(item => {
      setDoc(doc(db, 'menu_items', item.id), item).catch(() => {});
    });

    showToast('Reset system data to defaults!', 'info');
  };

  return (
    <CoffeeContext.Provider value={{
      role, setRole,
      adminLoggedIn, loginAdmin, logoutAdmin,
      authUser, authLoading, loginWithEmail, registerWithEmail,
      activeWaiter, setActiveWaiter, loginWaiter, logoutWaiter, waiters,
      menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleItemAvailability,
      tables, updateTableStatus, selectedTableId, setSelectedTableId,
      orders, createOrder, updateOrderStatus, addItemToOrder, requestBillForTable, payAndCompleteOrder, cancelOrder,
      discounts, shopInfo,
      logs, toast, showToast, soundEnabled, setSoundEnabled,
      billingModalOrder, setBillingModalOrder,
      kotModalOrder, setKotModalOrder,
      resetToDefaultData,
      firebaseConnected
    }}>
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => useContext(CoffeeContext);
