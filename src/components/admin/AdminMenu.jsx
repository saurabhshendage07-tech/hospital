import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Coffee,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';
import { INITIAL_CATEGORIES } from '../../data/initialData';

export const AdminMenu = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleItemAvailability, shopInfo } = useCoffee();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'cold_coffee',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    available: true
  });

  // Preset Coffee & Food Photos
  const presetImages = [
    { label: 'Cold Coffee', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Hot Coffee / Chai', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
    { label: 'Milkshake', url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80' },
    { label: 'Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' },
    { label: 'Momos', url: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=600&q=80' },
    { label: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
    { label: 'Sandwich / Toast', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
    { label: 'Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=600&q=80' },
    { label: 'Fries', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80' },
    { label: 'Maggi', url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80' },
    { label: 'Brownie', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'cold_coffee',
      price: '',
      description: '',
      image: presetImages[0].url,
      available: true
    });
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      available: item.available
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem(formData);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 sm:gap-4 bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white flex items-center gap-2.5">
            <Coffee size={24} className="text-amber-400 flex-shrink-0" />
            <span>Menu Catalog Management</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
            Total {menuItems.length} items configured in artisan coffee & food catalog
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn btn-primary flex items-center gap-2 shadow-lg shadow-amber-500/25 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full lg:w-auto">
          {INITIAL_CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? menuItems.length : menuItems.filter(i => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                  activeCategory === cat.id ? 'bg-[#0c0805] text-amber-300' : 'bg-[#231a14] text-[#a89889]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72 flex-shrink-0">
          <Search size={16} className="absolute left-3.5 top-3.5 text-[#a89889]" />
          <input
            type="text"
            placeholder="Search coffee, shake, momos, burger..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10 text-xs font-medium w-full"
          />
        </div>
      </div>

      {/* Menu Grid - scales across 1 to 6 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 content-start auto-rows-max">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card overflow-hidden flex flex-col justify-between group">
            <div>
              {/* Image & Price Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0c0805]">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!item.available ? 'grayscale opacity-60' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30"></div>
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3">
                  <span className={`badge ${item.available ? 'badge-vacant' : 'badge-cancelled'}`}>
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute top-3 right-3 font-heading font-black text-sm px-3.5 py-1 rounded-xl bg-black/85 backdrop-blur-md text-amber-400 border border-amber-500/40 shadow-xl">
                  {shopInfo.currency}{item.price}
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-black text-white text-base leading-snug line-clamp-1">{item.name}</h3>
                <p className="text-xs text-[#b5a494] line-clamp-2 leading-relaxed">{item.description}</p>
                
                {item.customizable && (
                  <div className="pt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      Customizable Variants
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-[#2d2119] bg-[#120e0b] flex items-center justify-between gap-2">
              <button
                onClick={() => toggleItemAvailability(item.id)}
                className={`btn btn-sm flex-1 text-xs ${item.available ? 'btn-secondary text-amber-400 border-amber-500/30' : 'btn-primary'}`}
              >
                {item.available ? <XCircle size={14} /> : <CheckCircle size={14} />}
                <span>{item.available ? 'Out of Stock' : 'In Stock'}</span>
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl bg-[#201813] text-[#b5a494] hover:text-white border border-[#33241b] hover:border-amber-500/40 transition-all"
                title="Edit Item"
              >
                <Edit2 size={15} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete ${item.name} permanently?`)) deleteMenuItem(item.id);
                }}
                className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:text-white border border-red-800/40 hover:bg-red-900/60 transition-all"
                title="Delete Item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="bg-[#181310] border border-[#33261e] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            
            <div className="flex justify-between items-center border-b border-[#33261e] pb-3">
              <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
                <Coffee size={20} className="text-amber-400" />
                <span>{editingItem ? 'Edit Item' : 'Add Item'}</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#a39589] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-400">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Cold Coffee"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-amber-400">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    {INITIAL_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-amber-400">Price ({shopInfo.currency})</label>
                  <input
                    type="number"
                    step="1"
                    required
                    placeholder="60"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="input-field font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-amber-400">Description</label>
                <textarea
                  rows={2}
                  placeholder="Flavor notes, ingredients..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Photo Preset Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <ImageIcon size={14} /> Select Photo Preset or Enter Image URL
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        formData.image === preset.url ? 'border-amber-500 scale-105 shadow-lg' : 'border-[#33261e] opacity-60'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="input-field text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
