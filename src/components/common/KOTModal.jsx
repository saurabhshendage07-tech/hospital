import React from 'react';
import { X, Printer, Coffee, Flame } from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const KOTModal = () => {
  const { kotModalOrder, setKotModalOrder, updateOrderStatus, shopInfo } = useCoffee();

  if (!kotModalOrder) return null;
  const order = kotModalOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleAdvance = () => {
    const nextStatus = order.status === 'pending' ? 'preparing' : order.status === 'preparing' ? 'ready' : 'served';
    updateOrderStatus(order.id, nextStatus);
    setKotModalOrder(null);
  };

  // Calculations for printed receipt & modal view
  const subtotal = order.subtotal || order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = order.tax !== undefined ? order.tax : (subtotal * shopInfo.taxRate) / 100;
  const serviceCharge = order.serviceCharge !== undefined ? order.serviceCharge : (subtotal * shopInfo.serviceChargeRate) / 100;
  const discountAmount = order.discountAmount || 0;
  const totalAmount = order.total || (subtotal + tax + serviceCharge - discountAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#181310] border border-amber-500/30 w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#231b15] via-[#1a130f] to-[#140e0b] border-b border-[#33261e] flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-black font-black shadow-md shadow-amber-500/20">
              <Coffee size={20} />
            </div>
            <div>
              <h3 className="font-heading font-black text-white text-base sm:text-lg tracking-wide uppercase">
                {shopInfo.name} — Tax Invoice & Ticket
              </h3>
              <p className="text-xs text-amber-400 font-mono font-bold">
                Order #{order.id} • {order.tableName}
              </p>
            </div>
          </div>
          <button
            onClick={() => setKotModalOrder(null)}
            className="p-1.5 rounded-xl text-[#a39589] hover:text-white hover:bg-[#2c221a] transition-all border border-[#33261e]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Printable Ticket & Bill Body */}
        <div className="p-6 bg-white text-black font-mono space-y-4 overflow-y-auto flex-1 printable-receipt shadow-inner">
          
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-3">
            <h2 className="font-heading font-black text-2xl tracking-wider text-black uppercase">
              {shopInfo.name}
            </h2>
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mt-0.5">
              {shopInfo.tagline}
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5">{shopInfo.address} • Ph: {shopInfo.phone}</p>
            <p className="text-[10px] font-bold text-gray-700">GSTIN: {shopInfo.gstin}</p>

            <div className="mt-2.5 pt-2 border-t border-dashed border-black/40 flex justify-between items-center text-xs font-bold">
              <span>BILL / INVOICE #{order.id}</span>
              <span className="text-sm font-black bg-black text-white px-2 py-0.5 rounded">*** {order.tableName.toUpperCase()} ***</span>
            </div>

            <div className="flex justify-between text-[11px] text-gray-700 font-semibold mt-1">
              <span>Staff: {order.waiterName}</span>
              <span>Time: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>

          {/* Itemized Order List with Item Amount */}
          <div className="space-y-2">
            <div className="grid grid-cols-12 font-extrabold border-b-2 border-black text-xs pb-1 text-black">
              <span className="col-span-6">ITEM</span>
              <span className="col-span-2 text-center">QTY</span>
              <span className="col-span-2 text-right">RATE</span>
              <span className="col-span-2 text-right">AMOUNT</span>
            </div>

            {order.items.map((item, idx) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div key={idx} className="border-b border-dashed border-black/25 pb-2 text-xs">
                  <div className="grid grid-cols-12 font-bold text-sm items-center">
                    <span className="col-span-6 pr-1 leading-tight">{item.name}</span>
                    <span className="col-span-2 text-center font-black">x{item.quantity}</span>
                    <span className="col-span-2 text-right text-gray-800">{shopInfo.currency}{item.price.toFixed(0)}</span>
                    <span className="col-span-2 text-right font-black">{shopInfo.currency}{itemTotal.toFixed(0)}</span>
                  </div>
                  {item.notes && (
                    <p className="text-[11px] font-bold bg-amber-100 border-l-2 border-amber-500 p-1 rounded mt-1 text-amber-950">
                      └ {item.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtotal & Total Bill Paid Amount Section */}
          <div className="border-t-2 border-black pt-2 space-y-1 text-xs">
            <div className="flex justify-between font-semibold">
              <span>Subtotal:</span>
              <span>{shopInfo.currency}{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Discount ({order.discountCode || 'Promo'}):</span>
                <span>-{shopInfo.currency}{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-700">
              <span>GST ({shopInfo.taxRate}%):</span>
              <span>{shopInfo.currency}{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Service Charge ({shopInfo.serviceChargeRate}%):</span>
              <span>{shopInfo.currency}{serviceCharge.toFixed(2)}</span>
            </div>

            {/* Total Bill Amount Highlighted */}
            <div className="border-t-2 border-b-2 border-black py-1.5 my-1.5 flex justify-between items-center text-sm font-black bg-black/5 px-1">
              <span className="uppercase tracking-wider">TOTAL BILL AMOUNT:</span>
              <span className="text-base font-extrabold">{shopInfo.currency}{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-bold pt-0.5">
              <span>PAYMENT STATUS: <span className="uppercase underline">{order.paymentStatus || 'UNPAID'}</span></span>
              {order.paymentMethod && <span>METHOD: {order.paymentMethod}</span>}
            </div>
          </div>

          <div className="text-center pt-2 border-t border-black/30 text-[11px] space-y-0.5">
            <p className="font-extrabold uppercase">Thank you for dining at {shopInfo.name}!</p>
            <p className="text-gray-600 font-medium">Please visit again for exceptional coffee & delicious food.</p>
          </div>

        </div>

        {/* Action Controls */}
        <div className="p-4 bg-[#140e0b] border-t border-[#33261e] flex items-center justify-between gap-3 no-print">
          <button
            onClick={handlePrint}
            className="btn btn-secondary flex items-center justify-center gap-2 flex-1 shadow-md hover:border-amber-500/50 transition-all"
          >
            <Printer size={16} />
            <span>Print Bill / Receipt</span>
          </button>

          <button
            onClick={handleAdvance}
            className="btn btn-primary flex items-center justify-center gap-2 flex-1 shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition-transform"
          >
            <Flame size={16} />
            <span>Mark {order.status === 'pending' ? 'Preparing' : 'Ready'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
