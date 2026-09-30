import React from 'react';
import {
  CheckCircle,
  Coffee
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const WaiterActiveOrders = () => {
  const { orders, activeWaiter, updateOrderStatus, setBillingModalOrder, shopInfo } = useCoffee();

  // Filter active orders handled by logged-in waiter
  const waiterActiveOrders = orders.filter(o =>
    (activeWaiter ? o.waiterId === activeWaiter.id : true) &&
    o.status !== 'paid' &&
    o.status !== 'cancelled'
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1d1611] via-[#16100c] to-[#0f0b08] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-xl">
        <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
          Active Section Orders
        </h2>
        <p className="text-[11px] sm:text-xs text-[#b5a494] mt-1 font-medium">
          Live tracking for orders assigned to {activeWaiter ? activeWaiter.name : 'your terminal'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {waiterActiveOrders.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-card space-y-2">
            <Coffee size={36} className="mx-auto text-[#a89889]" />
            <p className="text-base text-white font-black">No active orders assigned</p>
            <p className="text-xs text-[#b5a494]">Take a new order from the Table Floor map!</p>
          </div>
        ) : (
          waiterActiveOrders.map(order => (
            <div key={order.id} className="glass-card p-5 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">{order.tableName}</h3>
                    <p className="text-xs text-amber-400 font-mono font-semibold">{order.id}</p>
                  </div>
                  <span className={`badge ${
                    order.status === 'pending' ? 'badge-pending' :
                    order.status === 'preparing' ? 'badge-preparing' :
                    order.status === 'ready' ? 'badge-ready pulse-active' : 'badge-served'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-[#120e0c] p-3 rounded-xl border border-[#2d221a] space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-white font-medium">{item.quantity}x {item.name}</span>
                      <span className="text-[#a39589]">{shopInfo.currency}{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#a39589]">Total Bill</span>
                  <span className="font-heading font-bold text-amber-400 text-sm">
                    {shopInfo.currency}{order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2d221a] flex gap-2">
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'served')}
                    className="btn btn-primary w-full btn-sm"
                  >
                    <CheckCircle size={14} /> Mark Served to Guest
                  </button>
                )}

                {order.status === 'served' && (
                  <button
                    onClick={() => setBillingModalOrder(order)}
                    className="btn btn-sm w-full bg-purple-600 hover:bg-purple-500 text-white font-bold"
                  >
                    Settle Bill
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
