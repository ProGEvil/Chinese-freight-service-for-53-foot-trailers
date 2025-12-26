import React from 'react';

export const Navbar: React.FC = () => {
  const handleShare = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("链接已复制！\n请粘贴发送给微信好友。");
    }).catch(() => {
      alert("复制失败，请手动复制浏览器地址栏链接。");
    });
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-lg shadow-inner">
            🚚
          </div>
          <div className="font-bold text-lg tracking-tight truncate max-w-[180px] md:max-w-none">
            Evolure 20445
            <span className="hidden md:inline">-Kristina</span>
            <span className="ml-2 text-[10px] font-normal bg-slate-700 px-1.5 py-0.5 rounded text-gray-300 align-middle">
              供应商版
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400 hidden sm:block">
            非实时货源
          </div>
          <button 
            onClick={handleShare}
            className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 border border-slate-600"
          >
            🔗 分享
          </button>
        </div>
      </div>
    </nav>
  );
};