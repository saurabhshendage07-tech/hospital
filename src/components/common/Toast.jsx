import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useCoffee } from '../../context/CoffeeContext';

export const Toast = () => {
  const { toast } = useCoffee();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-red-400" />,
    warning: <AlertCircle size={18} className="text-amber-400" />,
    info: <Info size={18} className="text-blue-400" />
  };

  const bgColors = {
    success: 'border-emerald-500/30 bg-emerald-950/90 text-emerald-100',
    error: 'border-red-500/30 bg-red-950/90 text-red-100',
    warning: 'border-amber-500/30 bg-amber-950/90 text-amber-100',
    info: 'border-blue-500/30 bg-blue-950/90 text-blue-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${bgColors[toast.type] || bgColors.info}`}>
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
      </div>
    </div>
  );
};
