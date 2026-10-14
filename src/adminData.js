// Cafe Helados Admin Data Store & LocalStorage Synchronization

export const DEFAULT_MENU_ITEMS = [
  // --- PIZZAS (DISHES) ---
  { id: 1, name: 'Margherita Classic Pizza', category: 'Pizzas', itemType: 'dish', price: 430, tag: 'Italian Classic', note: 'Slow-simmered San Marzano tomato sugo, fresh garden basil & generous double mozzarella.', image: 'photo-1604382355076-af4b0eb60143', inStock: true },
  { id: 2, name: 'Mexican Veg Wave Pizza', category: 'Pizzas', itemType: 'dish', price: 430, tag: 'Bestseller', note: 'Spicy jalapeños, sweet corn, Mexican salsa swirl & molten mozzarella on a crisp stone-baked crust.', image: 'photo-1513104890138-7c749659a591', inStock: true },

  // --- MEXICAN & TACOS / SAVOURY BITES (DISHES) ---
  { id: 3, name: 'Artisan Garlic Bread with Cheese', category: 'Mexican & Tacos', itemType: 'dish', price: 219, tag: 'Quick Bite', note: 'Crusty artisanal bread toasted with rich garlic herb butter, chilli flakes & molten mozzarella.', image: 'photo-1761344788266-5f6957aeea33', inStock: true },
  { id: 4, name: 'Loaded Nachos Grande', category: 'Mexican & Tacos', itemType: 'dish', price: 279, tag: 'Crowd Fav', note: 'Warm tortilla chips smothered in molten cheese, jalapeños, house salsa & cool sour cream.', image: 'photo-1789990646690-b5222896487c', inStock: true },

  // --- PASTAS & MAINS (DISHES) ---
  { id: 5, name: 'Classic Arrabbiata Pasta', category: 'Pastas & Mains', itemType: 'dish', price: 279, tag: 'Spicy Tangy', note: 'Penne tossed in slow-simmered spicy Italian plum tomato sauce with fresh basil, chilli flakes & olives.', image: 'photo-1621996346565-e3dbc646d9a9', inStock: true },
  { id: 6, name: 'Creamy Alfredo Penne', category: 'Pastas & Mains', itemType: 'dish', price: 289, tag: 'Bestseller', note: 'Silky parmesan garlic cream sauce, sautéed button mushrooms & freshly cracked black pepper.', image: 'photo-1555949258-eb67b1ef0ceb', inStock: true },

  // --- COFFEE & SHAKES (BEVERAGES) ---
  { id: 7, name: 'Belgian Chocolate Thick Shake', category: 'Coffee & Shakes', itemType: 'beverage', price: 219, tag: 'Thick Shake', note: 'Gourmet cocoa gelato blended with dense cream, chocolate fudge swirls & whipped cream.', image: 'photo-1572490122747-3968b75cc699', inStock: true },
  { id: 8, name: 'French Vanilla Latte', category: 'Coffee & Shakes', itemType: 'beverage', price: 169, tag: 'Hot Coffee', note: 'Silky espresso pulled with velvety steamed microfoam and natural Madagascar vanilla bean.', image: 'photo-1461023058943-07fcbe16d735', inStock: true },

  // --- HELADOS DESSERTS (DESSERTS) ---
  { id: 9, name: 'Artisan Helados Sundae', category: 'Helados Desserts', itemType: 'dessert', price: 229, tag: 'Signature Gelato', note: 'Triple artisanal gelato scoops, summer berry compote, dark chocolate sauce & almond praline.', image: 'photo-1563805042-7684c019e1cb', inStock: true },
  { id: 10, name: 'Ferrero Rocher Waffle', category: 'Helados Desserts', itemType: 'dessert', price: 249, tag: 'Warm Waffle', note: 'Crisp golden waffle drenched in warm Nutella, crushed Ferrero Rocher & toasted hazelnut crunch.', image: 'photo-1562376552-0d160a2f238d', inStock: true },
];

