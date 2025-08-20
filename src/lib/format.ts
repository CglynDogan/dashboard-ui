import { format } from 'date-fns';

// Para formatı
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sayı kısaltma (1.2k, 1.5M vb.)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Tarih formatı
export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

// Relatif tarih (2 gün önce vb.)
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Bugün';
  if (diffInDays === 1) return 'Dün';
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
  return formatDate(dateString);
};

// Yüzde formatı
export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};