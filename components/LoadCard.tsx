import React from 'react';
import { Load } from '../types';

interface LoadCardProps {
  load: Load;
}

export const LoadCard: React.FC<LoadCardProps> = ({ load }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-3 relative overflow-hidden">
      {/* Top Banner for Type */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-8">提货:</span>
            <span className="font-bold text-gray-800 text-sm md:text-base">{load.originCity}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 w-8">送仓:</span>
            <span className="font-bold text-blue-600 underline cursor-pointer text-sm md:text-base">
              {load.warehouseCode}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-0.5 rounded-bl-lg rounded-tr-lg text-[10px] font-bold text-white ${
            load.type === 'Amazon FBA' ? 'bg-orange-500' : 'bg-indigo-500'
          }`}>
            {load.type}
          </span>
          <div className="text-right">
            <span className="text-xs text-gray-400 mr-1">一口价</span>
            <span className="text-xl font-extrabold text-green-600">${load.price}</span>
          </div>
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="border-t border-dashed border-gray-200 py-3 space-y-2">
        <div className="flex items-center text-xs md:text-sm">
          <span className="mr-2">🕒</span>
          <span className="text-gray-500 w-14">送仓时间</span>
          <span className="font-medium text-gray-800">{load.appointmentTime}</span>
          {load.mustAppt && (
            <span className="ml-auto px-2 py-0.5 bg-red-50 text-red-600 text-[10px] rounded-full border border-red-100">
              必须预约
            </span>
          )}
        </div>
        <div className="flex items-center text-xs md:text-sm">
          <span className="mr-2">🔢</span>
          <span className="text-gray-500 w-14">预约号</span>
          <span className="font-medium text-gray-800">{load.appointmentRef || "—"}</span>
        </div>
      </div>

      {/* Notes Section */}
      {load.notes && (
        <div className="bg-gray-50 rounded-lg p-2 mb-3 text-xs text-gray-600">
          <span className="font-bold text-gray-500">备注: </span>
          {load.notes}
        </div>
      )}

      {/* Footer Action */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-400">
          发布者: {load.contactName}
        </div>
        <a 
          href={`tel:${load.contactPhone}`}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-md shadow-green-200"
        >
          📞 立即联系供应商
        </a>
      </div>
    </div>
  );
};