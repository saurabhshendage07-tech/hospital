import React, { useState } from 'react';
import {
  Users,
  PlusCircle
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const WaiterDashboard = ({ onSelectTableForOrder }) => {
  const {
    tables,
    orders,
    activeWaiter,
    updateTableStatus,
    requestBillForTable,
    setBillingModalOrder,
    shopInfo
  } = useCoffee();

  const [sectionFilter, setSectionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusBadges = {
    vacant: 'badge-vacant',
    occupied: 'badge-occupied',
    bill_requested: 'badge-bill',
    reserved: 'badge-reserved'
  };

  const sections = ['all', 'Main Hall', 'Window View', 'Terrace Garden', 'VIP Lounge', 'Bar Counter'];

  const filteredTables = tables.filter(t => {
    const matchesSec = sectionFilter === 'all' || t.section === sectionFilter;
    const matchesStat = statusFilter === 'all' || t.status === statusFilter;
    return matchesSec && matchesStat;
  });

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 sm:gap-4 bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
              Table Floor Operations
            </h2>
            {activeWaiter && (
              <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/15 text-amber-300 font-extrabold border border-amber-500/30">
                Staff: {activeWaiter.name}
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
            Tap any table card to take a new order, append items, or request instant bill settlement
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs flex-wrap">
          <span className="badge badge-vacant">Vacant</span>
          <span className="badge badge-occupied">Occupied</span>
          <span className="badge badge-bill">Bill Requested</span>
          <span className="badge badge-reserved">Reserved</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Sections */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 w-full lg:w-auto">
          {sections.map(sec => (
            <button
              key={sec}
              onClick={() => setSectionFilter(sec)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                sectionFilter === sec
                  ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] font-black shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
              }`}
            >
              {sec === 'all' ? 'All Sections' : sec}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-[#120e0b] p-1 rounded-xl border border-[#2d2119] overflow-x-auto no-scrollbar flex-shrink-0 self-start lg:self-auto">
          {['all', 'vacant', 'occupied', 'bill_requested'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#2b1f18] text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-[#8e7e70] hover:text-white'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tables Grid - Scales beautifully: 1 col on mobile, 2 on small tablet, 3 on tablet, 4 on desktop, 5 on widescreen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
        {filteredTables.map(table => {
          // Find active unpaid order for table
          const activeOrder = orders.find(o => o.tableId === table.id && o.paymentStatus === 'unpaid' && o.status !== 'cancelled');

          return (
            <div
              key={table.id}
              className={`glass-card p-4 sm:p-5 flex flex-col justify-between h-full min-h-[290px] transition-all duration-300 relative group ${
                table.status === 'bill_requested' ? 'border-purple-500/70 shadow-[0_0_25px_rgba(168,85,247,0.3)] animate-pulse' :
                table.status === 'occupied' ? 'border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : ''
              }`}
            >
              {/* Header & Middle Content */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wide">
                      {table.name}
                    </h3>
                    <p className="text-xs text-[#b5a494] flex items-center gap-1.5 mt-0.5 font-medium">
                      <Users size={13} className="text-amber-400 flex-shrink-0" /> Seats {table.capacity} • {table.section}
                    </p>
                  </div>
                  <span className={`badge ${statusBadges[table.status] || 'badge-vacant'} whitespace-nowrap text-[10px] sm:text-xs`}>
                    {table.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Active Order Preview or Vacant Box with consistent min-height */}
                <div className="min-h-[82px] flex flex-col justify-center">
                  {activeOrder ? (
                    <div className="bg-[#120e0b] p-3 rounded-xl border border-[#2d2119] space-y-1.5 text-xs shadow-inner h-full flex flex-col justify-between">
                      <div className="flex justify-between font-black">
                        <span className="text-amber-400 font-mono text-[11px]">{activeOrder.id}</span>
                        <span className="text-emerald-400 font-black text-xs">{shopInfo.currency}{activeOrder.total.toFixed(2)}</span>
                      </div>
                      <p className="text-[11px] text-[#b5a494] line-clamp-1 font-medium">
                        {activeOrder.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-[#8e7e70] pt-1 border-t border-[#231a14]">
                        <span>Status: <strong className="text-amber-300 uppercase font-black">{activeOrder.status}</strong></span>
                        <span className="truncate max-w-[80px]">Waiter: {activeOrder.waiterName}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#120e0b]/60 p-4 rounded-xl border border-dashed border-[#2d2119] text-center text-xs text-[#8e7e70] font-medium flex items-center justify-center h-full">
                      Table is vacant & ready for guests.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 border-t border-[#2d2119] pt-3 mt-3">
                <button
                  onClick={() => onSelectTableForOrder(table.id)}
                  className="btn btn-primary w-full btn-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <PlusCircle size={15} />
                  <span>{activeOrder ? 'View / Append Items' : 'Take New Order'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2 min-h-[34px]">
                  {table.status === 'occupied' && (
                    <>
                      <button
                        onClick={() => requestBillForTable(table.id)}
                        className="btn btn-secondary btn-sm text-[11px] text-purple-300 border-purple-500/35 hover:bg-purple-500/20"
                      >
                        Request Bill
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Clear table 0${table.id} and mark vacant?`)) {
                            updateTableStatus(table.id, 'vacant', null);
                          }
                        }}
                        className="btn btn-secondary btn-sm text-[11px] text-red-400 border-red-800/30 hover:bg-red-950/40"
                      >
                        Clear Table
                      </button>
                    </>
                  )}

                  {table.status === 'bill_requested' && activeOrder && (
                    <button
                      onClick={() => setBillingModalOrder(activeOrder)}
                      className="btn btn-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-[11px] col-span-2 shadow-lg shadow-purple-900/40"
                    >
                      Settle Bill ({shopInfo.currency}{activeOrder.total.toFixed(2)})
                    </button>
                  )}

                  {table.status === 'vacant' && (
                    <button
                      onClick={() => updateTableStatus(table.id, 'reserved', activeWaiter ? activeWaiter.id : null)}
                      className="btn btn-secondary btn-sm text-[11px] text-blue-300 border-blue-500/30 col-span-2"
                    >
                      Mark Reserved
                    </button>
                  )}

                  {table.status === 'reserved' && (
                    <button
                      onClick={() => updateTableStatus(table.id, 'vacant', null)}
                      className="btn btn-secondary btn-sm text-[11px] text-emerald-300 border-emerald-500/30 col-span-2"
                    >
                      Clear Reserved
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
