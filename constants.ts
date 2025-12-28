import { Load } from './types';

// ==========================================
// 🔴 图片配置区 (解决图片无法加载的问题)
// ==========================================

// ⚠️ 请按照以下步骤操作：
// 1. 去网站 (如 https://www.base64-image.de/) 上传您的 kristina-qr.jpg
// 2. 复制生成的 "data:image..." 开头的长字符串
// 3. 替换下面引号中的内容
export const WECHAT_QR_IMAGE = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; 
// ↑ 上面目前是一个灰色的占位小点，请替换为您真实的二维码 Base64 字符串

// ==========================================
// 🔴 管理员操作区
// ==========================================

export const TOMORROW_DATE = "12月30日 - 01月05日";

export const MANUAL_LOADS: Load[] = [
  {
    id: 'load-new-00',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '德克萨斯 (Texas) TX',
    warehouseCode: 'IAH3',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'IAH3', 
        loadingType: '地板', 
        appointmentTime: '12/30/2025 23:00 CST',
        address: '15525 Milner Rd, Houston, TX 77032'
      }
    ],
    notes: 'Ref: 185580019973',
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-01',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '弗吉尼亚 (Virginia) VA',
    warehouseCode: 'XRI3',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'XRI3', 
        loadingType: '卡板', 
        appointmentTime: '01/01/2026 21:00 EST',
        address: '4949 Commerce Rd, Richmond, VA 23234'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-02',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '德克萨斯 (Texas) TX',
    warehouseCode: 'IAH3',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'IAH3', 
        loadingType: '地板', 
        appointmentTime: '01/04/2026 07:00 CST',
        address: '15525 Milner Rd, Houston, TX 77032'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-03',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '印第安纳 (Indiana) IN',
    warehouseCode: 'FWA4',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'FWA4', 
        loadingType: '地板', 
        appointmentTime: '01/02/2026 03:00 EST',
        address: '9798 Smith Rd, Fort Wayne, IN 46809'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-04',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '华盛顿 (Washington) WA',
    warehouseCode: 'PSC2',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'PSC2', 
        loadingType: '地板', 
        appointmentTime: '01/04/2026 20:00 PST',
        address: '1351 S Rd 40 E, Pasco, WA 99301'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-05',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '伊利诺伊 (Illinois) IL',
    warehouseCode: 'ORD2 + RFD2',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'ORD2', 
        loadingType: '卡板', 
        appointmentTime: '01/05/2026 18:00 CST',
        address: '23714 Amoco Rd, Channahon, IL 60410'
      },
      { 
        stopIndex: 2, 
        warehouseCode: 'RFD2', 
        loadingType: '地板', 
        appointmentTime: '01/05/2026 22:00 CST',
        address: '11500 Freeman Rd, Huntley, IL 60142'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  },
  {
    id: 'load-new-06',
    type: 'Amazon FBA',
    originCity: 'City of Industry, CA',
    destinationState: '密西西比/田纳西 (MS/TN)',
    warehouseCode: 'MEM6 + MEM1',
    mustAppt: true,
    stops: [
      { 
        stopIndex: 1, 
        warehouseCode: 'MEM6', 
        loadingType: '地板', 
        appointmentTime: '01/04/2026 15:00 CST',
        address: '11505 Progress Wy, Olive Branch, MS 38654'
      },
      { 
        stopIndex: 2, 
        warehouseCode: 'MEM1', 
        loadingType: '地板', 
        appointmentTime: '01/04/2026 20:00 CST',
        address: '3292 E Holmes Rd, Memphis, TN 38118'
      }
    ],
    contactName: 'Evolure 20445-Kristina',
    contactPhone: '626-886-2025',
    status: 'active'
  }
];