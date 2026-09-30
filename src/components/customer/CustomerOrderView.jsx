import React, { useState } from 'react';
import {
  Coffee,
  QrCode,
  Plus,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';
import { INITIAL_CATEGORIES } from '../../data/initialData';
import confetti from 'canvas-confetti';

export const CustomerOrderView = () => {
  const { tables, menuItems, createOrder, orders, shopInfo, showToast } = useCoffee();

  const [selectedTableId, setSelectedTableId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const selectedTable = tables.find(t => t.id === selectedTableId);
  const tableOrder = orders.find(o => o.tableId === selectedTableId && o.paymentStatus === 'unpaid' && o.status !== 'cancelled');

  const filteredItems = menuItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    return item.available && matchesCat;
  });

  const handleAddToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { ...item, quantity: 1, notes: '' }];
    });
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const cartSubtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const cartTax = (cartSubtotal * shopInfo.taxRate) / 100;
  const cartTotal = cartSubtotal + cartTax;

  const handlePlaceCustomerOrder = () => {
    if (cart.length === 0) return;
    const newOrd = createOrder(selectedTableId, cart);
    setOrderPlaced(newOrd);
    setCart([]);

    try {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    } catch {
      // Ignored
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-fade-in pb-24 px-1 sm:px-2">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-[#271912] via-[#1a120c] to-[#0e0b08] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-500/25 text-center space-y-3 sm:space-y-4 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] text-[#0c0805] flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Coffee className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md -z-10"></div>
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-4xl text-amber-300 font-black tracking-wide drop-shadow-sm">
            Welcome to {shopInfo.name}
          </h2>
          <p className="text-[11px] sm:text-xs text-[#b5a494] max-w-md mx-auto font-medium leading-relaxed">
            Order artisan espresso, ice-blended frappes, momos, pizzas & bakery treats delivered directly to your table!
          </p>
        </div>

        {/* Table Selector */}
        <div className="pt-2 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
          <span className="text-xs text-[#b5a494] font-bold flex items-center gap-1.5 bg-[#140e0a] px-3 py-1.5 rounded-xl border border-[#2d2119]">
            <QrCode size={15} className="text-amber-400" /> Ordering for Table:
          </span>
          <select
            value={selectedTableId}
            onChange={e => { setSelectedTableId(Number(e.target.value)); setOrderPlaced(null); }}
            className="input-field text-xs w-44 font-black text-amber-300 bg-[#16100c] border-amber-500/40 shadow-inner"
          >
            {tables.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.section})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Table Order Notification */}
      {(tableOrder || orderPlaced) && (
        <div className="glass-card p-4 sm:p-5 border-amber-500/60 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 space-y-2 sm:space-y-3 shadow-xl">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-heading font-black text-white text-sm sm:text-base">
                  Active Live Order for {selectedTable?.name}
                </h4>
                <p className="text-xs text-amber-300 font-mono font-black">
                  {(orderPlaced || tableOrder).id} • Status: <span className="uppercase font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">{(orderPlaced || tableOrder).status}</span>
                </p>
              </div>
            </div>
            <span className="font-heading font-black text-amber-300 text-lg sm:text-xl">
              {shopInfo.currency}{(orderPlaced || tableOrder).total.toFixed(2)}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#b5a494] font-medium">
            Your table order has been dispatched to our barista & kitchen staff! Sit back and enjoy.
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {INITIAL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 content-start auto-rows-max">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card p-3.5 sm:p-4 flex gap-3.5 items-center group hover:border-amber-500/50 transition-all">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#0d0907]">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex-1 space-y-1 sm:space-y-1.5 min-w-0">
              <h4 className="font-heading font-black text-white text-sm sm:text-base leading-snug line-clamp-1">{item.name}</h4>
              <p className="text-[11px] text-[#b5a494] line-clamp-2 font-medium">{item.description}</p>
              <div className="flex justify-between items-center pt-1.5 sm:pt-2">
                <span className="font-heading font-black text-amber-400 text-base sm:text-lg">
                  {shopInfo.currency}{item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn btn-primary btn-sm shadow-md shadow-amber-500/20"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Cart Floating / Sticky Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-40 bg-[#16100c]/95 border border-amber-500/50 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 sm:gap-4 animate-fade-in">
          <div>
            <p className="text-[11px] sm:text-xs text-[#b5a494] font-bold">Your Cart ({cart.length} items)</p>
            <p className="font-heading font-black text-amber-300 text-lg sm:text-xl">
              {shopInfo.currency}{cartTotal.toFixed(2)} <span className="text-[10px] text-[#8e7e70] font-normal">(inc tax)</span>
            </p>
          </div>

          <button
            onClick={handlePlaceCustomerOrder}
            className="btn btn-primary btn-md sm:btn-lg flex items-center gap-2 shadow-lg shadow-amber-500/30"
          >
            <ShoppingBag size={18} />
            <span>Place Order ({selectedTable?.name})</span>
          </button>
        </div>
      )}

    </div>
  );
};
