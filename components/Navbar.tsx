import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-lg shadow-inner">
            🚚
          </div>
          <div className="font-bold text-lg tracking-tight">
            华人53'货运通
            <span className="ml-2 text-[10px] font-normal bg-slate-700 px-1.5 py-0.5 rounded text-gray-300">
              供应商版
            </span>
          </div>
        </div>
        {/* Removed Shipper Toggle as requested */}
        <div className="text-xs text-gray-400">
          实时货源
        </div>
      </div>
    </nav>
  );
};