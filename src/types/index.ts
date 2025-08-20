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