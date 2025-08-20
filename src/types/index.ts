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

export type ConversionFunnelStage = {
  stage: string;
  value: number;
  percentage: number;
  color: string;
};

export type RevenueByHour = {
  hour: string;
  revenue: number;
};

export type CustomerAcquisition = {
  source: string;
  customers: number;
  cost: number;
  cac: number;
  percentage: number;
};

export type ProductPerformance = {
  product: string;
  revenue: number;
  units: number;
  avgPrice: number;
  margin: number;
  growth: number;
};

export type GeographicData = {
  country: string;
  revenue: number;
  customers: number;
  avgOrderValue: number;
  coordinates: [number, number];
};

export type InventoryProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  unitCost: number;
  unitPrice: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  expiryDate: string | null;
  status: 'Stokta' | 'Düşük Stok' | 'Kritik Düşük' | 'Stok Yok' | 'Fazla Stok';
  reserved: number;
  available: number;
  onOrder: number;
  leadTime: number;
  turnoverRate: number;
  tags: string[];
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  onTimeDelivery: number;
  qualityScore: number;
  totalOrders: number;
  activeProducts: number;
};

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentUtilization: number;
  manager: string;
  sections: string[];
  temperature: string;
  security: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  type: 'Giriş' | 'Çıkış';
  quantity: number;
  reason: string;
  date: string;
  reference: string;
  user: string;
  notes: string;
};