import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

import MetricCard from '../components/analytics/MetricCard';
import MobileMetricCard from '../components/analytics/MobileMetricCard';
import InteractiveChart from '../components/analytics/InteractiveChart';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import DataInsights from '../components/analytics/DataInsights';
import DrillDownModal from '../components/analytics/DrillDownModal';
import ModernCustomerAcquisition from '../components/analytics/ModernCustomerAcquisition';
import ModernProductPerformance from '../components/analytics/ModernProductPerformance';
import ExportButton from '../components/export/ExportButton';
import { formatCurrency } from '../lib/format';
import analyticsData from '../data/analytics.json';

export default function AnalyticsModern() {
  const { t } = useTranslation();
  const [, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [drillDownModal, setDrillDownModal] = useState<{
    isOpen: boolean;
    title: string;
    data: any[];
    type: 'hourly' | 'daily' | 'weekly' | 'monthly';
    metric: string;
  }>({
    isOpen: false,
    title: '',
    data: [],
    type: 'daily',
    metric: 'revenue'
  });

  const openDrillDown = (title: string, data: any[], type: 'hourly' | 'daily' | 'weekly' | 'monthly', metric: string) => {
    setDrillDownModal({
      isOpen: true,
      title,
      data,
      type,
      metric
    });
  };

  // Time range options
  const timeRanges = [
    { value: '24h', label: t('analytics.timeRanges.24h') },
    { value: '7d', label: t('analytics.timeRanges.7d') },
    { value: '30d', label: t('analytics.timeRanges.30d') },
    { value: '90d', label: t('analytics.timeRanges.90d') }
  ];

  // Calculate metrics with memo for performance
  const metrics = useMemo(() => {
    const geoData = analyticsData.geographicData;
    const productData = analyticsData.productPerformance;
    const hourlyData = analyticsData.revenueByHour;
    // const _acquisitionData = analyticsData.customerAcquisition;

    const totalRevenue = geoData.reduce((sum, item) => sum + item.revenue, 0);
    const totalCustomers = geoData.reduce((sum, item) => sum + item.customers, 0);
    const totalOrders = productData.reduce((sum, item) => sum + item.units, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    const avgRevenuePerHour = hourlyData.reduce((sum, item) => sum + item.revenue, 0) / hourlyData.length;

    // Calculate growth rates (simulated)
    const revenueGrowth = 12.5;
    const customerGrowth = 8.2;
    const orderGrowth = -2.1;
    const aovGrowth = 15.3;

    return {
      totalRevenue,
      totalCustomers, 
      totalOrders,
      avgOrderValue,
      avgRevenuePerHour,
      revenueGrowth,
      customerGrowth,
      orderGrowth,
      aovGrowth
    };
  }, []);

  const handleFiltersChange = (newFilters: any) => {
    setLoading(true);
    setFilters(newFilters);
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  };

  const handleFiltersReset = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -m-3 sm:-m-4 lg:-m-6 p-3 sm:p-4 lg:p-6">
      {/* Header Section with Glassmorphism effect */}
      <div className="relative mb-6 lg:mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 dark:border-gray-700/30 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"></div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                  <ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 dark:from-white dark:via-purple-200 dark:to-indigo-200 bg-clip-text text-transparent">
                    {t('analytics.title')}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {t('analytics.subtitle')} • {t('overview.lastUpdate')}: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              {/* Quick Time Range Selector */}
              <div className="flex gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedTimeRange(range.value)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${selectedTimeRange === range.value
                        ? 'text-white shadow-lg' 
                        : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-600/80'
                      }
                    `}
                    style={selectedTimeRange === range.value ? {background: '#5347CE'} : {}}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AnalyticsFilters
                onFiltersChange={handleFiltersChange}
                onReset={handleFiltersReset}
                loading={loading}
              />
              <ExportButton
                data={[analyticsData]}
                filename="analytics-report"
                className="shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid - Mobile-first responsive design */}
      {/* Mobile Metrics - Horizontal scroll on small screens */}
      <div className="block sm:hidden mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 px-1">
          <div className="flex-shrink-0 w-64">
            <MobileMetricCard
              title={t('analytics.metrics.totalRevenue')}
              value={formatCurrency(metrics.totalRevenue)}
              change={metrics.revenueGrowth}
              icon={<CurrencyDollarIcon className="w-5 h-5" />}
              color="blue"
            />
          </div>
          <div className="flex-shrink-0 w-64">
            <MobileMetricCard
              title={t('overview.activeCustomers')}
              value={metrics.totalCustomers}
              change={metrics.customerGrowth}
              icon={<UsersIcon className="w-5 h-5" />}
              color="green"
            />
          </div>
          <div className="flex-shrink-0 w-64">
            <MobileMetricCard
              title={t('overview.totalOrders')}
              value={metrics.totalOrders}
              change={metrics.orderGrowth}
              icon={<ShoppingCartIcon className="w-5 h-5" />}
              color="purple"
            />
          </div>
          <div className="flex-shrink-0 w-64">
            <MobileMetricCard
              title={t('overview.avgOrderValue')}
              value={formatCurrency(metrics.avgOrderValue)}
              change={metrics.aovGrowth}
              icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
              color="orange"
            />
          </div>
        </div>
      </div>

      {/* Desktop Metrics Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button type="button" onClick={() => openDrillDown('Gelir', analyticsData.revenueByHour, 'hourly', 'revenue')} className="cursor-pointer text-left w-full">
          <MetricCard
            title={t('analytics.metrics.totalRevenue')}
            value={formatCurrency(metrics.totalRevenue)}
            change={metrics.revenueGrowth}
            changeLabel={t('overview.vsLastWeek')}
            icon={<CurrencyDollarIcon className="w-6 h-6" />}
            trend={metrics.revenueGrowth > 0 ? 'up' : 'down'}
            color="blue"
            loading={loading}
          />
        </button>
        <MetricCard
          title={t('overview.activeCustomers')}
          value={metrics.totalCustomers}
          change={metrics.customerGrowth}
          changeLabel={t('overview.vsLastWeek')}
          icon={<UsersIcon className="w-6 h-6" />}
          trend={metrics.customerGrowth > 0 ? 'up' : 'down'}
          color="green"
          loading={loading}
        />
        <MetricCard
          title={t('overview.totalOrders')}
          value={metrics.totalOrders}
          change={metrics.orderGrowth}
          changeLabel={t('overview.vsLastWeek')}
          icon={<ShoppingCartIcon className="w-6 h-6" />}
          trend={metrics.orderGrowth > 0 ? 'up' : 'down'}
          color="purple"
          loading={loading}
        />
        <MetricCard
          title={t('overview.avgOrderValue')}
          value={formatCurrency(metrics.avgOrderValue)}
          change={metrics.aovGrowth}
          changeLabel={t('overview.vsLastWeek')}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          trend={metrics.aovGrowth > 0 ? 'up' : 'down'}
          color="orange"
          loading={loading}
        />
      </div>

      {/* Data Insights - New AI-powered insights section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        <div className="xl:col-span-2">
          <InteractiveChart
            data={analyticsData.revenueByHour}
            title={t('analytics.revenueByHour')}
            subtitle={t('analytics.hourlyRevenueSubtitle')}
            xKey="hour"
            yKey="revenue"
            color="#4896FE"
            height={350}
            formatValue={formatCurrency}
            className="h-full"
          />
        </div>
        <DataInsights data={analyticsData} className="h-fit" />
      </div>


      {/* Charts Grid - Fully Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Modern Customer Acquisition */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-white/20 dark:border-gray-700/30 p-4 sm:p-6">
          <ModernCustomerAcquisition data={analyticsData.customerAcquisition} />
        </div>

        {/* Modern Product Performance */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-white/20 dark:border-gray-700/30 p-4 sm:p-6">
          <ModernProductPerformance data={analyticsData.productPerformance} />
        </div>
      </div>

      {/* Geographic Analysis - Fully Responsive */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-white/20 dark:border-gray-700/30 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl">
              <GlobeAltIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {t('analytics.geographicAnalysis')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t('analytics.geographicAnalysisSubtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <InteractiveChart
              data={analyticsData.geographicData.map(item => ({
                ...item,
                country: t(`countries.${item.country}`, item.country)
              }))}
              title=""
              xKey="country"
              yKey="revenue"
              color="#5347CE"
              height={400}
              type="bar"
              formatValue={formatCurrency}
              showTypeSelector={true}
            />
          </div>
          
          {/* Geographic Summary Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-2">
                <GlobeAltIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('analytics.metrics.totalCountries', 'Total Countries')}</span>
              </div>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {analyticsData.geographicData.length}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{t('analytics.metrics.globalRevenue', 'Global Revenue')}</span>
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {formatCurrency(analyticsData.geographicData.reduce((sum, item) => sum + item.revenue, 0))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-2">
                <UsersIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{t('analytics.metrics.globalCustomers', 'Global Customers')}</span>
              </div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {analyticsData.geographicData.reduce((sum, item) => sum + item.customers, 0).toLocaleString()}
              </div>
            </div>

            {/* Top performing country */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-2">
                <SparklesIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{t('analytics.metrics.topPerformance')}</span>
              </div>
              <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                {t(`countries.${[...analyticsData.geographicData].sort((a, b) => b.revenue - a.revenue)[0].country}`, [...analyticsData.geographicData].sort((a, b) => b.revenue - a.revenue)[0].country)}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                {formatCurrency([...analyticsData.geographicData].sort((a, b) => b.revenue - a.revenue)[0].revenue)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drill Down Modal */}
      <DrillDownModal
        isOpen={drillDownModal.isOpen}
        onClose={() => setDrillDownModal(prev => ({ ...prev, isOpen: false }))}
        title={drillDownModal.title}
        data={drillDownModal.data}
        drillDownType={drillDownModal.type}
        metric={drillDownModal.metric}
      />
    </div>
  );
}