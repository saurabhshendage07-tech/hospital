import React, { useState } from 'react';
import {
  Clock,
  CheckCircle,
  Flame,
  Printer,
  DollarSign,
  XCircle,
  Search,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, setBillingModalOrder, setKotModalOrder, cancelOrder, shopInfo } = useCoffee();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusBadges = {
    pending: 'badge-pending',
    preparing: 'badge-preparing',
    ready: 'badge-ready',
    served: 'badge-served',
    paid: 'badge-paid',
    cancelled: 'badge-cancelled'
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.waiterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 sm:gap-4 bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2.5">
            <ShoppingBag size={24} className="text-amber-400 flex-shrink-0" />
            <span>Live Order Management</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
            Real-time kitchen, table, and barista order workflow tracking
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-3.5 text-[#a89889]" />
          <input
            type="text"
            placeholder="Search Order # or Table..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10 text-xs font-medium w-full"
          />
        </div>
      </div>

      {/* Filter Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['all', 'pending', 'preparing', 'ready', 'served', 'paid'].map(st => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              statusFilter === st
                ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/20 scale-[1.02]'
                : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
            }`}
          >
            {st} ({orders.filter(o => st === 'all' ? true : o.status === st).length})
          </button>
        ))}
      </div>

      {/* Orders Grid / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-card space-y-3">
            <Coffee size={40} className="mx-auto text-[#a39589]" />
            <p className="text-base text-white font-bold">No orders found matching filter</p>
            <p className="text-xs text-[#a39589]">Orders will automatically appear here when tables place requests.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className={`glass-card p-5 space-y-4 flex flex-col justify-between relative overflow-hidden ${
                order.status === 'pending' ? 'border-amber-500/50 shadow-amber-900/20' : ''
              }`}
            >
              {/* Top info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-extrabold text-lg text-white">{order.tableName}</h3>
                      <span className={`badge ${statusBadges[order.status] || 'badge-pending'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#a39589] mt-0.5 font-mono">{order.id} • Waiter: {order.waiterName}</p>
                  </div>
                  <span className="text-[11px] text-[#857467] font-mono flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Items List */}
                <div className="bg-[#120e0c] p-3 rounded-xl border border-[#2d221a] space-y-2 max-h-40 overflow-y-auto">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs border-b border-[#221a15] pb-1.5 last:border-0 last:pb-0">
                      <div>
                        <span className="font-bold text-white pr-1.5">{item.quantity}x</span>
                        <span className="text-[#f5f0eb]">{item.name}</span>
                        {item.notes && <p className="text-[10px] text-amber-400 italic">└ {item.notes}</p>}
                      </div>
                      <span className="font-semibold text-amber-400">{shopInfo.currency}{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-[#a39589]">Total Bill (Inc Tax & Service)</span>
                  <span className="font-heading font-extrabold text-base text-amber-400">
                    {shopInfo.currency}{order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 border-t border-[#2d221a] pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setKotModalOrder(order)}
                    className="btn btn-secondary btn-sm flex items-center justify-center gap-1.5 text-xs"
                  >
                    <Printer size={13} />
                    <span>Print KOT</span>
                  </button>

                  <button
                    onClick={() => setBillingModalOrder(order)}
                    className="btn btn-primary btn-sm flex items-center justify-center gap-1.5 text-xs"
                  >
                    <DollarSign size={13} />
                    <span>{order.paymentStatus === 'paid' ? 'View Receipt' : 'Settle Bill'}</span>
                  </button>
                </div>

                {/* Status Advance Bar */}
                {order.status !== 'paid' && order.status !== 'cancelled' && (
                  <div className="flex gap-1.5 pt-1">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="btn btn-sm w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                      >
                        <Flame size={13} /> Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="btn btn-sm w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                      >
                        <CheckCircle size={13} /> Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'served')}
                        className="btn btn-sm w-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
                      >
                        <Coffee size={13} /> Mark Served
                      </button>
                    )}
                    {order.status === 'served' && (
                      <button
                        onClick={() => setBillingModalOrder(order)}
                        className="btn btn-sm w-full bg-amber-500 text-black font-bold hover:bg-amber-400"
                      >
                        <DollarSign size={13} /> Collect Payment & Release Table
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (window.confirm(`Cancel order ${order.id}?`)) cancelOrder(order.id);
                      }}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50"
                      title="Cancel Order"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
