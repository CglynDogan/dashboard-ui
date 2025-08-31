import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  StarIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronRightIcon,
  BanknotesIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '../../lib/format';

interface ProductPerformanceData {
  product: string;
  revenue: number;
  units: number;
  avgPrice: number;
  margin: number;
  growth: number;
}

interface ModernProductPerformanceProps {
  data: ProductPerformanceData[];
  className?: string;
}

function ModernProductPerformance({ data, className = '' }: ModernProductPerformanceProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'chart'>('cards');
  const [sortBy, setSortBy] = useState<'revenue' | 'units' | 'growth' | 'margin'>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Calculate metrics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0);
  const avgMargin = data.reduce((sum, item) => sum + item.margin, 0) / data.length;
  const bestPerformer = data.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  );
  const fastestGrowing = data.reduce((best, current) => 
    current.growth > best.growth ? current : best
  );

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    return (a[sortBy] - b[sortBy]) * multiplier;
  });

  const getPerformanceStatus = (growth: number) => {
    if (growth >= 15) return { status: 'excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
    if (growth >= 8) return { status: 'good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (growth >= 2) return { status: 'average', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
    if (growth >= 0) return { status: 'below-average', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    return { status: 'poor', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const getMarginStatus = (margin: number) => {
    if (margin >= 80) return 'A+';
    if (margin >= 75) return 'A';
    if (margin >= 70) return 'B+';
    if (margin >= 60) return 'B';
    if (margin >= 50) return 'C+';
    if (margin >= 40) return 'C';
    if (margin >= 30) return 'D+';
    if (margin >= 20) return 'D';
    if (margin >= 10) return 'F+';
    return 'F';
  };

  const productColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {t('analytics.productPerformance')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('analytics.productPerformanceSubtitle')}
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Squares2X2Icon className="w-4 h-4" />
            {t('customerAcquisition.cards')}
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'table'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ListBulletIcon className="w-4 h-4" />
            {t('analytics.table')}
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'chart'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ChartBarIcon className="w-4 h-4" />
            {t('customerAcquisition.chart')}
          </button>
        </div>
      </div>

      {/* Key Metrics Overview - Customer Acquisition Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
            selectedCard === 'revenue' ? 'ring-2 ring-blue-500 shadow-xl' : ''
          }`}
          onClick={() => setSelectedCard(selectedCard === 'revenue' ? null : 'revenue')}
        >
          <div 
            className="p-4 text-white rounded-t-2xl"
            style={{ backgroundColor: '#8b5cf6' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BanknotesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t('analytics.metrics.totalRevenue')}</h4>
                  <p className="text-white/80 text-sm">
                    %{((totalRevenue / (totalRevenue + 50000)) * 100).toFixed(1)} {t('analytics.target')}
                  </p>
                </div>
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 text-white/80 transform transition-transform ${
                  selectedCard === 'revenue' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('analytics.metrics.totalRevenue')}
              </div>
            </div>
            {selectedCard === 'revenue' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Günlük Ortalama:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(totalRevenue / 30)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Büyüme:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +12.5%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
            selectedCard === 'sales' ? 'ring-2 ring-blue-500 shadow-xl' : ''
          }`}
          onClick={() => setSelectedCard(selectedCard === 'sales' ? null : 'sales')}
        >
          <div 
            className="p-4 text-white rounded-t-2xl"
            style={{ backgroundColor: '#3b82f6' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ShoppingCartIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t('analytics.totalSales')}</h4>
                  <p className="text-white/80 text-sm">
                    {totalUnits} {t('analytics.units')}
                  </p>
                </div>
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 text-white/80 transform transition-transform ${
                  selectedCard === 'sales' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {totalUnits.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('analytics.productUnitSales')}
              </div>
            </div>
            {selectedCard === 'sales' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Günlük Ortalama:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round(totalUnits / 30)} {t('analytics.units')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Büyüme:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +8.3%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
            selectedCard === 'best' ? 'ring-2 ring-blue-500 shadow-xl' : ''
          }`}
          onClick={() => setSelectedCard(selectedCard === 'best' ? null : 'best')}
        >
          <div 
            className="p-4 text-white rounded-t-2xl"
            style={{ backgroundColor: '#10b981' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrophyIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t('analytics.bestProduct', 'Best Product')}</h4>
                  <p className="text-white/80 text-sm">
                    {t(`products.${bestPerformer.product}`, bestPerformer.product)}
                  </p>
                </div>
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 text-white/80 transform transition-transform ${
                  selectedCard === 'best' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {formatCurrency(bestPerformer.revenue)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('analytics.metrics.revenue')}
              </div>
            </div>
            {selectedCard === 'best' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('analytics.productUnitSales')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {bestPerformer.units.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('analytics.productMarketShare')}:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    %{((bestPerformer.revenue / totalRevenue) * 100).toFixed(1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
            selectedCard === 'fastest' ? 'ring-2 ring-blue-500 shadow-xl' : ''
          }`}
          onClick={() => setSelectedCard(selectedCard === 'fastest' ? null : 'fastest')}
        >
          <div 
            className="p-4 text-white rounded-t-2xl"
            style={{ backgroundColor: '#f59e0b' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{t('analytics.fastestGrowing', 'Fastest Growing')}</h4>
                  <p className="text-white/80 text-sm">
                    {t(`products.${fastestGrowing.product}`, fastestGrowing.product)}
                  </p>
                </div>
              </div>
              <ChevronRightIcon 
                className={`w-5 h-5 text-white/80 transform transition-transform ${
                  selectedCard === 'fastest' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                +%{fastestGrowing.growth}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('analytics.productPerformanceGrowthRate')}
              </div>
            </div>
            {selectedCard === 'fastest' && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('analytics.metrics.revenue')}:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(fastestGrowing.revenue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Trend:</span>
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    Yükselişte
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards View - Customer Acquisition Style Design */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedData.map((product, index) => {
            const color = productColors[index % productColors.length];
            const isSelected = selectedCard === product.product;
            
            return (
              <div
                key={product.product}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
                onClick={() => setSelectedCard(isSelected ? null : product.product)}
              >
                {/* Header */}
                <div 
                  className="p-4 text-white rounded-t-2xl"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <StarIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{t(`products.${product.product}`, product.product)}</h4>
                        <p className="text-white/80 text-sm">
                          {((product.revenue / totalRevenue) * 100).toFixed(1)}% pay
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon 
                      className={`w-5 h-5 text-white/80 transform transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {product.units.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('analytics.productUnitSales')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {formatCurrency(product.revenue)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('analytics.metrics.totalRevenue')}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('analytics.productMarketShare')}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        %{((product.revenue / totalRevenue) * 100).toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: color,
                          width: `${(product.revenue / totalRevenue) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Ortalama Fiyat:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(product.avgPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Kar Marjı:</span>
                        <span className={`font-medium ${
                          product.margin >= 60 ? 'text-green-600 dark:text-green-400' :
                          product.margin >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          %{product.margin} ({getMarginStatus(product.margin)})
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Büyüme Durumu:</span>
                        <span className={`font-medium ${
                          product.growth > 0 ? 'text-green-600 dark:text-green-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Önerilen Aksiyon:</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400 text-xs">
                          {product.growth > 10 ? 'Üretimi artır' :
                           product.growth > 0 ? 'Pazarlama artır' :
                           'Strateji gözden geçir'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ürün
                  </th>
                  {(['revenue', 'units', 'margin', 'growth'] as const).map(key => (
                    <th 
                      key={key}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => {
                        if (sortBy === key) {
                          setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                        } else {
                          setSortBy(key);
                          setSortOrder('desc');
                        }
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {key === 'revenue' ? t('analytics.metrics.revenue') :
                         key === 'units' ? t('analytics.productSales', 'Sales') :
                         key === 'margin' ? t('analytics.productMargin', 'Margin') : t('analytics.productGrowth', 'Growth')}
                        {sortBy === key && (
                          sortOrder === 'desc' ? 
                            <ArrowTrendingDownIcon className="w-3 h-3" /> : 
                            <ArrowTrendingUpIcon className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedData.map((product, index) => {
                  const color = productColors[index % productColors.length];
                  const performance = getPerformanceStatus(product.growth);
                  
                  return (
                    <tr key={product.product} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.product}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {formatCurrency(product.avgPrice)} ortalama fiyat
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {formatCurrency(product.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.units.toLocaleString()} {t('analytics.units')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.margin >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          product.margin >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          product.margin >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          product.margin >= 20 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {getMarginStatus(product.margin)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${performance.bg} ${performance.color}`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart View */}
      {viewMode === 'chart' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-6">
            {sortedData.map((product, index) => {
              const color = productColors[index % productColors.length];
              const maxRevenue = Math.max(...data.map(p => p.revenue));
              const widthPercentage = (product.revenue / maxRevenue) * 100;
              
              return (
                <div key={product.product} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.product}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(product.revenue)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {product.units} {t('analytics.units')}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div 
                      className="h-4 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ 
                        backgroundColor: color,
                        width: `${widthPercentage}%`
                      }}
                    >
                      {widthPercentage > 30 && (
                        <span className="text-white text-xs font-medium">
                          %{((product.revenue / totalRevenue) * 100).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Marj: %{product.margin}</span>
                    <span className={product.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      Büyüme: {product.growth > 0 ? '+' : ''}{product.growth}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ModernProductPerformance);