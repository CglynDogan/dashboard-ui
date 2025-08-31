import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerAcquisitionChart from '../components/charts/CustomerAcquisitionChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../lib/format';
import analyticsData from '../data/analytics.json';
import { 
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  CubeIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
  type CustomerAcquisition, 
  type RevenueByHour,
  type ProductPerformance,
  type GeographicData 
} from '../types';

export default function Analytics() {
  const { t } = useTranslation();
  
  const [acquisitionData] = useState<CustomerAcquisition[]>(analyticsData.customerAcquisition);
  const [hourlyData] = useState<RevenueByHour[]>(analyticsData.revenueByHour);
  const [productData] = useState<ProductPerformance[]>(analyticsData.productPerformance);
  const [geoData] = useState<GeographicData[]>(analyticsData.geographicData as GeographicData[]);

  // Calculate summary metrics
  const totalRevenue = geoData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCustomers = geoData.reduce((sum, item) => sum + item.customers, 0);
  const avgRevenuePerHour = hourlyData.reduce((sum, item) => sum + item.revenue, 0) / hourlyData.length;
  const topPerformingProduct = productData.reduce((prev, current) => 
    (prev.revenue > current.revenue) ? prev : current
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 -m-6 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {t('analytics.title')}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg ml-11">{t('analytics.subtitle')}</p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('analytics.metrics.totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('analytics.metrics.totalCustomers')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCustomers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpIcon className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600 dark:text-blue-400">+8.2%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('analytics.metrics.avgHourlyRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(avgRevenuePerHour)}</p>
              <div className="flex items-center mt-2">
                <ClockIcon className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600 dark:text-purple-400">{t('analytics.metrics.last24Hours')}</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t('analytics.metrics.topProduct')}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{t(`products.${topPerformingProduct.product}`)}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-orange-600 dark:text-orange-400">{formatCurrency(topPerformingProduct.revenue)}</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <CubeIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Customer Acquisition */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('analytics.customerAcquisition')}
              </h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('analytics.metrics.last30Days')}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
            <CustomerAcquisitionChart data={acquisitionData} />
          </div>
        </div>

        {/* Hourly Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <ClockIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('analytics.revenueByHour')}
              </h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('analytics.metrics.today')}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    interval="preserveStartEnd"
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      color: '#374151'
                    }}
                    labelFormatter={(value) => `${t('analytics.metrics.hour')}: ${value}`}
                    formatter={(value) => [formatCurrency(Number(value)), t('analytics.metrics.revenue')]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Product Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <CubeIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('analytics.productPerformance')}
            </h3>
          </div>
          <div className="space-y-4">
            {productData.map((product, index) => (
              <div key={product.product} className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-orange-100 dark:border-orange-800 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-amber-500' : 'bg-yellow-500'}`}></div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {t(`products.${product.product}`)}
                    </h4>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                    product.growth > 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {product.growth > 0 ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                    <span>{product.growth > 0 ? '+' : ''}{product.growth}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('analytics.metrics.revenue')}</div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('analytics.metrics.units')}</div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {product.units.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('analytics.metrics.avgPrice')}</div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      {formatCurrency(product.avgPrice)}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('analytics.metrics.margin')}</div>
                    <div className="font-bold text-gray-900 dark:text-white text-lg">
                      %{product.margin}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <GlobeAltIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('analytics.geographicAnalysis')}
            </h3>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 mb-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <YAxis 
                    dataKey="country" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#d1d5db' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      color: '#374151'
                    }}
                    formatter={(value) => [formatCurrency(Number(value)), t('analytics.metrics.revenue')]}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#8b5cf6" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Geographic Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {geoData.length}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{t('analytics.metrics.country')}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">
                {formatCurrency(geoData.reduce((sum, item) => sum + item.revenue, 0))}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">{t('analytics.metrics.totalRevenue')}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {geoData.reduce((sum, item) => sum + item.customers, 0).toLocaleString()}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">{t('analytics.metrics.totalCustomers')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}