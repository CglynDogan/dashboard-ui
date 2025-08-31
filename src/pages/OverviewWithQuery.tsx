import { CurrencyDollarIcon, UsersIcon, ShoppingCartIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import KpiStat from '../components/widgets/KpiStat';
import Card from '../components/ui/Card';
import QueryStatus from '../components/ui/QueryStatus';
import { formatRelativeDate, formatCurrency, formatDate } from '../lib/format';
import { useSalesData } from '../hooks/queries/useSalesData';
import { useRealtimeMetrics } from '../hooks/queries/useAnalyticsData';

export default function OverviewWithQuery() {
  const { t } = useTranslation();
  
  // Use React Query for data fetching
  const {
    data: salesData,
    isLoading: salesLoading,
    isError: salesError,
    error: salesErrorData,
    refetch: refetchSales
  } = useSalesData();

  const {
    data: realtimeMetrics,
    isLoading: metricsLoading,
    isError: metricsError,
  } = useRealtimeMetrics();

  // Show loading state
  if (salesLoading) {
    return (
      <QueryStatus 
        isLoading={true} 
        loadingText="Dashboard verileri yükleniyor..." 
      />
    );
  }

  // Show error state
  if (salesError) {
    return (
      <QueryStatus
        isError={true}
        error={salesErrorData}
        onRetry={() => refetchSales()}
        errorText="Dashboard verileri yüklenemedi"
      />
    );
  }

  if (!salesData) return null;

  // Calculate KPIs from sales data
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalOrders = salesData.length;
  // const avgOrderValue = totalRevenue / totalOrders;

  // Chart data
  const chartData = salesData
    .map(sale => ({
      date: sale.date,
      revenue: sale.revenue
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('overview.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('overview.subtitle')}
        </p>
        {realtimeMetrics && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Son güncelleme: {new Date(realtimeMetrics.timestamp).toLocaleTimeString('tr-TR')}
          </p>
        )}
      </div>

      {/* KPI Cards with real-time data when available */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiStat
          title={t('overview.totalRevenue')}
          value={realtimeMetrics?.currentRevenue || totalRevenue}
          format="currency"
          change={12.5}
          changeLabel={t('overview.vsLastWeek')}
          icon={<CurrencyDollarIcon className="w-8 h-8" />}
        />
        <KpiStat
          title="Aktif Kullanıcı"
          value={realtimeMetrics?.activeUsers || 1250}
          format="number"
          change={8.2}
          changeLabel={t('overview.vsLastWeek')}
          icon={<UsersIcon className="w-8 h-8" />}
        />
        <KpiStat
          title={t('overview.totalOrders')}
          value={totalOrders}
          format="number"
          change={-2.1}
          changeLabel={t('overview.vsLastWeek')}
          icon={<ShoppingCartIcon className="w-8 h-8" />}
        />
        <KpiStat
          title="Dönüşüm Oranı"
          value={realtimeMetrics?.conversionRate ? parseFloat(realtimeMetrics.conversionRate) : 3.2}
          format="percentage"
          change={5.7}
          changeLabel={t('overview.vsLastWeek')}
          icon={<ArrowTrendingUpIcon className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('overview.revenueChart')}
            </h3>
            {metricsLoading && (
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Güncelleniyor...
              </div>
            )}
            {metricsError && (
              <div className="text-xs text-red-600 dark:text-red-400">
                Canlı veri hatası
              </div>
            )}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text)'
                  }}
                  labelStyle={{ color: 'var(--tooltip-text)' }}
                  labelFormatter={(value) => `${t('chart.date')}: ${formatDate(value)}`}
                  formatter={(value) => [formatCurrency(Number(value)), t('chart.revenue')]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('overview.recentActivities')}
          </h3>
          <div className="space-y-3">
            {/* Mock recent activities */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Aktivite {index + 1} - Sistem güncellendi
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeDate(new Date().toISOString())}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}