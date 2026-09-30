import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Clock,
  Coffee,
  Flame
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const AdminDashboard = ({ setActiveTab }) => {
  const { orders, tables, menuItems, shopInfo, logs } = useCoffee();

  // Metrics
  const paidOrders = orders.filter(o => o.paymentStatus === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'paid' && o.status !== 'cancelled').length;
  const occupiedTablesCount = tables.filter(t => t.status === 'occupied' || t.status === 'bill_requested').length;
  const avgOrderVal = paidOrders.length > 0 ? (totalRevenue / paidOrders.length) : 0;

  // Hourly sales chart simulation data
  const chartData = [
    { hour: '08 AM', sales: 120 },
    { hour: '10 AM', sales: 240 },
    { hour: '12 PM', sales: 380 },
    { hour: '02 PM', sales: 290 },
    { hour: '04 PM', sales: 450 },
    { hour: '06 PM', sales: 310 },
    { hour: '08 PM', sales: 190 },
  ];
  const maxSale = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2.5 flex-wrap">
            <span>Coffee Shop Management Overview</span>
            <span className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-extrabold border border-emerald-500/30">
              Live System
            </span>
          </h2>
          <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
            Real-time sales, order flow, and floor occupancy for {shopInfo.name}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto flex-wrap">
          <button
            onClick={() => setActiveTab('orders')}
            className="btn btn-primary btn-sm flex-1 sm:flex-initial flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <ShoppingBag size={15} />
            <span>Orders ({activeOrdersCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className="btn btn-secondary btn-sm flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
          >
            <Coffee size={15} />
            <span>Menu Catalog</span>
          </button>
        </div>
      </div>

      {/* Metric Cards - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        
        {/* Total Revenue */}
        <div className="glass-sweet p-3.5 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-[#b5a494]">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#a89889]">Today's Revenue</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-950/40">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-heading text-3xl font-black text-white tracking-tight">
              {shopInfo.currency}{totalRevenue.toFixed(2)}
            </h3>
            <span className="text-xs font-bold text-emerald-400 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingUp size={12} className="mr-0.5" /> +14.2%
            </span>
          </div>
          <p className="text-[11px] text-[#8e7e70] font-medium">{paidOrders.length} Completed Transactions</p>
        </div>

        {/* Active Orders */}
        <div className="glass-sweet p-3.5 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-[#b5a494]">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#a89889]">Active Orders</span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-md shadow-amber-950/40">
              <Flame size={18} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeOrdersCount}
            </h3>
            <span className="text-[10px] sm:text-xs text-amber-400 font-bold bg-amber-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-500/20">
              Queue
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium truncate">Orders in prep / kitchen</p>
        </div>

        {/* Table Occupancy */}
        <div className="glass-sweet p-3.5 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-[#b5a494]">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#a89889]">Floor Tables</span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-md shadow-purple-950/40">
              <Users size={18} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              {occupiedTablesCount}/{tables.length}
            </h3>
            <span className="text-[10px] sm:text-xs text-purple-300 font-bold bg-purple-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-purple-500/20">
              {Math.round((occupiedTablesCount / tables.length) * 100)}%
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium truncate">{tables.length - occupiedTablesCount} Vacant Ready</p>
        </div>

        {/* Avg Order Value */}
        <div className="glass-sweet p-3.5 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-[#b5a494]">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#a89889]">Avg Ticket</span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-950/40">
              <TrendingUp size={18} className="sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
              {shopInfo.currency}{avgOrderVal.toFixed(0)}
            </h3>
            <span className="text-[10px] sm:text-xs text-blue-400 font-bold bg-blue-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-blue-500/20">
              Avg
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium truncate">Per Table Order</p>
        </div>

      </div>

      {/* Visual Revenue Bar Chart & Top Selling Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hourly Sales Chart */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-black text-white text-lg tracking-wide">Hourly Sales Analytics ({shopInfo.currency})</h3>
              <p className="text-xs text-[#b5a494]">Revenue distribution across peak coffee hours</p>
            </div>
            <span className="text-xs font-black px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 rounded-full border border-amber-500/30 shadow-sm">
              Peak Hour: 04 PM
            </span>
          </div>

          <div className="pt-6 pb-2 h-56 flex items-end justify-between gap-3">
            {chartData.map((item, idx) => {
              const heightPercent = (item.sales / maxSale) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-black text-amber-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1">
                    {shopInfo.currency}{item.sales}
                  </span>
                  <div className="w-full bg-[#0d0907] rounded-t-xl h-40 flex items-end overflow-hidden border border-[#2d2119] p-1 shadow-inner">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-[#d97706] via-[#f59e0b] to-[#fbbf24] rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    ></div>
                  </div>
                  <span className="text-[11px] text-[#b5a494] font-extrabold">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-black text-white text-lg tracking-wide">Top Selling Coffee & Delights</h3>
          <div className="space-y-3">
            {menuItems.slice(0, 4).map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#120e0b] border border-[#2d2119] hover:border-amber-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-11 h-11 rounded-xl object-cover shadow-md" />
                  <div>
                    <p className="text-xs font-black text-white line-clamp-1">{item.name}</p>
                    <p className="text-[11px] font-bold text-amber-400 mt-0.5">{shopInfo.currency}{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Live System Activity Feed */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#2d2119] pb-3">
          <h3 className="font-heading font-black text-white text-lg flex items-center gap-2.5">
            <Clock size={19} className="text-amber-400" />
            <span>Live Operational Audit Log</span>
          </h3>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Real-time Sync Active
          </span>
        </div>

        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {logs.map(log => (
            <div key={log.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#120e0b] border border-[#231a14] hover:border-amber-500/20 transition-colors">
              <span className="text-[#fcf9f5] font-medium">{log.text}</span>
              <span className="text-[10px] text-[#8e7e70] font-mono whitespace-nowrap ml-4 bg-[#1b140f] px-2 py-0.5 rounded border border-[#2d2119]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
