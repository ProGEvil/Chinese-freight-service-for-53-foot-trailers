import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoadCard } from './components/LoadCard';
import { AdminDashboard } from './components/AdminDashboard';
import { MANUAL_LOADS, TOMORROW_DATE, WECHAT_QR_IMAGE } from './constants';
import { Load } from './types';

const App: React.FC = () => {
  // --- State Management ---
  // Lazy initialization: Check URL for ?admin=true parameter on startup
  const [view, setView] = useState<'home' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === 'true' ? 'admin' : 'home';
    }
    return 'home';
  });

  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [qrError, setQrError] = useState(false);

  // --- Persistence Logic (Simulating Backend) ---
  useEffect(() => {
    // 1. Try to load from LocalStorage
    const savedLoads = localStorage.getItem('evolure_loads_v1');
    if (savedLoads) {
      try {
        setLoads(JSON.parse(savedLoads));
      } catch (e) {
        console.error("Failed to parse loads", e);
        setLoads(MANUAL_LOADS);
      }
    } else {
      // 2. If empty, seed with constants
      setLoads(MANUAL_LOADS);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever loads change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('evolure_loads_v1', JSON.stringify(loads));
    }
  }, [loads, isLoaded]);

  // --- Actions ---
  const handleAddLoad = (newLoad: Load) => {
    // Add new load to the top
    setLoads(prev => [newLoad, ...prev]);
  };

  const handleDeleteLoad = (id: string) => {
    if (window.confirm('确定要删除这条货源吗？')) {
      setLoads(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleExitAdmin = () => {
    // 1. Switch view
    setView('home');
    // 2. Clean URL so refreshing doesn't force admin mode again
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
  };

  // --- Filtering ---
  const term = searchTerm.toLowerCase().trim();
  const filteredLoads = loads.filter(load => 
    load.originCity.toLowerCase().includes(term) ||
    load.destinationState.toLowerCase().includes(term) ||
    load.warehouseCode.toLowerCase().includes(term) ||
    load.notes?.toLowerCase().includes(term)
  );

  const handleOpenModal = () => {
    setShowWeChatModal(true);
    setQrError(false);
  };

  // --- Render Admin View ---
  if (view === 'admin') {
    return (
      <AdminDashboard 
        loads={loads} 
        onAddLoad={handleAddLoad} 
        onDeleteLoad={handleDeleteLoad}
        onExit={handleExitAdmin} 
      />
    );
  }

  // --- Render Home View ---
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto p-4">
        
        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-sm p-2 mb-6 flex items-center border border-gray-200">
          <span className="pl-3 pr-2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="搜索城市、州名、仓库代码 (如 VA, LGB8)..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-slate-800 font-bold text-lg flex items-center gap-2">
            最新货源 
            <span className="text-xs font-normal text-white bg-blue-500 px-2 py-0.5 rounded-md">
              {TOMORROW_DATE}
            </span>
          </h2>
          <span className="text-xs text-gray-500">
            共 {filteredLoads.length} 条
          </span>
        </div>

        {/* Load List */}
        <div className="space-y-3">
          {filteredLoads.length > 0 ? (
            filteredLoads.map((load) => (
              <LoadCard 
                key={load.id} 
                load={load} 
                onWeChatClick={handleOpenModal} 
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🚛</div>
              <p className="text-gray-500 text-sm">
                暂时没有符合条件的货源
              </p>
              <p className="text-gray-400 text-xs mt-1">
                请尝试搜索州名简写（如 TX, VA）或仓库代码
              </p>
            </div>
          )}
        </div>

        {/* Informational Footer for Suppliers */}
        <div className="mt-8 text-center pb-8 space-y-2">
          <p className="text-xs text-gray-400">
            仅展示已审核的供应商货源。<br/>
            如需发布货源，请联系平台管理员。
          </p>
          
          {/* Admin button removed. Access via URL parameter ?admin=true */}
        </div>
      </main>

      {/* WeChat QR Code Modal */}
      {showWeChatModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowWeChatModal(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100 flex flex-col items-center animate-[fadeIn_0.2s_ease-out]">
            <button 
              onClick={() => setShowWeChatModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            
            <h3 className="text-lg font-bold text-gray-800 mb-1">扫码添加微信</h3>
            <p className="text-sm text-gray-500 mb-6">长按识别二维码或保存图片</p>
            
            <div className="bg-white p-2 border border-gray-100 rounded-xl shadow-inner mb-4 flex items-center justify-center min-h-[256px] min-w-[256px]">
              {!qrError ? (
                <img 
                  src={WECHAT_QR_IMAGE} 
                  alt="WeChat QR Code" 
                  className="w-64 h-64 object-contain rounded-lg"
                  onError={() => setQrError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-50 rounded-lg text-gray-400 text-xs text-center">
                  <span className="text-2xl mb-2">🖼️</span>
                  <p>二维码加载失败</p>
                  <p className="mt-1">请直接添加电话</p>
                </div>
              )}
            </div>

            <button
               onClick={() => setShowWeChatModal(false)}
               className="mt-2 w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;