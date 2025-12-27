import React from 'react';
import { Load } from '../types';

interface LoadCardProps {
  load: Load;
  onWeChatClick: () => void;
}

export const LoadCard: React.FC<LoadCardProps> = ({ load, onWeChatClick }) => {
  // Check if any stop has an appointment time
  const hasAppointments = load.stops.some(stop => stop.appointmentTime);

  // --- Calculate Cargo Type Logic ---
  // 1. Calculate drops text (一卸, 两卸, etc.)
  const stopCount = load.stops.length;
  const stopCountText = stopCount === 1 ? '一' : stopCount === 2 ? '两' : stopCount.toString();
  
  // 2. Calculate loading type logic (Any floor -> Floor, else Pallet)
  // Check if ANY stop contains '地板'
  const isFloor = load.stops.some(stop => stop.loadingType.includes('地板'));
  const typeText = isFloor ? '地板' : '卡板';
  
  // 3. Combine
  const cargoTypeSummary = `一提${stopCountText}卸 ${typeText}`;
  // ----------------------------------

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3 relative overflow-hidden">
      {/* Top Badge & ID */}
      <div className="flex justify-between items-start mb-3">
         <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
            load.type === 'Amazon FBA' ? 'bg-orange-500' : 'bg-indigo-500'
          }`}>
            {load.type}
         </span>
         <span className="text-[10px] text-gray-400 font-mono">
            {load.contactName}
         </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Origin */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">提货:</span>
          <span className="font-bold text-gray-800 text-sm md:text-base">{load.originCity}</span>
        </div>

        {/* Destination State */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">送仓位置:</span>
          <span className="font-bold text-gray-800 text-sm md:text-base">{load.destinationState}</span>
        </div>

        {/* Cargo Type Summary (Highlighted) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">货物类型:</span>
          <span className="font-bold text-orange-600 text-sm md:text-base bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
            {cargoTypeSummary}
          </span>
        </div>

        {/* Destinations Loop with Address Navigation */}
        {load.stops.map((stop, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0 mt-0.5">
              {load.stops.length > 1 ? `第${index + 1}卸送仓:` : '送仓:'}
            </span>
            
            <div className="flex flex-col items-start gap-1">
              {/* Warehouse Code */}
              <span className="font-bold text-blue-600 text-sm md:text-base leading-tight">
                {stop.warehouseCode}
              </span>
              
              {/* Google Maps Button */}
              {stop.address && (
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded px-2 py-1 text-[10px] text-gray-600 hover:text-blue-600 transition-colors mt-0.5"
                >
                  <span className="text-red-500">📍</span>
                  <span className="truncate max-w-[200px]">{stop.address}</span>
                  <span className="font-bold ml-0.5">导航</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Time Section (Conditional) */}
      {hasAppointments && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mt-3 text-sm text-red-800">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-red-600 mb-1">预约时间 (当地时间):</span>
            {load.stops.map((stop, i) => (
              stop.appointmentTime ? (
                <div key={i} className="flex flex-col sm:flex-row sm:gap-2 border-b border-red-100 last:border-0 pb-1 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[10px] bg-red-100 px-1.5 rounded text-red-600 whitespace-nowrap">
                        {load.stops.length > 1 ? `第${i+1}卸 ${stop.warehouseCode}` : stop.warehouseCode}
                    </span>
                    <span className="font-bold">{stop.appointmentTime}</span>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
        <a 
          href={`tel:${load.contactPhone}`}
          className="flex items-center justify-center gap-1 bg-blue-50 text-blue-600 active:bg-blue-100 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors border border-blue-100"
        >
          📞 电话联系
        </a>
        <button 
          onClick={onWeChatClick}
          className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm shadow-green-200"
        >
          💬 微信联系
        </button>
      </div>
    </div>
  );
};