export interface LoadStop {
  stopIndex: number;
  warehouseCode: string;
  loadingType: string; // e.g. '地板' | '卡板'
  appointmentTime?: string; // Optional specific time for this stop
}

export interface Load {
  id: string;
  type: 'Amazon FBA' | '海外仓/自家仓';
  originCity: string;
  destinationState: string; // New field for State/Region info
  warehouseCode: string; // Kept as summary for search functionality
  stops: LoadStop[];     // New detailed structure
  price?: number;
  mustAppt: boolean;
  notes?: string;        // General notes if needed, though 'stops' covers most now
  contactPhone: string;
  contactName: string;
  status: 'active' | 'booked';
}