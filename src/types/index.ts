export type Sale = {
  id: string;
  date: string;
  region: 'EMEA' | 'AMER' | 'APAC';
  product: string;
  channel: 'Web' | 'Mobile' | 'Retail';
  revenue: number;
  units: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  country: string;
  ltv: number;
  lastActive: string;
  segment: 'VIP' | 'Loyal' | 'New' | 'ChurnRisk';
};

export type Activity = {
  id: string;
  title: string;
  type: 'customer' | 'sale' | 'support' | 'system' | 'upgrade';
  createdAt: string;
};

export type Theme = 'light' | 'dark';

export type FilterState = {
  dateRange: { start: string; end: string } | null;
  region: string[];
  channel: string[];
  segment: string[];
  search: string;
};

export type SupportTicket = {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  status: 'Açık' | 'İşlemde' | 'Beklemede' | 'İnceleme' | 'Çözüldü' | 'Kapatıldı';
  category: 'Hesap' | 'Faturalama' | 'Teknik' | 'Ödeme' | 'Mobil' | 'Raporlama' | 'Bildirim' | 'Özellik Talebi';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  tags: string[];
};

export type ReturnRequest = {
  id: string;
  originalSaleId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  region: 'EMEA' | 'AMER' | 'APAC';
  channel: 'Web' | 'Mobil' | 'Mağaza';
  originalAmount: number;
  refundAmount: number;
  units: number;
  reason: string;
  reasonCategory: 'Kalite' | 'Sipariş Hatası' | 'Teknik' | 'Politika' | 'Hasar' | 'Değişim' | 'Memnuniyetsizlik';
  status: 'Onay Bekliyor' | 'İnceleme' | 'İşlemde' | 'Tamamlandı' | 'Reddedildi' | 'İptal Edildi';
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  requestedAt: string;
  processedAt: string | null;
  completedAt: string | null;
  assignedTo: string;
  notes: string;
  refundMethod: 'Kredi Kartı' | 'Banka Havalesi' | 'Nakit' | 'Mağaza Kredisi' | null;
  isProcessed: boolean;
};