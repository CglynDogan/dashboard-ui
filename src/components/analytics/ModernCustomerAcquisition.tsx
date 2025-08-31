import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  MegaphoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  EyeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { type CustomerAcquisition } from '../../types';
import { formatCurrency } from '../../lib/format';

interface ModernCustomerAcquisitionProps {
  data: CustomerAcquisition[];
  className?: string;
}

const sourceIcons: Record<string, any> = {
  'Organik Arama': MagnifyingGlassIcon,
  'Sosyal Medya': ShareIcon,
  'Google Ads': MegaphoneIcon,
  'Email Marketing': EnvelopeIcon,
  'Diğer': GlobeAltIcon
};

const sourceColors: Record<string, string> = {
  'Organik Arama': '#10b981',
  'Sosyal Medya': '#3b82f6', 
  'Google Ads': '#ef4444',
  'Email Marketing': '#8b5cf6',
  'Diğer': '#f59e0b'
};

function ModernCustomerAcquisition({ data, className = '' }: ModernCustomerAcquisitionProps) {
  const { t } = useTranslation();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');

  // Calculate metrics
  const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  const avgCAC = totalCost / totalCustomers;
  const bestPerformer = data.reduce((best, current) => 
    current.customers > best.customers ? current : best
  );
  const mostEfficient = data.filter(item => item.cac > 0)
    .reduce((best, current) => current.cac < best.cac ? current : best, data.find(item => item.cac > 0) || data[0]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {t('customerAcquisition.title')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('customerAcquisition.subtitle')}
          </p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ChartBarIcon className="w-4 h-4 inline mr-2" />
{t('customerAcquisition.cards')}
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'chart'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <EyeIcon className="w-4 h-4 inline mr-2" />
{t('customerAcquisition.chart')}
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('customerAcquisition.totalCustomers')}</span>
          </div>
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {totalCustomers.toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">{t('customerAcquisition.avgCAC')}</span>
          </div>
          <div className="text-2xl font-bold text-green-800 dark:text-green-200">
            {formatCurrency(avgCAC)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('customerAcquisition.bestSource')}</span>
          </div>
          <div className="text-lg font-bold text-purple-800 dark:text-purple-200 truncate">
            {t(`customerAcquisition.sources.${bestPerformer.source}`, bestPerformer.source)}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            {bestPerformer.customers} {t('customerAcquisition.customers')}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-2">
            <ArrowTrendingDownIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">{t('customerAcquisition.mostEfficient')}</span>
          </div>
          <div className="text-lg font-bold text-orange-800 dark:text-orange-200 truncate">
            {t(`customerAcquisition.sources.${mostEfficient.source}`, mostEfficient.source)}
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            {formatCurrency(mostEfficient.cac)} CAC
          </div>
        </div>
      </div>

      {/* Main Content - Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((source, index) => {
            const Icon = sourceIcons[source.source] || GlobeAltIcon;
            const color = sourceColors[source.source] || '#6b7280';
            const isSelected = selectedSource === source.source;

            return (
              <div
                key={source.source}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
                onClick={() => setSelectedSource(isSelected ? null : source.source)}
              >
                {/* Header */}
                <div 
                  className="p-4 text-white rounded-t-2xl"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{t(`customerAcquisition.sources.${source.source}`, source.source)}</h4>
                        <p className="text-white/80 text-sm">
                          {source.percentage.toFixed(1)}% {t('customerAcquisition.share')}
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
                        {source.customers.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('customerAcquisition.customerCount')}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {source.cac > 0 ? formatCurrency(source.cac) : t('customerAcquisition.free')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('customerAcquisition.acquisitionCost')}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('customerAcquisition.shareOfTotal')}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        %{source.percentage.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: color,
                          width: `${source.percentage}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{t('customerAcquisition.totalCost')}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {source.cost > 0 ? formatCurrency(source.cost) : t('customerAcquisition.free')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{t('customerAcquisition.efficiencyScore')}:</span>
                        <span className={`font-medium ${
                          source.cac === 0 ? 'text-green-600 dark:text-green-400' :
                          source.cac < avgCAC ? 'text-green-600 dark:text-green-400' :
                          source.cac < avgCAC * 1.5 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {source.cac === 0 ? t('customerAcquisition.excellent') :
                           source.cac < avgCAC ? t('customerAcquisition.good') :
                           source.cac < avgCAC * 1.5 ? t('customerAcquisition.average') : t('customerAcquisition.poor')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{t('customerAcquisition.recommendedAction')}:</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400 text-xs">
                          {source.cac === 0 ? t('customerAcquisition.increaseInvestment') :
                           source.cac < avgCAC ? t('customerAcquisition.increaseBudget') :
                           source.cac < avgCAC * 1.5 ? t('customerAcquisition.optimize') : t('customerAcquisition.reevaluate')}
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

      {/* Chart View */}
      {viewMode === 'chart' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Chart Representation */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {data.map((source, index) => {
                  const Icon = sourceIcons[source.source] || GlobeAltIcon;
                  const color = sourceColors[source.source] || '#6b7280';
                  
                  return (
                    <div key={source.source} className="relative">
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${color}22` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              {t(`customerAcquisition.sources.${source.source}`, source.source)}
                            </h5>
                            <div className="text-right">
                              <div className="font-bold text-gray-900 dark:text-white">
                                {source.customers.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {t('customerAcquisition.customers')}
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full transition-all duration-700"
                              style={{ 
                                backgroundColor: color,
                                width: `${source.percentage}%`
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              %{source.percentage.toFixed(1)}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {source.cac > 0 ? formatCurrency(source.cac) : t('customerAcquisition.free')} CAC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 dark:text-white">
                {t('customerAcquisition.summaryStats')}
              </h5>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {totalCustomers.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {t('customerAcquisition.totalAcquired')}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {formatCurrency(totalCost)}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {t('customerAcquisition.totalSpent')}
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {formatCurrency(avgCAC)}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    {t('customerAcquisition.avgCAC')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ModernCustomerAcquisition);