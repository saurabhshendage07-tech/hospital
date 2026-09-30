import React, { useState } from 'react';
import {
  X,
  Printer,
  CheckCircle,
  CreditCard,
  Banknote,
  QrCode,
  Tag,
  Coffee,
  Sparkles
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';
import confetti from 'canvas-confetti';

export const ReceiptModal = () => {
  const { billingModalOrder, setBillingModalOrder, payAndCompleteOrder, shopInfo, discounts, showToast } = useCoffee();

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(billingModalOrder?.discountCode || '');

  if (!billingModalOrder) return null;

  const order = billingModalOrder;
  const isAlreadyPaid = order.paymentStatus === 'paid';

  // Recalculate preview if promo applied
  let previewDiscount = order.discountAmount;
  let codeName = appliedPromo || order.discountCode;

  if (appliedPromo && appliedPromo !== order.discountCode) {
    const matchedDisc = discounts.find(d => d.code.toUpperCase() === appliedPromo.toUpperCase());
    if (matchedDisc) {
      if (matchedDisc.type === 'percent') {
        previewDiscount = (order.subtotal * matchedDisc.percentage) / 100;
      } else if (matchedDisc.type === 'flat') {
        previewDiscount = Math.min(matchedDisc.flat, order.subtotal);
      }
    }
  }

  const taxableAmount = Math.max(0, order.subtotal - previewDiscount);
  const calculatedTax = (taxableAmount * shopInfo.taxRate) / 100;
  const calculatedService = (taxableAmount * shopInfo.serviceChargeRate) / 100;
  const calculatedTotal = taxableAmount + calculatedTax + calculatedService;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const found = discounts.find(d => d.code.toUpperCase() === promoInput.trim().toUpperCase());
    if (found) {
      setAppliedPromo(found.code);
      showToast(`Applied ${found.code}: ${found.description}`, 'success');
      setPromoInput('');
    } else {
      showToast(`Invalid promo code '${promoInput}'. Try 'WELCOME10' or 'COFFEE20'`, 'error');
    }
  };

  const handlePayment = () => {
    payAndCompleteOrder(order.id, paymentMethod, appliedPromo);
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored
    }

    setBillingModalOrder(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#181310] border border-[#33261e] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#221b16] border-b border-[#33261e] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Coffee size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">
                Invoice & Billing Settlement
              </h3>
              <p className="text-xs text-[#a39589]">
                Order {order.id} • {order.tableName}
              </p>
            </div>
          </div>
          <button
            onClick={() => setBillingModalOrder(null)}
            className="p-1.5 rounded-lg text-[#a39589] hover:text-white hover:bg-[#2c221a] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#f5f0eb] printable-receipt">
          
          {/* Coffee Shop Header */}
          <div className="text-center border-b border-[#33261e] pb-4 space-y-1">
            <h2 className="font-heading font-black text-2xl text-amber-400 tracking-wider uppercase">
              {shopInfo.name}
            </h2>
            <p className="text-xs text-[#a39589] font-medium">{shopInfo.tagline}</p>
            <p className="text-[11px] text-[#857467]">{shopInfo.address} • Ph: {shopInfo.phone}</p>
            <p className="text-[10px] text-[#6e6157] font-mono">GSTIN: {shopInfo.gstin}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 text-xs bg-[#120e0c] p-3 rounded-xl border border-[#2d221a]">
            <div>
              <span className="text-[#a39589]">Receipt No: </span>
              <strong className="text-white">{order.id}</strong>
            </div>
            <div className="text-right">
              <span className="text-[#a39589]">Table: </span>
              <strong className="text-amber-400">{order.tableName}</strong>
            </div>
            <div className="mt-1">
              <span className="text-[#a39589]">Waiter: </span>
              <span className="text-white">{order.waiterName}</span>
            </div>
            <div className="mt-1 text-right">
              <span className="text-[#a39589]">Date: </span>
              <span className="text-white">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-[#2c211a] pb-1">
              Ordered Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-[#221a15] pb-2">
                  <div className="flex-1 pr-2">
                    <p className="font-medium text-white">{item.name}</p>
                    {item.notes && <p className="text-[11px] text-amber-400/80 italic">└ {item.notes}</p>}
                    <p className="text-[11px] text-[#857467]">{item.quantity} x {shopInfo.currency}{item.price.toFixed(2)}</p>
                  </div>
                  <div className="font-semibold text-white">
                    {shopInfo.currency}{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Code Box (Only if not paid) */}
          {!isAlreadyPaid && (
            <div className="bg-[#120e0c] p-3 rounded-xl border border-[#2d221a] space-y-2 no-print">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Tag size={14} /> Apply Discount Promo
                </span>
                <span className="text-[10px] text-[#a39589]">Try: WELCOME10 or COFFEE20</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code..."
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  className="input-field text-xs uppercase"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn btn-primary btn-sm whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {codeName && (
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Sparkles size={12} /> Promo Applied: {codeName} (-{shopInfo.currency}{previewDiscount.toFixed(2)})
                </p>
              )}
            </div>
          )}

          {/* Subtotal & Taxes Breakdown */}
          <div className="bg-[#120e0c] p-4 rounded-xl border border-[#33261e] space-y-2 text-xs">
            <div className="flex justify-between text-[#a39589]">
              <span>Subtotal</span>
              <span className="text-white font-medium">{shopInfo.currency}{order.subtotal.toFixed(2)}</span>
            </div>

            {previewDiscount > 0 && (
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Discount ({codeName})</span>
                <span>-{shopInfo.currency}{previewDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#a39589]">
              <span>GST / VAT ({shopInfo.taxRate}%)</span>
              <span className="text-white">{shopInfo.currency}{calculatedTax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-[#a39589]">
              <span>Service Charge ({shopInfo.serviceChargeRate}%)</span>
              <span className="text-white">{shopInfo.currency}{calculatedService.toFixed(2)}</span>
            </div>

            <div className="border-t border-[#33261e] pt-2 mt-2 flex justify-between items-center text-sm">
              <span className="font-bold text-white">Grand Total</span>
              <span className="font-heading font-extrabold text-lg text-amber-400">
                {shopInfo.currency}{calculatedTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Method Selector (If unpaid) */}
          {!isAlreadyPaid ? (
            <div className="space-y-3 no-print">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Select Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('Cash')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'Cash'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-[#120e0c] border-[#2c221a] text-[#a39589] hover:bg-[#201813]'
                  }`}
                >
                  <Banknote size={22} className="mb-1" />
                  <span>Cash</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'Card'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-[#120e0c] border-[#2c221a] text-[#a39589] hover:bg-[#201813]'
                  }`}
                >
                  <CreditCard size={22} className="mb-1" />
                  <span>Card POS</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('UPI / QR')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'UPI / QR'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-[#120e0c] border-[#2c221a] text-[#a39589] hover:bg-[#201813]'
                  }`}
                >
                  <QrCode size={22} className="mb-1" />
                  <span>UPI / QR</span>
                </button>
              </div>

              {paymentMethod === 'UPI / QR' && (
                <div className="bg-[#120e0c] p-3 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-white">Scan to Pay via UPI App</p>
                    <p className="text-[11px] text-[#a39589]">GPay / PhonePe / Paytm / Apple Pay</p>
                    <p className="text-xs font-extrabold text-amber-400 mt-1">{shopInfo.currency}{calculatedTotal.toFixed(2)}</p>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center">
                    {/* Simulated QR Code SVG */}
                    <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v2h-4v-2zm2 2h4v2h-4v-2zm-4 0h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs text-center font-semibold">
              ✓ Paid in full via {order.paymentMethod || 'Cash'} {order.paidAt ? `on ${new Date(order.paidAt).toLocaleTimeString()}` : ''}
            </div>
          )}

          {/* Footer Note */}
          <div className="text-center pt-2 border-t border-[#33261e] text-[11px] text-[#857467] space-y-0.5">
            <p className="italic font-medium text-[#a39589]">Thank you for visiting {shopInfo.name}!</p>
            <p>Please visit again for exceptional coffee, shakes & delicious food.</p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#221b16] border-t border-[#33261e] flex items-center justify-between gap-3 no-print">
          <button
            onClick={handlePrint}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>

          {!isAlreadyPaid ? (
            <button
              onClick={handlePayment}
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              <span>Settle & Mark Paid ({shopInfo.currency}{calculatedTotal.toFixed(2)})</span>
            </button>
          ) : (
            <button
              onClick={() => setBillingModalOrder(null)}
              className="btn btn-primary"
            >
              Close Receipt
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
