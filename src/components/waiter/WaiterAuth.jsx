import React, { useState } from 'react';
import { UserCheck, KeyRound } from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const WaiterAuth = () => {
  const { waiters, loginWaiter } = useCoffee();
  const [selectedWaiterId, setSelectedWaiterId] = useState(waiters[0].id);
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWaiter(selectedWaiterId, pin);
  };

  const handleSelectDirect = (waiter) => {
    setSelectedWaiterId(waiter.id);
    loginWaiter(waiter.id, waiter.pin);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#18120e] to-[#0e0b08] border border-amber-500/25 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
        
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#d97706] via-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-[#0c0805] shadow-xl shadow-amber-500/25">
            <UserCheck size={38} className="stroke-[2.5]" />
            <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md -z-10"></div>
          </div>
          <h2 className="font-heading font-black text-2xl text-white tracking-wide">Waiter Terminal Login</h2>
          <p className="text-xs text-[#b5a494] font-medium">Select your staff profile for quick 1-click access</p>
        </div>

        {/* Waiter Profile Cards */}
        <div className="grid grid-cols-2 gap-3.5">
          {waiters.map(w => (
            <button
              key={w.id}
              onClick={() => handleSelectDirect(w)}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all duration-300 ${
                selectedWaiterId === w.id
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500 shadow-lg shadow-amber-500/15 scale-[1.02]'
                  : 'bg-[#120e0b] border-[#2d2119] hover:bg-[#201813] hover:border-amber-500/30'
              }`}
            >
              <span className="text-3xl filter drop-shadow">{w.avatar}</span>
              <div>
                <p className="text-xs font-black text-white leading-tight">{w.name}</p>
                <p className="text-[11px] text-amber-400 font-bold mt-0.5">{w.section}</p>
              </div>
            </button>
          ))}
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-3 border-t border-[#2d2119]">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-amber-400 flex items-center gap-1.5">
              <KeyRound size={15} /> Enter Waiter PIN (Or click profile above)
            </label>
            <input
              type="password"
              placeholder="PIN (Demo: 1111 / 1234)"
              value={pin}
              onChange={e => setPin(e.target.value)}
              className="input-field text-center font-mono text-xl font-black tracking-widest"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full btn-lg shadow-lg shadow-amber-500/25"
          >
            Access Waiter Terminal
          </button>
        </form>

      </div>
    </div>
  );
};
