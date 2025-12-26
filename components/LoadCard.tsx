import React from 'react';
import { Load } from '../types';

interface LoadCardProps {
  load: Load;
}

export const LoadCard: React.FC<LoadCardProps> = ({ load }) => {
  // Check if any stop has an appointment time
  const hasAppointments = load.stops.some(stop => stop.appointmentTime);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3 relative overflow-hidden">
      {/* Top Badge */}
      <div className="flex justify-between items-start mb-3">
         <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${
            load.type === 'Amazon FBA' ? 'bg-orange-500' : 'bg-indigo-500'
          }`}>
            {load.type}
         </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Origin */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">提货:</span>
          <span className="font-bold text-gray-800 text-sm md:text-base">{load.originCity}</span>
        </div>

        {/* Destination State (New) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">送仓位置:</span>
          <span className="font-bold text-gray-800 text-sm md:text-base">{load.destinationState}</span>
        </div>

        {/* Destinations Loop */}
        {load.stops.map((stop, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-16 md:w-20 shrink-0">
              {load.stops.length > 1 ? `第${index + 1}卸送仓:` : '送仓:'}
            </span>
            <span className="font-bold text-blue-600 text-sm md:text-base">
              {stop.warehouseCode}
            </span>
          </div>
        ))}
      </div>

      {/* Cargo Info Section (Replacing "Loading Requirements") */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-3 text-sm text-blue-800">
        <div className="flex flex-wrap gap-y-1">
          <span className="font-bold text-blue-600 mr-2 shrink-0">货物信息:</span>
          <span className="break-all">
            {load.stops.map((stop, i) => (
              <span key={i}>
                {i > 0 && <span className="mx-1 text-blue-300">|</span>}
                {stop.warehouseCode} ({stop.loadingType})
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Appointment Time Section (Conditional) */}
      {hasAppointments && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 mt-2 text-sm text-red-800">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-red-600 mb-1">预约时间:</span>
            {load.stops.map((stop, i) => (
              stop.appointmentTime ? (
                <div key={i} className="flex gap-2">
                  <span className="font-medium text-xs bg-red-100 px-1.5 rounded text-red-600 h-fit self-center">
                    {load.stops.length > 1 ? `第${i+1}卸` : '送仓'}
                  </span>
                  <span className="font-bold">{stop.warehouseCode}</span>
                  <span>{stop.appointmentTime}</span>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Footer Action */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          发布者: {load.contactName}
        </div>
        <a 
          href={`tel:${load.contactPhone}`}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-md shadow-green-200"
        >
          📞 立即联系
        </a>
      </div>
    </div>
  );
};