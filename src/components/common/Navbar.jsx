import React from 'react';
import {
  Coffee,
  ShieldCheck,
  UserCheck,
  QrCode,
  Volume2,
  VolumeX,
  RotateCcw,
  LogOut
} from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const Navbar = ({ setActiveTab }) => {
  const {
    role, setRole,
    adminLoggedIn, logoutAdmin,
    authUser,
    activeWaiter,
    soundEnabled, setSoundEnabled,
    resetToDefaultData,
    orders,
    tables,
    firebaseConnected
  } = useCoffee();

  // Active counts for badges
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const billRequestedCount = tables.filter(t => t.status === 'bill_requested').length;

  return (
    <header className="sticky top-0 z-40 bg-[#0e0b08]/92 backdrop-blur-2xl border-b border-[#2d2119] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-2xl transition-all">
      <div className="max-w-[1780px] w-full mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-4">
        
        {/* Top Row for Mobile (Logo Left, Tools Right) / Left Side on Desktop */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer select-none"
            onClick={() => {
              setRole('admin');
              if (setActiveTab) setActiveTab('dashboard');
            }}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#d97706] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#0c0805] shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              {/* Rising sweet steam particles */}
              <div className="absolute -top-1 left-2.5 w-1.5 h-1.5 rounded-full bg-amber-200/90 animate-steam pointer-events-none"></div>
              <div className="absolute -top-2 left-4.5 w-2 h-2 rounded-full bg-amber-100 animate-steam [animation-delay:0.8s] pointer-events-none"></div>
              <div className="absolute -top-1 left-6.5 w-1.5 h-1.5 rounded-full bg-amber-200/80 animate-steam [animation-delay:1.4s] pointer-events-none"></div>
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md -z-10 group-hover:blur-lg transition-all"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-heading font-black text-lg sm:text-xl tracking-wider animate-shimmer drop-shadow-sm whitespace-nowrap uppercase">
                  CAFE PAILWAN
                </h1>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35 shadow-inner">
                  Artisan POS
                </span>
                {firebaseConnected && (
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#a89889] font-medium hidden md:block">Specialty Coffee, Shakes & Cloud Real-Time Operations</p>
            </div>
          </div>

          {/* Quick Tools on Mobile (visible only on screens < lg) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-[#1d1611] text-[#b5a494] hover:text-amber-400 border border-[#33241b]"
              title={soundEnabled ? "Mute audio cues" : "Enable audio cues"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-red-400" />}
            </button>

            {role === 'waiter' && activeWaiter && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#33241b]">
                <span className="text-xl">{activeWaiter.avatar}</span>
                <span className="text-xs font-black text-white hidden sm:inline">{activeWaiter.name}</span>
              </div>
            )}

            {role === 'admin' && adminLoggedIn && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#33241b]">
                <span className="text-[11px] font-bold text-amber-300 max-w-[85px] truncate">
                  {authUser?.displayName || 'Admin'}
                </span>
                <button
                  onClick={logoutAdmin}
                  className="p-1.5 rounded-lg bg-red-950/40 text-red-300 text-xs font-bold border border-red-800/40"
                  title="Logout Admin"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Role Navigation Switcher (Full width on mobile, centered on desktop) */}
        <div className="flex items-center justify-center bg-[#16100c] p-1.5 rounded-2xl border border-[#33241b] shadow-inner w-full lg:w-auto">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => {
                setRole('admin');
                if (setActiveTab) setActiveTab('dashboard');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'text-[#b5a494] hover:text-white hover:bg-[#231a14]'
              }`}
            >
              <ShieldCheck size={16} />
              <span className="hidden sm:inline">ADMIN PANEL</span>
              <span className="sm:hidden">ADMIN</span>
              {role === 'admin' && adminLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              )}
            </button>

            <button
              onClick={() => {
                setRole('waiter');
                if (setActiveTab) setActiveTab('tables');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black tracking-wide transition-all duration-300 relative whitespace-nowrap ${
                role === 'waiter'
                  ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'text-[#b5a494] hover:text-white hover:bg-[#231a14]'
              }`}
            >
              <UserCheck size={16} />
              <span className="hidden sm:inline">WAITER PANEL</span>
              <span className="sm:hidden">WAITER</span>
              {billRequestedCount > 0 && (
                <span className="px-1.5 py-0.5 text-[9px] bg-purple-500 text-white rounded-full font-black animate-pulse shadow-md">
                  {billRequestedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setRole('customer'); }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black tracking-wide transition-all duration-300 whitespace-nowrap ${
                role === 'customer'
                  ? 'bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-[#0c0805] shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'text-[#b5a494] hover:text-white hover:bg-[#231a14]'
              }`}
            >
              <QrCode size={16} />
              <span className="hidden sm:inline">CUSTOMER QR VIEW</span>
              <span className="sm:hidden">QR MENU</span>
            </button>
          </div>
        </div>

        {/* Right Tools & User Info (visible on desktop) */}
        <div className="hidden lg:flex items-center gap-2.5">
          
          {/* Live Kitchen Badge */}
          {pendingOrdersCount > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-400 text-xs font-extrabold shadow-sm whitespace-nowrap">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span>{pendingOrdersCount} Kitchen Order{pendingOrdersCount > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-[#1d1611] text-[#b5a494] hover:text-amber-400 border border-[#33241b] hover:border-amber-500/40 transition-all shadow-sm"
            title={soundEnabled ? "Mute audio cues" : "Enable audio cues"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-red-400" />}
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm("Reset all coffee shop orders & tables to clean demo state?")) {
                resetToDefaultData();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1d1611] text-xs font-extrabold text-[#b5a494] hover:text-white border border-[#33241b] hover:border-amber-500/40 transition-all shadow-sm whitespace-nowrap"
            title="Reset system dataset"
          >
            <RotateCcw size={15} />
            <span className="hidden xl:inline">Reset Demo</span>
          </button>

          {/* Admin User Info & Logout */}
          {role === 'admin' && adminLoggedIn && (
            <div className="flex items-center gap-2 pl-2 border-l border-[#33241b]">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white leading-none">
                  {authUser?.displayName || 'Admin'}
                </p>
                <p className="text-[10px] text-amber-400 font-bold max-w-[140px] truncate leading-tight mt-0.5">
                  {authUser?.email || 'admin@cafepailwan.com'}
                </p>
              </div>
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 text-red-300 text-xs font-bold border border-red-800/40 hover:bg-red-900/60 transition-colors shadow-sm whitespace-nowrap"
                title="Logout Admin"
              >
                <LogOut size={14} />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          )}

          {role === 'waiter' && activeWaiter && (
            <div className="flex items-center gap-2 pl-3 border-l border-[#33241b]">
              <span className="text-2xl filter drop-shadow">{activeWaiter.avatar}</span>
              <div className="text-left hidden xl:block">
                <p className="text-xs font-black text-white leading-none whitespace-nowrap">{activeWaiter.name}</p>
                <p className="text-[11px] text-amber-400 font-bold leading-tight mt-0.5 whitespace-nowrap">{activeWaiter.section}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

