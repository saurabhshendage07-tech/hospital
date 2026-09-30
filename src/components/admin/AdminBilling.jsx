import React, { useState } from 'react';
import {
  Printer,
  CreditCard,
  Banknote,
  QrCode,
  Search,
  Receipt
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const AdminBilling = () => {
  const { orders, setBillingModalOrder, shopInfo } = useCoffee();
  const [searchQuery, setSearchQuery] = useState('');

  const paidOrders = orders.filter(o => o.paymentStatus === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

  // Payment Breakdown
  const cashTotal = paidOrders.filter(o => !o.paymentMethod || o.paymentMethod === 'Cash').reduce((sum, o) => sum + o.total, 0);
  const cardTotal = paidOrders.filter(o => o.paymentMethod === 'Card').reduce((sum, o) => sum + o.total, 0);
  const upiTotal = paidOrders.filter(o => o.paymentMethod === 'UPI / QR').reduce((sum, o) => sum + o.total, 0);

  const filteredBills = paidOrders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.waiterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl">
        <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2.5">
          <Receipt size={24} className="text-amber-400 flex-shrink-0" />
          <span>Billing & Financial Reports</span>
        </h2>
        <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
          Audit completed transactions, invoice receipts, and revenue payment methods
        </p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="glass-sweet p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-[11px] text-[#a89889] font-black uppercase tracking-wider">Settled Revenue</p>
          <h3 className="font-heading text-xl sm:text-3xl font-black text-amber-400 tracking-tight">
            {shopInfo.currency}{totalRevenue.toFixed(2)}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium">{paidOrders.length} Paid Invoices</p>
        </div>

        <div className="glass-sweet p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-[11px] text-[#a89889] font-black uppercase tracking-wider flex items-center gap-1.5">
            <Banknote size={15} className="text-emerald-400" /> Cash Sales
          </p>
          <h3 className="font-heading text-xl sm:text-3xl font-black text-white tracking-tight">
            {shopInfo.currency}{cashTotal.toFixed(2)}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium">{Math.round((cashTotal / (totalRevenue || 1)) * 100)}% of total</p>
        </div>

        <div className="glass-sweet p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-[11px] text-[#a89889] font-black uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard size={15} className="text-blue-400" /> Card POS
          </p>
          <h3 className="font-heading text-xl sm:text-3xl font-black text-white tracking-tight">
            {shopInfo.currency}{cardTotal.toFixed(2)}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium">{Math.round((cardTotal / (totalRevenue || 1)) * 100)}% of total</p>
        </div>

        <div className="glass-sweet p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
          <p className="text-[10px] sm:text-[11px] text-[#a89889] font-black uppercase tracking-wider flex items-center gap-1.5">
            <QrCode size={15} className="text-purple-400" /> UPI / QR
          </p>
          <h3 className="font-heading text-xl sm:text-3xl font-black text-white tracking-tight">
            {shopInfo.currency}{upiTotal.toFixed(2)}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#8e7e70] font-medium">{Math.round((upiTotal / (totalRevenue || 1)) * 100)}% of total</p>
        </div>
      </div>

      {/* Search & Invoices Table */}
      <div className="glass-sweet p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 sm:gap-4">
          <h3 className="font-heading font-black text-white text-base sm:text-lg tracking-wide">Completed Invoices Log</h3>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-3.5 text-[#a89889]" />
            <input
              type="text"
              placeholder="Search Invoice # or Table..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field pl-10 text-xs font-medium w-full"
            />
          </div>
        </div>

        {/* Mobile View: Cards on Phone */}
        <div className="space-y-3 md:hidden">
          {filteredBills.length === 0 ? (
            <div className="p-8 text-center text-[#8e7e70] text-xs font-medium">
              No paid invoice records match search criteria.
            </div>
          ) : (
            filteredBills.map(bill => (
              <div key={bill.id} className="p-3.5 rounded-2xl bg-[#140e0b] border border-[#2d2119] space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-black text-amber-400 text-xs">{bill.id}</span>
                    <h4 className="font-heading font-black text-white text-sm">{bill.tableName}</h4>
                    <p className="text-[11px] text-[#a89889]">Waiter: {bill.waiterName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-black text-white text-base block">
                      {shopInfo.currency}{bill.total.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#221913] text-amber-300 border border-[#33241b]">
                      {bill.paymentMethod || 'Cash'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#231a14] text-xs">
                  <span className="text-[#a89889] text-[11px]">
                    {bill.items.reduce((s, i) => s + i.quantity, 0)} items {bill.discountAmount > 0 ? `(Disc: -${shopInfo.currency}${bill.discountAmount.toFixed(0)})` : ''}
                  </span>
                  <button
                    onClick={() => setBillingModalOrder(bill)}
                    className="btn btn-secondary btn-sm py-1.5 px-3 text-xs flex items-center gap-1.5"
                  >
                    <Printer size={13} />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-[#2d2119]">
          <table className="w-full text-left text-xs text-[#fcf9f5]">
            <thead className="bg-[#120e0b] text-[#a89889] uppercase text-[10px] tracking-wider border-b border-[#2d2119]">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Table</th>
                <th className="p-3.5">Waiter</th>
                <th className="p-3.5">Payment Mode</th>
                <th className="p-3.5">Items Qty</th>
                <th className="p-3.5 text-right">Discount</th>
                <th className="p-3.5 text-right">Grand Total</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231a14] bg-[#0d0907]/60">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#8e7e70] font-medium">
                    No paid invoice records match search criteria.
                  </td>
                </tr>
              ) : (
                filteredBills.map(bill => (
                  <tr key={bill.id} className="hover:bg-[#1f1712] transition-colors">
                    <td className="p-3.5 font-mono font-black text-amber-400">{bill.id}</td>
                    <td className="p-3.5 font-bold text-white">{bill.tableName}</td>
                    <td className="p-3.5 text-[#b5a494]">{bill.waiterName}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#221913] text-amber-300 font-bold border border-[#33241b]">
                        {bill.paymentMethod || 'Cash'}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#b5a494]">{bill.items.reduce((s, i) => s + i.quantity, 0)} items</td>
                    <td className="p-3.5 text-right text-emerald-400 font-bold">
                      {bill.discountAmount > 0 ? `-${shopInfo.currency}${bill.discountAmount.toFixed(2)}` : '—'}
                    </td>
                    <td className="p-3.5 text-right font-black text-white text-sm">
                      {shopInfo.currency}{bill.total.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setBillingModalOrder(bill)}
                        className="btn btn-secondary btn-sm flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <Printer size={13} />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
