import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoadCard } from './components/LoadCard';
import { MANUAL_LOADS, TOMORROW_DATE } from './constants';
import { Load } from './types';

const App: React.FC = () => {
  // Use state to hold loads, initialized from the manual constants file
  const [loads] = useState<Load[]>(MANUAL_LOADS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic: Case-insensitive substring match (Fuzzy search)
  // Trimming the search term ensures "LGB " matches "LGB8"
  const term = searchTerm.toLowerCase().trim();
  
  const filteredLoads = loads.filter(load => 
    load.originCity.toLowerCase().includes(term) ||
    load.destinationState.toLowerCase().includes(term) ||
    load.warehouseCode.toLowerCase().includes(term) ||
    load.notes?.toLowerCase().includes(term)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
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
              <LoadCard key={load.id} load={load} />
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
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            仅展示已审核的供应商货源。<br/>
            如需发布货源，请联系平台管理员。
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;