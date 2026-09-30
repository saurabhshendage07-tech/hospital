import React, { useState } from 'react';
import { CoffeeProvider, useCoffee } from './context/CoffeeContext';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { ReceiptModal } from './components/common/ReceiptModal';
import { KOTModal } from './components/common/KOTModal';

// Admin Components
import { AdminAuth } from './components/admin/AdminAuth';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminMenu } from './components/admin/AdminMenu';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminBilling } from './components/admin/AdminBilling';

// Waiter Components
import { WaiterAuth } from './components/waiter/WaiterAuth';
import { WaiterDashboard } from './components/waiter/WaiterDashboard';
import { WaiterOrderModal } from './components/waiter/WaiterOrderModal';
import { WaiterActiveOrders } from './components/waiter/WaiterActiveOrders';

// Customer Component
import { CustomerOrderView } from './components/customer/CustomerOrderView';

import { LayoutDashboard, Coffee, ShoppingBag, DollarSign, Map, Clock, Layers } from 'lucide-react';

const MainAppContent = () => {
  const { role, setRole, adminLoggedIn, activeWaiter, orders, tables } = useCoffee();
  
  // Navigation active tabs
  const [adminTab, setAdminTab] = useState('dashboard');
  const [waiterTab, setWaiterTab] = useState('tables');
  const [selectedTableForOrder, setSelectedTableForOrder] = useState(null);

  // Live Counts for Badges
  const pendingOrdersCount = orders ? orders.filter(o => o.status === 'pending' || o.status === 'preparing').length : 0;
  const billRequestedCount = tables ? tables.filter(t => t.status === 'bill_requested').length : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#090705] text-[#fdfaf7] relative overflow-hidden">
      
      {/* Sweet Background Ambient Blobs */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 left-8 w-72 h-72 bg-pink-500/5 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      
      {/* Top Navbar */}
      <Navbar setActiveTab={role === 'admin' ? setAdminTab : setWaiterTab} />

      {/* Main Container with safe mobile bottom padding */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-5 pb-28 lg:pb-8 space-y-5 sm:space-y-6 relative z-10">
        
        {/* ==================== ADMIN PANEL ==================== */}
        {role === 'admin' && (
          !adminLoggedIn ? (
            <AdminAuth />
          ) : (
            <div className="space-y-5 sm:space-y-6">
              {/* Admin Sub Navigation */}
              <div className="flex items-center gap-2 border-b border-[#2d2119] pb-3 overflow-x-auto no-scrollbar scroll-smooth">
                <button
                  onClick={() => setAdminTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    adminTab === 'dashboard'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard Overview</span>
                </button>

                <button
                  onClick={() => setAdminTab('menu')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    adminTab === 'menu'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <Coffee size={16} />
                  <span>Menu Catalog</span>
                </button>

                <button
                  onClick={() => setAdminTab('orders')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    adminTab === 'orders'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <ShoppingBag size={16} />
                  <span>Live Orders Board</span>
                </button>

                <button
                  onClick={() => setAdminTab('billing')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    adminTab === 'billing'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <DollarSign size={16} />
                  <span>Billing & Sales Logs</span>
                </button>
              </div>

              {/* Views */}
              {adminTab === 'dashboard' && <AdminDashboard setActiveTab={setAdminTab} />}
              {adminTab === 'menu' && <AdminMenu />}
              {adminTab === 'orders' && <AdminOrders />}
              {adminTab === 'billing' && <AdminBilling />}
            </div>
          )
        )}

        {/* ==================== WAITER PANEL ==================== */}
        {role === 'waiter' && (
          !activeWaiter ? (
            <WaiterAuth />
          ) : (
            <div className="space-y-5 sm:space-y-6">
              {/* Waiter Sub Navigation */}
              <div className="flex items-center gap-2 border-b border-[#2d2119] pb-3 overflow-x-auto no-scrollbar scroll-smooth">
                <button
                  onClick={() => setWaiterTab('tables')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    waiterTab === 'tables'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <Map size={16} />
                  <span>Table Floor Map</span>
                </button>

                <button
                  onClick={() => setWaiterTab('active_orders')}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    waiterTab === 'active_orders'
                      ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[#15100c] text-[#b5a494] hover:text-white hover:bg-[#201813] border border-[#33241b]'
                  }`}
                >
                  <Clock size={16} />
                  <span>Active Section Orders</span>
                </button>
              </div>

              {/* Views */}
              {waiterTab === 'tables' && (
                <WaiterDashboard onSelectTableForOrder={(tId) => setSelectedTableForOrder(tId)} />
              )}
              {waiterTab === 'active_orders' && <WaiterActiveOrders />}

              {/* Order Taking Modal */}
              {selectedTableForOrder && (
                <WaiterOrderModal
                  tableId={selectedTableForOrder}
                  onClose={() => setSelectedTableForOrder(null)}
                />
              )}
            </div>
          )
        )}

        {/* ==================== CUSTOMER PORTAL ==================== */}
        {role === 'customer' && <CustomerOrderView />}

      </main>

      {/* ==================== MOBILE FLOATING BOTTOM APP BAR (< lg screens) ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0d0906]/95 backdrop-blur-2xl border-t border-amber-500/25 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
          {role === 'admin' && adminLoggedIn && (
            <>
              <button
                onClick={() => setAdminTab('dashboard')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all touch-press ${
                  adminTab === 'dashboard'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg ${adminTab === 'dashboard' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <LayoutDashboard size={18} />
                </div>
                <span className="text-[10px]">Overview</span>
              </button>

              <button
                onClick={() => setAdminTab('menu')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all touch-press ${
                  adminTab === 'menu'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg ${adminTab === 'menu' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <Coffee size={18} />
                </div>
                <span className="text-[10px]">Menu</span>
              </button>

              <button
                onClick={() => setAdminTab('orders')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all relative touch-press ${
                  adminTab === 'orders'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg relative ${adminTab === 'orders' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <ShoppingBag size={18} />
                  {pendingOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-amber-500 text-black text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                      {pendingOrdersCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">Orders</span>
              </button>

              <button
                onClick={() => setAdminTab('billing')}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all touch-press ${
                  adminTab === 'billing'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg ${adminTab === 'billing' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <DollarSign size={18} />
                </div>
                <span className="text-[10px]">Billing</span>
              </button>
            </>
          )}

          {role === 'waiter' && activeWaiter && (
            <>
              <button
                onClick={() => setWaiterTab('tables')}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all touch-press ${
                  waiterTab === 'tables'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg ${waiterTab === 'tables' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <Map size={18} />
                </div>
                <span className="text-[10px]">Floor Map</span>
              </button>

              <button
                onClick={() => setWaiterTab('active_orders')}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative touch-press ${
                  waiterTab === 'active_orders'
                    ? 'text-amber-400 font-black'
                    : 'text-[#8e7e70] hover:text-white'
                }`}
              >
                <div className={`p-1 rounded-lg relative ${waiterTab === 'active_orders' ? 'bg-amber-500/20 text-amber-400' : ''}`}>
                  <Clock size={18} />
                  {billRequestedCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-purple-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                      {billRequestedCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">Live Section</span>
              </button>
            </>
          )}

          {role === 'customer' && (
            <div className="flex items-center gap-2 px-2 py-1 text-xs">
              <span className="font-heading font-black text-amber-300 flex items-center gap-1.5">
                <Coffee size={15} /> Table QR View
              </span>
            </div>
          )}

          {/* Quick Role Switcher Pill */}
          <div className="h-6 w-[1px] bg-[#33241b] mx-0.5"></div>
          <button
            onClick={() => {
              const nextRole = role === 'admin' ? 'waiter' : role === 'waiter' ? 'customer' : 'admin';
              setRole(nextRole);
            }}
            className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-amber-300 bg-amber-500/15 border border-amber-500/35 touch-press shadow-sm"
            title="Switch User Role"
          >
            <Layers size={16} />
            <span className="text-[9px] font-black uppercase tracking-wider">
              {role === 'admin' ? 'Waiter' : role === 'waiter' ? 'Customer' : 'Admin'}
            </span>
          </button>
        </div>
      </nav>

      {/* Shared Modals & Alerts */}
      <ReceiptModal />
      <KOTModal />
      <Toast />

      {/* Footer */}
      <footer className="border-t border-[#231a14]/60 py-6 text-center text-xs text-[#a89889] no-print">
        <p className="font-semibold flex items-center justify-center gap-2">
          <span>☕ Velvet Roast Artisan Coffee & POS System</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">Freshly Brewed & Handcrafted with Love ✦</span>
        </p>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <CoffeeProvider>
      <MainAppContent />
    </CoffeeProvider>
  );
}
