import { Load } from './types';

// ==========================================
// 🔴 管理员操作区
// ==========================================

export const TOMORROW_DATE = "12月26日";

export const MANUAL_LOADS: Load[] = [
  {
    id: 'load-201',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '弗吉尼亚 (Virginia) VA',
    warehouseCode: 'XRI3',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'XRI3', loadingType: '地板', appointmentTime: '1号晚上' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-202',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '印第安纳/密歇根 (IN/MI)',
    warehouseCode: 'FWA4 + LAN2',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'FWA4', loadingType: '地板' },
      { stopIndex: 2, warehouseCode: 'LAN2', loadingType: '地板' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-203',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '印第安纳 (Indiana) IN',
    warehouseCode: 'MQJ1 + IND9',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'MQJ1', loadingType: '地板' },
      { stopIndex: 2, warehouseCode: 'IND9', loadingType: '地板' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-204',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '德克萨斯 (Texas) TX',
    warehouseCode: 'IUSF + FTW1',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'IUSF', loadingType: '卡板' },
      { stopIndex: 2, warehouseCode: 'FTW1', loadingType: '地板' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-205',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '德克萨斯 (Texas) TX',
    warehouseCode: 'IAH3 + HOU7',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'IAH3', loadingType: '地板', appointmentTime: '01/04/2026 07:00 CST' },
      { stopIndex: 2, warehouseCode: 'HOU7', loadingType: '卡板', appointmentTime: '01/04/2025 23:00 CST' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-206',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '宾夕法尼亚/新泽西 (PA/NJ)',
    warehouseCode: 'AVP1 + ABE8 + TEB9',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'AVP1', loadingType: '卡板', appointmentTime: '01/05' },
      { stopIndex: 2, warehouseCode: 'ABE8', loadingType: '卡板', appointmentTime: '01/05' },
      { stopIndex: 3, warehouseCode: 'TEB9', loadingType: '卡板', appointmentTime: '01/05' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-207',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '田纳西 (Tennessee) TN',
    warehouseCode: 'MEM1',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'MEM1', loadingType: '地板', appointmentTime: '01/04/2026 20:00 CST' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-208',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '印第安纳/威斯康星/伊利诺伊 (IN/WI/IL)',
    warehouseCode: 'PPO4 + JVL1 + RFD2',
    mustAppt: false,
    stops: [
      { stopIndex: 1, warehouseCode: 'PPO4', loadingType: '卡板/地板' },
      { stopIndex: 2, warehouseCode: 'JVL1', loadingType: '卡板/地板' },
      { stopIndex: 3, warehouseCode: 'RFD2', loadingType: '地板' }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  }
];