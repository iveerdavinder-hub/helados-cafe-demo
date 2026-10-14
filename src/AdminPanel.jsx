import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, Calendar, Settings, Plus,
  Edit3, Trash2, CheckCircle2, Clock, AlertCircle, Eye, EyeOff, Search,
  Filter, LogOut, ArrowLeft, ArrowRight, Lock, Unlock, Phone, User,
  TrendingUp, Sparkles, X, ChevronRight, RefreshCw, Bell, ExternalLink,
  ShieldCheck, Check, DollarSign
} from 'lucide-react';
import {
  getStoredMenu, saveStoredMenu, DEFAULT_MENU_ITEMS,
  getStoredOrders, saveStoredOrders, addStoredOrder,
  getStoredBookings, saveStoredBookings, addStoredBooking,
  getStoredSettings, saveStoredSettings, DEFAULT_SETTINGS,
  getAdminAuth, setAdminAuth
} from './adminData';
import './admin.css';

const photo = (id, w = 400) => {
  if (!id) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=85';
  if (id.startsWith('http') || id.startsWith('/')) return id;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
};

const CATEGORIES = [
  'Pizzas',
  'Mexican & Tacos',
  'Pastas & Mains',
  'Coffee & Shakes',
  'Helados Desserts'
];

export default function AdminPanel({ onExitToStore }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(getAdminAuth());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active navigation tab: 'dashboard' | 'orders' | 'menu' | 'bookings' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Shared store state
  const [menuItems, setMenuItems] = useState(getStoredMenu());
  const [orders, setOrders] = useState(getStoredOrders());
  const [bookings, setBookings] = useState(getStoredBookings());
  const [settings, setSettings] = useState(getStoredSettings());

  // Toast notice
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Menu management state
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItem, setEditingItem] = useState(null); // null or item object
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    name: '',
    category: 'Pizzas',
    itemType: 'dish',
    price: '',
    tag: '',
    note: '',
    image: 'photo-1513104890138-7c749659a591',
    inStock: true
  });

  // Orders management state
  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [manualOrderData, setManualOrderData] = useState({
    customerName: '',
    phone: '',
    type: 'Dine-in',
    tableNo: 'Table 1',
    selectedItemId: 1,
    qty: 1
  });

  // Bookings management state
  const [bookingFilter, setBookingFilter] = useState('All');
  const [isAddBookingModalOpen, setIsAddBookingModalOpen] = useState(false);
  const [manualBookingData, setManualBookingData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '06:30 PM — Golden Hour Catch-up',
    seating: 'Cozy Arched Corner',
    notes: 'Walk-in / Phone reservation'
  });

  // Keep state synced with events
  useEffect(() => {
    const handleMenuSync = (e) => setMenuItems(e.detail);
    const handleOrdersSync = (e) => setOrders(e.detail);
    const handleBookingsSync = (e) => setBookings(e.detail);
    const handleSettingsSync = (e) => setSettings(e.detail);

    window.addEventListener('cafe_helados_menu_updated', handleMenuSync);
    window.addEventListener('cafe_helados_orders_updated', handleOrdersSync);
    window.addEventListener('cafe_helados_bookings_updated', handleBookingsSync);
    window.addEventListener('cafe_helados_settings_updated', handleSettingsSync);

    return () => {
      window.removeEventListener('cafe_helados_menu_updated', handleMenuSync);
      window.removeEventListener('cafe_helados_orders_updated', handleOrdersSync);
      window.removeEventListener('cafe_helados_bookings_updated', handleBookingsSync);
      window.removeEventListener('cafe_helados_settings_updated', handleSettingsSync);
    };
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e?.preventDefault();
    if (passwordInput === 'helados2026' || passwordInput === 'admin' || passwordInput.trim() === 'cafe') {
      setIsAuthenticated(true);
      setAdminAuth(true);
      setAuthError('');
      showToast('Welcome back, Cafe Helados Manager');
    } else {
      setAuthError('Incorrect passcode. Default passcode is helados2026');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setAdminAuth(true);
    setAuthError('');
    showToast('Logged in as Cafe Helados Manager');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuth(false);
    setPasswordInput('');
    showToast('Logged out of Admin Console');
  };

  // Menu actions
  const handleToggleStock = (id) => {
    const updated = menuItems.map(item =>
      item.id === id ? { ...item, inStock: item.inStock === false ? true : false } : item
    );
    setMenuItems(updated);
    saveStoredMenu(updated);
    const target = updated.find(i => i.id === id);
    showToast(`${target.name} is now ${target.inStock ? 'Available (In Stock)' : 'Sold Out (Out of Stock)'}`);
  };

  const handleDeleteItem = (id) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    if (window.confirm(`Are you sure you want to delete "${item.name}" from the menu?`)) {
      const updated = menuItems.filter(i => i.id !== id);
      setMenuItems(updated);
      saveStoredMenu(updated);
      showToast(`Removed "${item.name}" from menu`);
    }
  };

  const handleOpenAddModal = () => {
    setItemFormData({
      name: '',
      category: 'Pizzas',
      itemType: 'dish',
      price: '',
      tag: 'Bestseller',
      note: '',
      image: 'photo-1513104890138-7c749659a591',
      inStock: true
    });
    setEditingItem(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setItemFormData({
      name: item.name,
      category: item.category,
      itemType: item.itemType || 'dish',
      price: item.price,
      tag: item.tag || '',
      note: item.note || '',
      image: item.image || '',
      inStock: item.inStock !== false
    });
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!itemFormData.name || !itemFormData.price) {
      alert('Please fill in dish name and price');
      return;
    }

    if (editingItem) {
      // Update
      const updated = menuItems.map(i =>
        i.id === editingItem.id ? {
          ...i,
          name: itemFormData.name.trim(),
          category: itemFormData.category,
          itemType: itemFormData.itemType,
          price: Number(itemFormData.price),
          tag: itemFormData.tag.trim(),
          note: itemFormData.note.trim(),
          image: itemFormData.image.trim() || 'photo-1555396273-367ea4eb4db5',
          inStock: itemFormData.inStock
        } : i
      );
      setMenuItems(updated);
      saveStoredMenu(updated);
      showToast(`Updated "${itemFormData.name}" successfully`);
    } else {
      // Create new
      const nextId = menuItems.length > 0 ? Math.max(...menuItems.map(i => i.id)) + 1 : 1;
      const newItem = {
        id: nextId,
        name: itemFormData.name.trim(),
        category: itemFormData.category,
        itemType: itemFormData.itemType,
        price: Number(itemFormData.price),
        tag: itemFormData.tag.trim(),
        note: itemFormData.note.trim(),
        image: itemFormData.image.trim() || 'photo-1555396273-367ea4eb4db5',
        inStock: itemFormData.inStock
      };
      const updated = [...menuItems, newItem];
      setMenuItems(updated);
      saveStoredMenu(updated);
      showToast(`Added "${newItem.name}" to menu catalog`);
    }
    setIsAddModalOpen(false);
  };

  const handleResetMenuToDefault = () => {
    if (window.confirm('Reset menu back to the curated 10 signature items?')) {
      setMenuItems(DEFAULT_MENU_ITEMS);
      saveStoredMenu(DEFAULT_MENU_ITEMS);
      showToast('Menu catalog restored to 10 bestsellers');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm("⚠️ Clear All Data: This will wipe all orders, reservations, and reset menu catalog and settings to clean defaults. Are you sure?")) {
      setOrders([]);
      saveStoredOrders([]);
      setBookings([]);
      saveStoredBookings([]);
      setMenuItems(DEFAULT_MENU_ITEMS);
      saveStoredMenu(DEFAULT_MENU_ITEMS);
      setSettings(DEFAULT_SETTINGS);
      saveStoredSettings(DEFAULT_SETTINGS);
      showToast('All orders & reservations cleared. Catalog restored to defaults.');
    }
  };

  // Orders actions
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(ord =>
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updated);
    saveStoredOrders(updated);
    showToast(`Order ${orderId} status set to ${newStatus}`);
  };

  const handleCreateManualOrder = (e) => {
    e.preventDefault();
    if (!manualOrderData.customerName) {
      alert('Please enter customer name');
      return;
    }
    const selectedItem = menuItems.find(i => i.id === Number(manualOrderData.selectedItemId)) || menuItems[0];
    const newOrder = {
      id: `HLD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: manualOrderData.customerName,
      phone: manualOrderData.phone || '+91 98765 00000',
      type: manualOrderData.type,
      tableNo: manualOrderData.type === 'Dine-in' ? manualOrderData.tableNo : '',
      address: manualOrderData.type === 'Delivery' ? 'Patiala Local Delivery' : (manualOrderData.type === 'Dine-in' ? manualOrderData.tableNo : 'Counter Pickup'),
      status: 'Preparing',
      createdAt: 'Just now',
      items: [
        {
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          qty: Number(manualOrderData.qty)
        }
      ],
      total: selectedItem.price * Number(manualOrderData.qty),
      paymentMethod: 'Cash / Counter UPI'
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveStoredOrders(updated);
    setIsAddOrderModalOpen(false);
    showToast(`Created order ${newOrder.id} for ₹${newOrder.total}`);
  };

  // Bookings actions
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    saveStoredBookings(updated);
    showToast(`Reservation ${bookingId} marked as ${newStatus}`);
  };

  const handleCreateManualBooking = (e) => {
    e.preventDefault();
    if (!manualBookingData.name) {
      alert('Please enter guest name');
      return;
    }
    const newBooking = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name: manualBookingData.name,
      phone: manualBookingData.phone || '+91 98765 00000',
      guests: manualBookingData.guests,
      date: manualBookingData.date,
      time: manualBookingData.time,
      seating: manualBookingData.seating,
      status: 'Confirmed',
      createdAt: 'Just now',
      notes: manualBookingData.notes
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveStoredBookings(updated);
    setIsAddBookingModalOpen(false);
    showToast(`Table confirmed for ${newBooking.name}`);
  };

  // Settings actions
  const handleToggleStoreStatus = () => {
    const updated = { ...settings, storeOpen: !settings.storeOpen };
    setSettings(updated);
    saveStoredSettings(updated);
    showToast(`Store status: ${updated.storeOpen ? 'OPEN' : 'CLOSED'}`);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveStoredSettings(settings);
    showToast('Store settings & announcements saved successfully');
  };

  // Filtered menu items
  const filteredMenu = menuItems.filter(item => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(menuSearch.toLowerCase())) ||
      (item.note && item.note.toLowerCase().includes(menuSearch.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Filtered orders
  const filteredOrders = orders.filter(ord => {
    const matchStatus = orderFilter === 'All' || ord.status === orderFilter;
    const matchSearch = ord.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.phone.includes(orderSearch);
    return matchStatus && matchSearch;
  });

  // Filtered bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'All') return true;
    return b.status === bookingFilter;
  });

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'Cancelled' ? ord.total : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;
  const inStockCount = menuItems.filter(i => i.inStock !== false).length;
  const outOfStockCount = menuItems.filter(i => i.inStock === false).length;

  // Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-crest">
              <UtensilsCrossed size={28} />
            </div>
            <div className="admin-login-badge">
              <ShieldCheck size={14} />
              <span>SECURE ACCESS PORTAL</span>
            </div>
            <h2>Café Helados <em>Console</em></h2>
            <p>Manager & Staff Administration for Patiala Outlet</p>
          </div>

          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="admin-input-group">
              <label htmlFor="admin-pass">MANAGER PASSCODE</label>
              <div className="admin-input-wrapper">
                <Lock size={16} />
                <input
                  id="admin-pass"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter manager PIN..."
                  autoFocus
                />
              </div>
              <small className="admin-hint">Default demo passcode: <code>helados2026</code></small>
            </div>

            {authError && (
              <div className="admin-error-box">
                <AlertCircle size={15} />
                <span>{authError}</span>
              </div>
            )}

            <button type="submit" className="admin-btn admin-btn-primary full-width">
              <span>Sign In to Admin Panel</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-outline full-width"
              onClick={handleQuickDemoLogin}
            >
              <Sparkles size={16} />
              <span>⚡ One-Click Demo Access</span>
            </button>
          </form>

          <div className="admin-login-footer">
            <button
              type="button"
              className="admin-exit-btn"
              onClick={onExitToStore}
            >
              <ArrowLeft size={14} />
              <span>Return to Customer Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="admin-root">
      {/* Top Banner Notice */}
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-brand">
            <div className="admin-crest-small">
              <UtensilsCrossed size={18} />
            </div>
            <div className="admin-brand-info">
              <div className="admin-brand-title">
                <strong>CAFÉ HELADOS</strong>
                <span className="admin-version-tag">ADMIN v2.4</span>
              </div>
              <small className="admin-outlet-sub">Patiala Main Kitchen & Cafe Console</small>
            </div>
          </div>
        </div>

        <div className="admin-header-center">
          <div className={`store-status-pill ${settings.storeOpen ? 'open' : 'closed'}`} onClick={handleToggleStoreStatus} title="Click to toggle store open/closed">
            <span className="status-indicator-dot" />
            <span className="status-text">{settings.storeOpen ? 'STORE OPEN (ONLINE)' : 'STORE CLOSED'}</span>
          </div>
          {settings.announcementActive && (
            <div className="admin-announcement-chip" title="Live announcement banner is active on customer site">
              <Bell size={13} />
              <span>Announcement Active</span>
            </div>
          )}
        </div>

        <div className="admin-header-right">
          <button
            type="button"
            className="admin-header-btn clear-data-btn"
            onClick={handleClearAllData}
            title="Clear all stored orders, reservations, and reset defaults"
          >
            <Trash2 size={14} />
            <span>Clear All Data</span>
          </button>
          <button
            type="button"
            className="admin-header-btn view-store-btn"
            onClick={onExitToStore}
            title="Switch to customer storefront view"
          >
            <ExternalLink size={15} />
            <span>View Live Website</span>
          </button>
          <button
            type="button"
            className="admin-header-btn logout-btn"
            onClick={handleLogout}
            title="Log out of manager portal"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-nav-group">
            <span className="admin-nav-header">MANAGEMENT</span>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Overview</span>
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} />
              <span>Live Orders</span>
              {activeOrdersCount > 0 && <span className="nav-badge alert">{activeOrdersCount}</span>}
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              <UtensilsCrossed size={18} />
              <span>Menu & Dishes</span>
              <span className="nav-badge">{menuItems.length}</span>
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={18} />
              <span>Table Reservations</span>
              {pendingBookingsCount > 0 && <span className="nav-badge pending">{pendingBookingsCount}</span>}
            </button>
            <button
              type="button"
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>Store Settings</span>
            </button>
          </div>

          <div className="admin-sidebar-footer">
            <div className="admin-quick-stats">
              <div className="stat-row">
                <span>In-Stock Dishes</span>
                <b>{inStockCount} / {menuItems.length}</b>
              </div>
              <div className="stat-row">
                <span>Today's Total</span>
                <b>₹{totalRevenue}</b>
              </div>
            </div>
            <button type="button" className="btn-switch-to-site" onClick={onExitToStore}>
              <ArrowLeft size={14} />
              <span>Back to Storefront</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Stage */}
        <main className="admin-content">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="admin-tab-pane animate-fade">
              <div className="admin-pane-header">
                <div>
                  <h2>Executive Dashboard</h2>
                  <p>Real-time analytics, kitchen operations, and storefront activity.</p>
                </div>
                <div className="admin-header-actions">
                  <button className="admin-btn admin-btn-primary" onClick={handleOpenAddModal}>
                    <Plus size={16} />
                    <span>Add Dish</span>
                  </button>
                  <button className="admin-btn admin-btn-secondary" onClick={() => setIsAddOrderModalOpen(true)}>
                    <ShoppingBag size={16} />
                    <span>New Order</span>
                  </button>
                </div>
              </div>

              {/* Stat Metric Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card card-revenue">
                  <div className="stat-icon-wrap">
                    <TrendingUp size={22} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">TODAY'S REVENUE</span>
                    <strong className="stat-value">₹{totalRevenue.toLocaleString()}</strong>
                    <span className="stat-trend positive">↑ 18.4% vs yesterday</span>
                  </div>
                </div>

                <div className="admin-stat-card card-orders">
                  <div className="stat-icon-wrap">
                    <ShoppingBag size={22} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">TOTAL ORDERS</span>
                    <strong className="stat-value">{orders.length}</strong>
                    <span className="stat-sub">{activeOrdersCount} active in kitchen</span>
                  </div>
                </div>

                <div className="admin-stat-card card-bookings">
                  <div className="stat-icon-wrap">
                    <Calendar size={22} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">TABLE RESERVATIONS</span>
                    <strong className="stat-value">{bookings.length}</strong>
                    <span className="stat-sub">{pendingBookingsCount} awaiting confirmation</span>
                  </div>
                </div>

                <div className="admin-stat-card card-menu">
                  <div className="stat-icon-wrap">
                    <UtensilsCrossed size={22} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">CATALOG ITEMS</span>
                    <strong className="stat-value">{menuItems.length}</strong>
                    <span className="stat-sub">{outOfStockCount > 0 ? `${outOfStockCount} marked sold out` : 'All items in stock'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Operation Toggles */}
              <div className="admin-quick-toggles-bar">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <strong>Online Order Acceptance</strong>
                    <small>Turn off to stop accepting online orders temporarily</small>
                  </div>
                  <button
                    type="button"
                    className={`status-switch ${settings.acceptingOnlineOrders ? 'on' : 'off'}`}
                    onClick={() => {
                      const upd = { ...settings, acceptingOnlineOrders: !settings.acceptingOnlineOrders };
                      setSettings(upd);
                      saveStoredSettings(upd);
                      showToast(`Online ordering ${upd.acceptingOnlineOrders ? 'Enabled' : 'Paused'}`);
                    }}
                  >
                    <span>{settings.acceptingOnlineOrders ? 'ACCEPTING' : 'PAUSED'}</span>
                  </button>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <strong>Storefront Announcement Banner</strong>
                    <small>{settings.announcementActive ? settings.announcementText : 'Disabled'}</small>
                  </div>
                  <button
                    type="button"
                    className={`status-switch ${settings.announcementActive ? 'on' : 'off'}`}
                    onClick={() => {
                      const upd = { ...settings, announcementActive: !settings.announcementActive };
                      setSettings(upd);
                      saveStoredSettings(upd);
                      showToast(`Announcement banner ${upd.announcementActive ? 'Enabled' : 'Disabled'}`);
                    }}
                  >
                    <span>{settings.announcementActive ? 'ACTIVE' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {/* Dashboard Split View: Recent Orders & Upcoming Bookings */}
              <div className="admin-dashboard-columns">
                {/* Column 1: Live Kitchen Orders */}
                <div className="admin-dash-panel">
                  <div className="dash-panel-header">
                    <div className="panel-title-wrap">
                      <ShoppingBag size={18} />
                      <h3>Active Orders Queue</h3>
                    </div>
                    <button className="link-action" onClick={() => setActiveTab('orders')}>
                      View all orders <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="dash-orders-list">
                    {orders.slice(0, 4).map(order => (
                      <div className="dash-order-row" key={order.id}>
                        <div className="dash-order-left">
                          <div className="order-id-badge">
                            <b>{order.id}</b>
                            <span className="order-type-chip">{order.type}</span>
                          </div>
                          <h4>{order.customerName}</h4>
                          <p className="order-items-snippet">
                            {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                          </p>
                        </div>
                        <div className="dash-order-right">
                          <strong className="order-price">₹{order.total}</strong>
                          <span className={`order-status-pill status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Today's Table Reservations */}
                <div className="admin-dash-panel">
                  <div className="dash-panel-header">
                    <div className="panel-title-wrap">
                      <Calendar size={18} />
                      <h3>Upcoming Reservations</h3>
                    </div>
                    <button className="link-action" onClick={() => setActiveTab('bookings')}>
                      View all bookings <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="dash-bookings-list">
                    {bookings.slice(0, 4).map(booking => (
                      <div className="dash-booking-row" key={booking.id}>
                        <div className="dash-booking-left">
                          <div className="booking-head-line">
                            <b>{booking.name}</b>
                            <span className="guest-badge">{booking.guests}</span>
                          </div>
                          <p className="booking-time-slot">
                            <Clock size={13} /> {booking.time}
                          </p>
                          <small className="booking-seating-pref">✦ {booking.seating}</small>
                        </div>
                        <div className="dash-booking-right">
                          <span className={`booking-status-pill status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                          {booking.status === 'Pending' && (
                            <button
                              type="button"
                              className="btn-quick-confirm"
                              onClick={() => handleUpdateBookingStatus(booking.id, 'Confirmed')}
                            >
                              Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="admin-tab-pane animate-fade">
              <div className="admin-pane-header">
                <div>
                  <h2>Orders & Kitchen Pipeline</h2>
                  <p>Track incoming deliveries, takeaway pickups, and dine-in tables.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setIsAddOrderModalOpen(true)}>
                  <Plus size={16} />
                  <span>+ Manual Order</span>
                </button>
              </div>

              {/* Order Filters Bar */}
              <div className="admin-filter-bar">
                <div className="admin-search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by customer name, order ID, phone..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                  />
                  {orderSearch && <button onClick={() => setOrderSearch('')}><X size={14} /></button>}
                </div>

                <div className="filter-pill-group">
                  {['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      type="button"
                      className={`filter-pill ${orderFilter === st ? 'active' : ''}`}
                      onClick={() => setOrderFilter(st)}
                    >
                      {st} {st !== 'All' && `(${orders.filter(o => o.status === st).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Grid / Cards */}
              <div className="admin-orders-grid">
                {filteredOrders.length === 0 ? (
                  <div className="empty-catalog-state">
                    <ShoppingBag size={40} />
                    <h3>No orders found</h3>
                    <p>No orders match the selected status or search query.</p>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div className="admin-order-card" key={order.id}>
                      <div className="order-card-header">
                        <div className="order-card-title">
                          <span className="order-id">#{order.id}</span>
                          <span className="order-time">{order.createdAt}</span>
                        </div>
                        <span className={`order-status-pill status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="order-customer-box">
                        <div className="customer-primary">
                          <User size={15} />
                          <strong>{order.customerName}</strong>
                        </div>
                        <div className="customer-meta">
                          <span><Phone size={13} /> {order.phone}</span>
                          <span className="order-type-tag">✦ {order.type} {order.tableNo && `· ${order.tableNo}`}</span>
                        </div>
                        {order.address && (
                          <small className="order-address-text">📍 {order.address}</small>
                        )}
                      </div>

                      <div className="order-items-table">
                        <div className="items-table-head">
                          <span>ITEM</span>
                          <span>QTY</span>
                          <span>PRICE</span>
                        </div>
                        {order.items.map((it, idx) => (
                          <div className="items-table-row" key={idx}>
                            <span className="item-name">{it.name}</span>
                            <span className="item-qty">{it.qty}</span>
                            <span className="item-subtotal">₹{it.price * it.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-total-row">
                        <div>
                          <small>PAYMENT: {order.paymentMethod || 'Counter Pay'}</small>
                        </div>
                        <div className="total-block">
                          <span>TOTAL:</span>
                          <strong>₹{order.total}</strong>
                        </div>
                      </div>

                      {/* Status Transition Action Buttons */}
                      <div className="order-workflow-actions">
                        {order.status === 'Pending' && (
                          <button
                            type="button"
                            className="btn-status-action btn-prep"
                            onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                          >
                            <Clock size={14} /> Start Preparing
                          </button>
                        )}
                        {order.status === 'Preparing' && (
                          <button
                            type="button"
                            className="btn-status-action btn-ready"
                            onClick={() => handleUpdateOrderStatus(order.id, 'Ready')}
                          >
                            <CheckCircle2 size={14} /> Mark as Ready / Out
                          </button>
                        )}
                        {order.status === 'Ready' && (
                          <button
                            type="button"
                            className="btn-status-action btn-complete"
                            onClick={() => handleUpdateOrderStatus(order.id, 'Completed')}
                          >
                            <Check size={14} /> Complete Order
                          </button>
                        )}
                        {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                          <button
                            type="button"
                            className="btn-status-action btn-cancel"
                            onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MENU & DISHES CATALOG */}
          {activeTab === 'menu' && (
            <div className="admin-tab-pane animate-fade">
              <div className="admin-pane-header">
                <div>
                  <h2>Menu Catalog & Dishes</h2>
                  <p>Add new dishes, update prices, manage descriptions, or toggle out-of-stock items.</p>
                </div>
                <div className="admin-header-actions">
                  <button className="admin-btn admin-btn-outline" onClick={handleResetMenuToDefault} title="Revert to original 10 items">
                    <RefreshCw size={15} />
                    <span>Reset 10 Bestsellers</span>
                  </button>
                  <button className="admin-btn admin-btn-primary" onClick={handleOpenAddModal}>
                    <Plus size={16} />
                    <span>Add New Dish</span>
                  </button>
                </div>
              </div>

              {/* Menu Filter Controls */}
              <div className="admin-filter-bar">
                <div className="admin-search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search dishes by name, tag, or ingredients..."
                    value={menuSearch}
                    onChange={e => setMenuSearch(e.target.value)}
                  />
                  {menuSearch && <button onClick={() => setMenuSearch('')}><X size={14} /></button>}
                </div>

                <div className="filter-pill-group">
                  {['All', ...CATEGORIES].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat} ({cat === 'All' ? menuItems.length : menuItems.filter(m => m.category === cat).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Catalog Table / Grid */}
              <div className="admin-menu-table-wrap">
                <table className="admin-menu-table">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>PHOTO</th>
                      <th>ITEM DETAILS</th>
                      <th>CATEGORY</th>
                      <th>TYPE</th>
                      <th>PRICE</th>
                      <th>STOCK STATUS</th>
                      <th style={{ width: 140, textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenu.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="empty-table-row">
                          No dishes found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredMenu.map(item => (
                        <tr key={item.id} className={item.inStock === false ? 'row-sold-out' : ''}>
                          <td>
                            <img
                              src={photo(item.image, 160)}
                              alt={item.name}
                              className="admin-thumb-img"
                              onError={e => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=160&q=85';
                              }}
                            />
                          </td>
                          <td>
                            <div className="admin-item-title-box">
                              <strong>{item.name}</strong>
                              {item.tag && <span className="item-tag-badge">{item.tag}</span>}
                            </div>
                            <p className="admin-item-note">{item.note}</p>
                          </td>
                          <td>
                            <span className="cat-chip">{item.category}</span>
                          </td>
                          <td>
                            <span className={`type-badge-pill type-${item.itemType || 'dish'}`}>
                              {item.itemType === 'beverage' ? 'Beverage' : item.itemType === 'dessert' ? 'Dessert' : 'Dish'}
                            </span>
                          </td>
                          <td>
                            <strong className="item-price-tag">₹{item.price}</strong>
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`stock-toggle-btn ${item.inStock !== false ? 'in-stock' : 'out-of-stock'}`}
                              onClick={() => handleToggleStock(item.id)}
                              title={item.inStock !== false ? 'Click to mark as sold out' : 'Click to mark as available'}
                            >
                              <span className="dot" />
                              <span>{item.inStock !== false ? 'In Stock' : 'Sold Out'}</span>
                            </button>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions">
                              <button
                                type="button"
                                className="icon-action edit"
                                onClick={() => handleOpenEditModal(item)}
                                title={`Edit ${item.name}`}
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                type="button"
                                className="icon-action delete"
                                onClick={() => handleDeleteItem(item.id)}
                                title={`Delete ${item.name}`}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TABLE RESERVATIONS */}
          {activeTab === 'bookings' && (
            <div className="admin-tab-pane animate-fade">
              <div className="admin-pane-header">
                <div>
                  <h2>Table Bookings & Reservations</h2>
                  <p>Customer reservations placed via website and counter requests.</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setIsAddBookingModalOpen(true)}>
                  <Plus size={16} />
                  <span>+ Walk-in / Phone Booking</span>
                </button>
              </div>

              {/* Status Filter */}
              <div className="admin-filter-bar">
                <div className="filter-pill-group">
                  {['All', 'Pending', 'Confirmed', 'Seated', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      type="button"
                      className={`filter-pill ${bookingFilter === st ? 'active' : ''}`}
                      onClick={() => setBookingFilter(st)}
                    >
                      {st} ({st === 'All' ? bookings.length : bookings.filter(b => b.status === st).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings List */}
              <div className="admin-bookings-grid">
                {filteredBookings.length === 0 ? (
                  <div className="empty-catalog-state">
                    <Calendar size={40} />
                    <h3>No reservations found</h3>
                    <p>No table bookings match the selected status.</p>
                  </div>
                ) : (
                  filteredBookings.map(b => (
                    <div className="admin-booking-card" key={b.id}>
                      <div className="booking-card-top">
                        <div className="booking-id-tag">
                          <b>{b.id}</b>
                          <span className="booking-date-tag">{b.date}</span>
                        </div>
                        <span className={`booking-status-pill status-${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="booking-guest-info">
                        <h3>{b.name}</h3>
                        <p className="phone-line"><Phone size={13} /> {b.phone}</p>
                      </div>

                      <div className="booking-details-box">
                        <div className="detail-item">
                          <Clock size={14} />
                          <span>{b.time}</span>
                        </div>
                        <div className="detail-item">
                          <User size={14} />
                          <span>{b.guests}</span>
                        </div>
                        <div className="detail-item seating-pref">
                          <Sparkles size={14} />
                          <span>{b.seating}</span>
                        </div>
                        {b.notes && (
                          <div className="detail-notes">
                            <small>Note: {b.notes}</small>
                          </div>
                        )}
                      </div>

                      <div className="booking-actions-row">
                        {b.status === 'Pending' && (
                          <button
                            type="button"
                            className="btn-book-action confirm"
                            onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                          >
                            <CheckCircle2 size={14} /> Confirm Table
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            type="button"
                            className="btn-book-action seat"
                            onClick={() => handleUpdateBookingStatus(b.id, 'Seated')}
                          >
                            <Check size={14} /> Mark Seated
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            type="button"
                            className="btn-book-action cancel"
                            onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: STORE SETTINGS & ANNOUNCEMENTS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-pane animate-fade">
              <div className="admin-pane-header">
                <div>
                  <h2>Store Settings & Public Announcements</h2>
                  <p>Configure storefront banner, cafe opening hours, customer helpline, and UPI payment details.</p>
                </div>
              </div>

              <form className="admin-settings-form" onSubmit={handleSaveSettings}>
                <div className="settings-section-card">
                  <div className="section-card-title">
                    <Bell size={18} />
                    <h3>Top Announcement Strip (Customer Website)</h3>
                  </div>
                  <p className="section-card-desc">
                    Display a luxury announcement ticker or discount banner at the very top of the website.
                  </p>

                  <div className="settings-field-checkbox">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={settings.announcementActive}
                        onChange={e => setSettings({ ...settings, announcementActive: e.target.checked })}
                      />
                      <span className="checkbox-label">Enable announcement banner on website</span>
                    </label>
                  </div>

                  <div className="settings-field-group">
                    <label htmlFor="announcement-text">ANNOUNCEMENT TEXT</label>
                    <input
                      id="announcement-text"
                      type="text"
                      value={settings.announcementText}
                      onChange={e => setSettings({ ...settings, announcementText: e.target.value })}
                      placeholder="e.g. ✨ Weekend Treat: 15% off all artisan waffles & sundaes!"
                    />
                  </div>
                </div>

                <div className="settings-section-card">
                  <div className="section-card-title">
                    <Clock size={18} />
                    <h3>Operating Hours & Helplines</h3>
                  </div>

                  <div className="settings-grid-2">
                    <div className="settings-field-group">
                      <label htmlFor="opening-hours">OPERATING HOURS</label>
                      <input
                        id="opening-hours"
                        type="text"
                        value={settings.openingHours}
                        onChange={e => setSettings({ ...settings, openingHours: e.target.value })}
                        placeholder="e.g. 11:00 AM – 11:30 PM (Daily)"
                      />
                    </div>
                    <div className="settings-field-group">
                      <label htmlFor="store-phone">CUSTOMER HELPLINE / WHATSAPP</label>
                      <input
                        id="store-phone"
                        type="text"
                        value={settings.phone}
                        onChange={e => setSettings({ ...settings, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="settings-grid-2">
                    <div className="settings-field-group">
                      <label htmlFor="store-address">CAFE ADDRESS</label>
                      <input
                        id="store-address"
                        type="text"
                        value={settings.address}
                        onChange={e => setSettings({ ...settings, address: e.target.value })}
                        placeholder="Charan Bagh, Near Baradari Gardens, Patiala"
                      />
                    </div>
                    <div className="settings-field-group">
                      <label htmlFor="store-upi">CAFE UPI ID</label>
                      <input
                        id="store-upi"
                        type="text"
                        value={settings.upiId}
                        onChange={e => setSettings({ ...settings, upiId: e.target.value })}
                        placeholder="cafehelados@okaxis"
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-footer-actions">
                  <button type="submit" className="admin-btn admin-btn-primary">
                    <CheckCircle2 size={16} />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: ADD / EDIT DISH */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div>
                <span className="modal-sub-label">{editingItem ? 'EDIT DISH' : 'NEW DISH'}</span>
                <h3>{editingItem ? `Edit "${editingItem.name}"` : 'Add New Item to Menu'}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="admin-form">
              <div className="admin-form-grid">
                <div className="form-group full-col">
                  <label>ITEM NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Truffle Mushroom Pizza"
                    value={itemFormData.name}
                    onChange={e => setItemFormData({ ...itemFormData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>CATEGORY</label>
                  <select
                    value={itemFormData.category}
                    onChange={e => setItemFormData({ ...itemFormData, category: e.target.value })}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>ITEM TYPE</label>
                  <select
                    value={itemFormData.itemType}
                    onChange={e => setItemFormData({ ...itemFormData, itemType: e.target.value })}
                  >
                    <option value="dish">Savoury Dish</option>
                    <option value="beverage">Beverage / Drink</option>
                    <option value="dessert">Artisan Dessert</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>PRICE (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="349"
                    value={itemFormData.price}
                    onChange={e => setItemFormData({ ...itemFormData, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>TAG / BADGE</label>
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, Chef Choice, New"
                    value={itemFormData.tag}
                    onChange={e => setItemFormData({ ...itemFormData, tag: e.target.value })}
                  />
                </div>

                <div className="form-group full-col">
                  <label>CULINARY DESCRIPTION / INGREDIENTS</label>
                  <textarea
                    rows={2}
                    placeholder="Describe fresh ingredients, sauce, cheese and culinary notes..."
                    value={itemFormData.note}
                    onChange={e => setItemFormData({ ...itemFormData, note: e.target.value })}
                  />
                </div>

                <div className="form-group full-col">
                  <label>IMAGE (UNSPLASH ID OR PHOTO URL)</label>
                  <input
                    type="text"
                    placeholder="e.g. photo-1513104890138-7c749659a591"
                    value={itemFormData.image}
                    onChange={e => setItemFormData({ ...itemFormData, image: e.target.value })}
                  />
                  {/* Quick image preset pickers */}
                  <div className="preset-images-picker">
                    <small>Sample Photo Presets:</small>
                    <div className="preset-chips">
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1513104890138-7c749659a591' })}>🍕 Pizza</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1555949258-eb67b1ef0ceb' })}>🍝 Pasta</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1565299585323-38d6b0865b47' })}>🌮 Taco</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1572490122747-3968b75cc699' })}>🥤 Shake</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1461023058943-07fcbe16d735' })}>☕ Latte</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1562376552-0d160a2f238d' })}>🧇 Waffle</button>
                      <button type="button" onClick={() => setItemFormData({ ...itemFormData, image: 'photo-1563805042-7684c019e1cb' })}>🍨 Gelato</button>
                    </div>
                  </div>
                  {itemFormData.image && (
                    <div className="modal-image-preview">
                      <img src={photo(itemFormData.image, 300)} alt="Preview" />
                      <span>Preview Image</span>
                    </div>
                  )}
                </div>

                <div className="form-group full-col">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={itemFormData.inStock}
                      onChange={e => setItemFormData({ ...itemFormData, inStock: e.target.checked })}
                    />
                    <span className="checkbox-label">Available for ordering (In Stock)</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL ORDER */}
      {isAddOrderModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddOrderModalOpen(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div>
                <span className="modal-sub-label">DIRECT KITCHEN ORDER</span>
                <h3>Create Walk-in / Phone Order</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddOrderModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="admin-form">
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>CUSTOMER NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Guest name"
                    value={manualOrderData.customerName}
                    onChange={e => setManualOrderData({ ...manualOrderData, customerName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={manualOrderData.phone}
                    onChange={e => setManualOrderData({ ...manualOrderData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>ORDER TYPE</label>
                  <select
                    value={manualOrderData.type}
                    onChange={e => setManualOrderData({ ...manualOrderData, type: e.target.value })}
                  >
                    <option value="Dine-in">Dine-in</option>
                    <option value="Takeaway">Takeaway Pickup</option>
                    <option value="Delivery">Local Delivery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>TABLE NO. / INSTRUCTION</label>
                  <input
                    type="text"
                    placeholder="Table 4 / Counter"
                    value={manualOrderData.tableNo}
                    onChange={e => setManualOrderData({ ...manualOrderData, tableNo: e.target.value })}
                  />
                </div>
                <div className="form-group full-col">
                  <label>SELECT DISH</label>
                  <select
                    value={manualOrderData.selectedItemId}
                    onChange={e => setManualOrderData({ ...manualOrderData, selectedItemId: e.target.value })}
                  >
                    {menuItems.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} — ₹{m.price} ({m.category})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>QUANTITY</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={manualOrderData.qty}
                    onChange={e => setManualOrderData({ ...manualOrderData, qty: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddOrderModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: MANUAL BOOKING */}
      {isAddBookingModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddBookingModalOpen(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div>
                <span className="modal-sub-label">TABLE RESERVATION</span>
                <h3>Book Walk-in / Phone Reservation</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddBookingModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="admin-form">
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>GUEST NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jasleen Kaur"
                    value={manualBookingData.name}
                    onChange={e => setManualBookingData({ ...manualBookingData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PHONE</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={manualBookingData.phone}
                    onChange={e => setManualBookingData({ ...manualBookingData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>PARTY SIZE</label>
                  <select
                    value={manualBookingData.guests}
                    onChange={e => setManualBookingData({ ...manualBookingData, guests: e.target.value })}
                  >
                    <option>1 - 2 Guests (Cozy Table)</option>
                    <option>3 - 4 Guests (Family / Friends)</option>
                    <option>5 - 8 Guests (Group Gathering)</option>
                    <option>8+ Guests (Celebration)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>DATE</label>
                  <input
                    type="date"
                    value={manualBookingData.date}
                    onChange={e => setManualBookingData({ ...manualBookingData, date: e.target.value })}
                  />
                </div>
                <div className="form-group full-col">
                  <label>TIME SLOT</label>
                  <select
                    value={manualBookingData.time}
                    onChange={e => setManualBookingData({ ...manualBookingData, time: e.target.value })}
                  >
                    <option>12:00 PM — Lunch & Coffee</option>
                    <option>02:30 PM — Afternoon Hangout</option>
                    <option>04:30 PM — Evening Sundaes & Shakes</option>
                    <option>06:30 PM — Golden Hour Catch-up</option>
                    <option>08:30 PM — Dinner & Desserts</option>
                    <option>09:45 PM — Late Night Dessert Run</option>
                  </select>
                </div>
                <div className="form-group full-col">
                  <label>SEATING PREFERENCE</label>
                  <select
                    value={manualBookingData.seating}
                    onChange={e => setManualBookingData({ ...manualBookingData, seating: e.target.value })}
                  >
                    <option>Cozy Arched Corner</option>
                    <option>Window View Table</option>
                    <option>Plush Lounge Sofa</option>
                    <option>Celebration / Birthday Table</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddBookingModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Confirm Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
