import React, { useState } from 'react';
import {
  X,
  Search,
  Plus,
  Minus,
  Send,
  Coffee,
  Sliders
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';
import { INITIAL_CATEGORIES } from '../../data/initialData';

export const WaiterOrderModal = ({ tableId, onClose }) => {
  const {
    tables,
    orders,
    menuItems,
    createOrder,
    addItemToOrder,
    shopInfo,
    showToast
  } = useCoffee();

  const table = tables.find(t => t.id === tableId);
  const existingOrder = orders.find(o => o.tableId === tableId && o.paymentStatus === 'unpaid' && o.status !== 'cancelled');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local Cart for new order or additions
  const [cart, setCart] = useState([]);
  const [mobileTab, setMobileTab] = useState('menu'); // 'menu' | 'cart'

  // Item Customization state
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return item.available && matchesCategory && matchesSearch;
  });

  const handleOpenCustomize = (item) => {
    setCustomizingItem(item);
    setCustomNotes('');
    
    // Find first option array if available
    if (item.options) {
      const optionKeys = Object.keys(item.options);
      if (optionKeys.length > 0) {
        const firstArray = item.options[optionKeys[0]];
        if (Array.isArray(firstArray) && firstArray.length > 0) {
          setSelectedVariant(firstArray[0]);
          return;
        }
      }
    }
    setSelectedVariant('');
  };

  const handleAddToCart = (item, variantChoice = '', notesChoice = '') => {
    let noteText = '';
    const parts = [];
    if (variantChoice) parts.push(variantChoice);
    if (notesChoice) parts.push(notesChoice);
    noteText = parts.join(', ');

    // Extract price from variant if present (e.g., "Ice Cream (₹50)" or "Fried (₹80)")
    let finalPrice = item.price;
    if (variantChoice) {
      const match = variantChoice.match(/₹(\d+)/);
      if (match) {
        finalPrice = parseFloat(match[1]);
      }
    }

    const itemToSubmit = { ...item, price: finalPrice };

    if (existingOrder) {
      addItemToOrder(existingOrder.id, itemToSubmit, 1, noteText);
    } else {
      setCart(prev => {
        const existingIdx = prev.findIndex(i => i.id === item.id && i.notes === noteText);
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += 1;
          return updated;
        }
        return [...prev, { ...itemToSubmit, quantity: 1, notes: noteText }];
      });
      showToast(`Added ${item.name} to order draft`, 'success');
    }

    setCustomizingItem(null);
  };

  const handleUpdateQty = (idx, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const nextQty = updated[idx].quantity + delta;
      if (nextQty <= 0) {
        return updated.filter((_, i) => i !== idx);
      }
      updated[idx].quantity = nextQty;
      return updated;
    });
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTax = (cartSubtotal * shopInfo.taxRate) / 100;
  const cartService = (cartSubtotal * shopInfo.serviceChargeRate) / 100;
  const cartTotal = cartSubtotal + cartTax + cartService;

  const handleSendToKitchen = () => {
    if (cart.length === 0) return;
    createOrder(tableId, cart);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#181310] border border-[#33261e] w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[92vh] max-h-[92vh]">
        
        {/* Mobile Header Bar & Segmented Tabs (< md) */}
        <div className="md:hidden flex flex-col border-b border-[#2d221a] p-3 bg-[#130d09] flex-shrink-0">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-heading font-black text-white text-base flex items-center gap-2">
              <Coffee size={18} className="text-amber-400" />
              <span>{table ? table.name : 'Table'}</span>
            </h3>
            <button onClick={onClose} className="p-1 rounded-lg text-[#a89889] hover:text-white bg-[#221812]">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0c0805] rounded-xl border border-[#2d221a]">
            <button
              onClick={() => setMobileTab('menu')}
              className={`py-1.5 text-xs font-black rounded-lg transition-all ${
                mobileTab === 'menu'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                  : 'text-[#a89889]'
              }`}
            >
              Menu Catalog
            </button>
            <button
              onClick={() => setMobileTab('cart')}
              className={`py-1.5 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mobileTab === 'cart'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md'
                  : 'text-[#a89889]'
              }`}
            >
              <span>Draft Order</span>
              {cart.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-black text-amber-300 text-[10px] font-black">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Left Side: Menu Browser */}
        <div className={`flex-1 flex flex-col p-3 sm:p-4 border-b md:border-b-0 md:border-r border-[#33261e] overflow-hidden ${
          mobileTab === 'menu' ? 'flex' : 'hidden md:flex'
        }`}>
          
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center pb-3 border-b border-[#2d221a]">
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg flex items-center gap-2">
                <Coffee size={20} className="text-amber-400" />
                <span>{table ? table.name : 'Table'} — {shopInfo.name} Menu</span>
              </h3>
              <p className="text-xs text-[#a39589]">Select cold coffees, shakes, momos, maggi & food to order</p>
            </div>

            <button onClick={onClose} className="text-[#a39589] hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Category Tabs & Search */}
          <div className="py-2.5 sm:py-3 space-y-2 flex-shrink-0">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-[#a39589]" />
              <input
                type="text"
                placeholder="Search coffee, shakes, pizza, momos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-field pl-9 text-xs w-full"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {INITIAL_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'bg-[#120e0c] text-[#a39589] hover:text-white border border-[#2d221a]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 content-start auto-rows-max">
            {filteredMenuItems.map(item => (
              <div
                key={item.id}
                className="glass-card p-3 flex flex-col justify-between hover:border-amber-500/40 min-h-[115px]"
              >
                <div className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-xs leading-snug line-clamp-2">{item.name}</h4>
                    <p className="font-extrabold text-amber-400 text-xs mt-1">{shopInfo.currency}{item.price}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-1.5">
                  <button
                    onClick={() => item.customizable ? handleOpenCustomize(item) : handleAddToCart(item)}
                    className="btn btn-primary btn-sm flex-1 text-xs"
                  >
                    <Plus size={13} /> {item.customizable ? 'Customize & Add' : 'Quick Add'}
                  </button>
                  {item.customizable && (
                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="p-1.5 rounded-lg bg-[#251d17] text-[#a39589] hover:text-white border border-[#33261e]"
                      title="Select Options"
                    >
                      <Sliders size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Order Cart & Summary */}
        <div className={`w-full md:w-80 lg:w-96 bg-[#140f0d] flex flex-col p-4 justify-between ${
          mobileTab === 'cart' ? 'flex flex-1' : 'hidden md:flex'
        }`}>
          
          <div className="flex justify-between items-center border-b border-[#2d221a] pb-3">
            <h4 className="font-heading font-bold text-white text-sm flex items-center gap-1.5">
              <span>Order Summary</span>
              {cart.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold">
                  {cart.length}
                </span>
              )}
            </h4>
            <button onClick={onClose} className="hidden md:block text-[#a39589] hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Existing Order Status banner if table active */}
          {existingOrder && (
            <div className="my-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1">
              <p className="font-bold text-amber-400">Order {existingOrder.id} Active!</p>
              <p className="text-[11px] text-[#a39589]">Items added will be appended to live order.</p>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
            {existingOrder ? (
              <div className="space-y-2">
                <p className="text-[11px] uppercase font-bold text-[#857467]">Existing Live Items:</p>
                {existingOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 bg-[#120e0c] rounded-lg border border-[#2d221a]">
                    <div>
                      <p className="font-bold text-white">{item.quantity}x {item.name}</p>
                      {item.notes && <p className="text-[10px] text-amber-400">└ {item.notes}</p>}
                    </div>
                    <span className="font-semibold text-[#a39589]">{shopInfo.currency}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : cart.length === 0 ? (
              <div className="py-12 text-center text-[#857467] text-xs space-y-2">
                <Coffee size={32} className="mx-auto text-[#44382e]" />
                <p>No items in order draft.</p>
                <p className="text-[11px]">Tap "+ Add" on any menu item.</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-[#120e0c] rounded-xl border border-[#2d221a] text-xs">
                  <div className="flex-1 pr-2">
                    <p className="font-bold text-white">{item.name}</p>
                    {item.notes && <p className="text-[10px] text-amber-400">└ {item.notes}</p>}
                    <p className="text-[11px] text-amber-400/90 font-semibold">{shopInfo.currency}{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#201813] p-1 rounded-lg border border-[#33261e]">
                    <button onClick={() => handleUpdateQty(idx, -1)} className="p-0.5 text-[#a39589] hover:text-white">
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-white px-1">{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(idx, 1)} className="p-0.5 text-[#a39589] hover:text-white">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotals & Submit */}
          {!existingOrder && (
            <div className="space-y-3 pt-3 border-t border-[#2d221a]">
              <div className="space-y-1 text-xs text-[#a39589]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{shopInfo.currency}{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST & Service ({shopInfo.taxRate + shopInfo.serviceChargeRate}%)</span>
                  <span className="text-white">{shopInfo.currency}{(cartTax + cartService).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-[#2d221a]">
                  <span>Total</span>
                  <span className="text-amber-400">{shopInfo.currency}{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleSendToKitchen}
                className="btn btn-primary w-full btn-lg flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Send Order to Kitchen</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181310] border border-[#33261e] w-full max-w-md rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#33261e] pb-2">
              <h3 className="font-heading font-bold text-white text-base">Customize {customizingItem.name}</h3>
              <button onClick={() => setCustomizingItem(null)} className="text-[#a39589] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {customizingItem.options && Object.keys(customizingItem.options).map((optKey, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="font-semibold text-amber-400 capitalize">Select {optKey}</label>
                  <select
                    value={selectedVariant}
                    onChange={e => setSelectedVariant(e.target.value)}
                    className="input-field text-xs"
                  >
                    {customizingItem.options[optKey].map((optVal, i) => (
                      <option key={i} value={optVal}>{optVal}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="space-y-1">
                <label className="font-semibold text-amber-400">Special Instructions / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Extra spicy, less sugar, no ice..."
                  value={customNotes}
                  onChange={e => setCustomNotes(e.target.value)}
                  className="input-field text-xs"
                />
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(customizingItem, selectedVariant, customNotes)}
              className="btn btn-primary w-full"
            >
              Add Customized Item
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