export const DEFAULT_ORDERS = [
  {
    id: 'HLD-2041',
    customerName: 'Jasleen Kaur',
    phone: '+91 98765 41230',
    type: 'Takeaway',
    tableNo: '',
    address: 'Counter Pickup',
    status: 'Preparing',
    createdAt: '12 mins ago',
    items: [
      { id: 2, name: 'Mexican Veg Wave Pizza', price: 430, qty: 1 },
      { id: 7, name: 'Belgian Chocolate Thick Shake', price: 219, qty: 1 }
    ],
    total: 649,
    paymentMethod: 'UPI (Paid)'
  },
  {
    id: 'HLD-2040',
    customerName: 'Amanpreet Singh',
    phone: '+91 98140 88219',
    type: 'Dine-in',
    tableNo: 'Table 4 (Arched Booth)',
    address: 'Dine-in',
    status: 'Ready',
    createdAt: '24 mins ago',
    items: [
      { id: 6, name: 'Creamy Alfredo Penne', price: 289, qty: 2 },
      { id: 3, name: 'Artisan Garlic Bread with Cheese', price: 219, qty: 1 },
      { id: 8, name: 'French Vanilla Latte', price: 169, qty: 2 }
    ],
    total: 1135,
    paymentMethod: 'Card'
  },
  {
    id: 'HLD-2039',
    customerName: 'Simran Sharma',
    phone: '+91 94172 33491',
    type: 'Delivery',
    tableNo: '',
    address: 'House 42, Model Town, Patiala',
    status: 'Completed',
    createdAt: '1 hour ago',
    items: [
      { id: 10, name: 'Ferrero Rocher Waffle', price: 249, qty: 1 },
      { id: 9, name: 'Artisan Helados Sundae', price: 229, qty: 1 }
    ],
    total: 478,
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'HLD-2038',
    customerName: 'Vikram Malhotra',
    phone: '+91 98888 19284',
    type: 'Takeaway',
    tableNo: '',
    address: 'Curbside Pickup',
    status: 'Completed',
    createdAt: '2 hours ago',
    items: [
      { id: 1, name: 'Margherita Classic Pizza', price: 430, qty: 1 },
      { id: 4, name: 'Loaded Nachos Grande', price: 279, qty: 1 }
    ],
    total: 709,
    paymentMethod: 'UPI (Paid)'
  }
];

export const DEFAULT_BOOKINGS = [
  {
    id: 'RES-1042',
    name: 'Gurpreet Singh',
    phone: '+91 98721 55621',
    guests: '3 - 4 Guests (Family / Friends)',
    date: new Date().toISOString().split('T')[0],
    time: '06:30 PM — Golden Hour Catch-up',
    seating: 'Cozy Arched Corner',
    status: 'Confirmed',
    createdAt: '35 mins ago',
    notes: 'Anniversary celebration catch-up'
  },
  {
    id: 'RES-1041',
    name: 'Mehak Verma',
    phone: '+91 98155 49210',
    guests: '1 - 2 Guests (Cozy Table)',
    date: new Date().toISOString().split('T')[0],
    time: '08:30 PM — Dinner & Desserts',
    seating: 'Window View Table',
    status: 'Pending',
    createdAt: '1 hour ago',
    notes: 'Window seat requested'
  },
  {
    id: 'RES-1040',
    name: 'Rohan Gupta',
    phone: '+91 97790 12845',
    guests: '5 - 8 Guests (Group Gathering)',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '04:30 PM — Evening Sundaes & Shakes',
    seating: 'Plush Lounge Sofa',
    status: 'Confirmed',
    createdAt: '3 hours ago',
    notes: 'Birthday dessert treat'
  }
];

export const DEFAULT_SETTINGS = {
  storeOpen: true,
  acceptingOnlineOrders: true,
  announcementActive: false,
  announcementText: '',
  openingHours: '11:00 AM – 11:30 PM (Daily)',
  phone: '+91 98765 43210',
  address: 'Charan Bagh, Near Baradari Gardens, Patiala, Punjab 147001',
  upiId: 'cafehelados@okaxis'
};

const STORAGE_KEYS = {
  MENU: 'cafe_helados_menu_items_v2',
  ORDERS: 'cafe_helados_orders_v2',
  BOOKINGS: 'cafe_helados_bookings_v2',
  SETTINGS: 'cafe_helados_settings_v2',
  AUTH: 'cafe_helados_admin_auth_v2'
};

export const getStoredMenu = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MENU);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
      return DEFAULT_MENU_ITEMS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading menu from localStorage:', e);
    return DEFAULT_MENU_ITEMS;
  }
};

export const saveStoredMenu = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cafe_helados_menu_updated', { detail: items }));
  } catch (e) {
    console.error('Failed saving menu to localStorage:', e);
  }
};

export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading orders from localStorage:', e);
    return DEFAULT_ORDERS;
  }
};

export const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('cafe_helados_orders_updated', { detail: orders }));
  } catch (e) {
    console.error('Failed saving orders to localStorage:', e);
  }
};

export const addStoredOrder = (newOrder) => {
  const current = getStoredOrders();
  const updated = [newOrder, ...current];
  saveStoredOrders(updated);
  return updated;
};

export const getStoredBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed reading bookings from localStorage:', e);
    return DEFAULT_BOOKINGS;
  }
};

export const saveStoredBookings = (bookings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('cafe_helados_bookings_updated', { detail: bookings }));
  } catch (e) {
    console.error('Failed saving bookings to localStorage:', e);
  }
};

export const addStoredBooking = (newBooking) => {
  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  saveStoredBookings(updated);
  return updated;
};

export const getStoredSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(data);
    if (parsed.announcementText && parsed.announcementText.includes('15% off')) {
      parsed.announcementActive = false;
      parsed.announcementText = '';
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...DEFAULT_SETTINGS, ...parsed }));
    }
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (e) {
    console.error('Failed reading settings from localStorage:', e);
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('cafe_helados_settings_updated', { detail: settings }));
  } catch (e) {
    console.error('Failed saving settings to localStorage:', e);
  }
};

export const getAdminAuth = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuth = (val) => {
  try {
    if (val) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch (e) {
    console.error('Failed setting admin auth:', e);
  }
};
