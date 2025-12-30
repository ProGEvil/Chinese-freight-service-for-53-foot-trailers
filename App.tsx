
import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LoadCard } from './components/LoadCard';
import { AdminDashboard } from './components/AdminDashBoard';
import { TOMORROW_DATE, WECHAT_QR_IMAGE } from './constants';
import { Load } from './types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const App: React.FC = () => {
  // --- State Management ---
  
  // Helper to check for admin parameter (supports 'true', 'ture' typo, '1', etc.)
  const checkAdminParam = () => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const val = params.get('admin');
    // Accept explicit 'true', the typo 'ture', '1', 'yes', or empty string (just ?admin)
    return val === 'true' || val === 'ture' || val === '1' || val === 'yes' || val === '';
  };

  const [view, setView] = useState<'home' | 'admin'>(() => {
    return checkAdminParam() ? 'admin' : 'home';
  });

  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('All'); // Date filter state
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  const [qrError, setQrError] = useState(false);

  // --- Force URL Check on Mount ---
  useEffect(() => {
    if (checkAdminParam() && view !== 'admin') {
      setView('admin');
    }
  }, [view]);

  // --- Data Fetching ---
  const fetchLoads = async () => {
    setLoading(true);

    if (!isSupabaseConfigured) {
      console.log('Demo Mode: DB not configured.');
      setLoads([]); // No fake data, just empty
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('loads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform DB snake_case to frontend camelCase
        const formattedLoads: Load[] = data.map((item: any) => ({
          id: item.id,
          created_at: item.created_at,
          type: item.type,
          originCity: item.origin_city,
          destinationState: item.destination_state,
          warehouseCode: item.warehouse_code,
          stops: item.stops, 
          price: item.price,
          mustAppt: item.must_appt,
          notes: item.notes,
          contactPhone: item.contact_phone,
          contactName: item.contact_name,
          status: item.status,
        }));
        setLoads(formattedLoads);
      } else {
        setLoads([]); 
      }
    } catch (error) {
      console.warn('Error fetching loads:', error);
      setLoads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  // --- Date Helper ---
  // Extract MM/DD from "MM/DD/YYYY HH:MM CST"
  const extractDate = (timeStr?: string) => {
    if (!timeStr) return '';
    const parts = timeStr.split(' '); // ["01/02/2026", "22:00", "CST"]
    if (parts.length > 0) {
      // Get first part "01/02/2026", take first 5 chars "01/02"
      return parts[0].substring(0, 5);
    }
    return '';
  };

  // --- Derived State: Available Dates ---
  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    loads.forEach(load => {
      load.stops.forEach(stop => {
        const d = extractDate(stop.appointmentTime);
        if (d) dates.add(d);
      });
    });
    return Array.from(dates).sort();
  }, [loads]);

  // --- Actions ---
  const handleAddLoad = async (newLoad: Load) => {
    if (!isSupabaseConfigured) {
      alert('演示模式：数据库未连接，仅本地临时添加。\n(请在 .env 配置 Supabase 密钥)');
      setLoads([newLoad, ...loads]);
      return;
    }

    try {
      const dbPayload = {
        type: newLoad.type,
        origin_city: newLoad.originCity,
        destination_state: newLoad.destinationState,
        warehouse_code: newLoad.warehouseCode,
        stops: newLoad.stops,
        must_appt: newLoad.mustAppt,
        notes: newLoad.notes,
        contact_phone: newLoad.contactPhone,
        contact_name: newLoad.contactName,
        status: newLoad.status,
      };

      const { data, error } = await supabase
        .from('loads')
        .insert([dbPayload])
        .select();

      if (error) throw error;

      if (data) {
        fetchLoads();
        alert('货源发布成功！');
      }
    } catch (error) {
      console.error('Error adding load:', error);
      alert('发布失败: ' + (error as any).message || JSON.stringify(error));
    }
  };

  const handleDeleteLoad = async (id: string) => {
    if (!window.confirm('确定要删除这条货源吗？')) return;

    if (!isSupabaseConfigured) {
      alert('演示模式：本地临时删除。');
      setLoads(prev => prev.filter(l => l.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('loads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLoads(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting load:', error);
      alert('删除失败');
    }
  };

  const handleExitAdmin = () => {
    setView('home');
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
  };

  // --- Filtering ---
  const term = searchTerm.toLowerCase().trim();
  
  const filteredLoads = loads.filter(load => {
    // 1. Search Filter
    const matchesSearch = 
      load.originCity.toLowerCase().includes(term) ||
      load.destinationState.toLowerCase().includes(term) ||
      load.warehouseCode.toLowerCase().includes(term) ||
      (load.notes && load.notes.toLowerCase().includes(term));

    // 2. Date Filter
    let matchesDate = true;
    if (selectedDate !== 'All') {
      // Check if any stop in this load matches the selected date
      matchesDate = load.stops.some(stop => extractDate(stop.appointmentTime) === selectedDate);
    }

    return matchesSearch && matchesDate;
  });

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
        <div className="bg-white rounded-full shadow-sm p-2 mb-4 flex items-center border border-gray-200">
          <span className="pl-3 pr-2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="搜索城市、州名、仓库代码 (如 VA, LGB8)..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Filter Bar */}
        {availableDates.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar items-center">
            <button
              onClick={() => setSelectedDate('All')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                selectedDate === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              全部日期
            </button>
            {availableDates.map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm ${
                  selectedDate === date
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        )}

        {/* Header Summary */}
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
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              加载中...
            </div>
          ) : filteredLoads.length > 0 ? (
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
              {!isSupabaseConfigured && (
                 <p className="text-red-400 text-xs mt-2">
                   提示: 数据库未连接，请检查配置。
                 </p>
              )}
            </div>
          )}
        </div>

        {/* Informational Footer for Suppliers */}
        <div className="mt-8 text-center pb-8 space-y-2">
          <p className="text-xs text-gray-400">
            仅展示已审核的供应商货源。<br/>
            如需发布货源，请联系平台管理员。
          </p>
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
