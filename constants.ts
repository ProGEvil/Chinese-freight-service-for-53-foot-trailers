import { Load } from './types';

// ==========================================
// 🔴 管理员操作区：在这里手动修改货源数据
// 修改完成后保存，页面会自动更新
// ==========================================

export const TOMORROW_DATE = "12月5日 (明天)";

export const MANUAL_LOADS: Load[] = [
  {
    id: 'load-101',
    type: 'Amazon FBA',
    originCity: 'Ontario, CA',
    warehouseCode: 'LGB8',
    price: 850,
    appointmentTime: '12/5 14:00',
    appointmentRef: 'ISA-99821',
    mustAppt: true,
    notes: '53ft Dry Van, 26 Pallets, 货物较轻',
    contactName: '调度中心',
    contactPhone: '626-555-0101',
    status: 'active'
  },
  {
    id: 'load-102',
    type: 'Amazon FBA',
    originCity: 'Fontana, CA',
    warehouseCode: 'LAX9',
    price: 450,
    appointmentTime: '12/5 09:30',
    appointmentRef: '',
    mustAppt: true,
    notes: '需要带托盘交换，现场排队较久',
    contactName: '调度王',
    contactPhone: '909-555-0202',
    status: 'active'
  },
  {
    id: 'load-103',
    type: '海外仓/自家仓',
    originCity: 'City of Industry, CA',
    warehouseCode: 'Chino Warehouse',
    price: 350,
    appointmentTime: '12/5 11:00',
    mustAppt: false,
    notes: '私人仓，随到随卸，不需要预约号',
    contactName: '仓库操作',
    contactPhone: '626-555-0303',
    status: 'active'
  },
  {
    id: 'load-104',
    type: 'Amazon FBA',
    originCity: 'Redlands, CA',
    warehouseCode: 'ONT8',
    price: 600,
    appointmentTime: '12/5 20:00',
    appointmentRef: 'REF-7721',
    mustAppt: true,
    notes: '急单！急单！价格可谈',
    contactName: '调度中心',
    contactPhone: '626-555-0101',
    status: 'active'
  }
];