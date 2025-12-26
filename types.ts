export interface Load {
  id: string;
  type: 'Amazon FBA' | '海外仓/自家仓';
  originCity: string;
  warehouseCode: string;
  price: number;
  appointmentTime: string;
  appointmentRef?: string;
  mustAppt: boolean;
  notes?: string;
  contactPhone: string;
  contactName: string;
  status: 'active' | 'booked';
}