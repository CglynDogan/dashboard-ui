export interface ReturnItem {
  id: string;
  originalSaleId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  region: string;
  channel: string;
  originalAmount: number;
  refundAmount: number;
  units: number;
  reason: string;
  reasonCategory: string;
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi' | 'Tamamlandı';
  priority: 'Düşük' | 'Orta' | 'Yüksek';
  requestedAt: string;
  processedAt?: string;
  completedAt?: string;
  notes?: string;
  isProcessed: boolean;
}