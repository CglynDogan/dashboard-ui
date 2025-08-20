import { CurrencyDollarIcon, UsersIcon, ShoppingCartIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import KpiStat from '../components/widgets/KpiStat';
import Card from '../components/ui/Card';
import { formatRelativeDate, formatCurrency, formatDate } from '../lib/format';
import salesData from '../data/sales.json';
import returnsData from '../data/returns.json';
import customersData from '../data/customers.json';
import activitiesData from '../data/activities.json';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Overview() {
  const { t } = useTranslation();
  // KPI hesaplamaları (iadeler dahil)
  const completedReturns = returnsData.filter((returnItem: any) => returnItem.status === 'Tamamlandı');
  const totalReturns = completedReturns.reduce((sum: number, returnItem: any) => sum + returnItem.refundAmount, 0);
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0) - totalReturns;
  const totalCustomers = customersData.length;
  const totalOrders = salesData.length;
  const avgOrderValue = totalRevenue / totalOrders;

  // Grafik verisi
  const chartData = salesData.map(sale => ({
    date: sale.date,
    revenue: sale.revenue
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('overview.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('overview.subtitle')}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiStat
          title={t('overview.totalRevenue')}
          value={totalRevenue}
          format="currency"
          change={12.5}
          changeLabel={t('overview.vsLastWeek')}
          icon={<CurrencyDollarIcon className="w-8 h-8" />}
        />
        <KpiStat
          title={t('overview.activeCustomers')}
          value={totalCustomers}
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
          title={t('overview.avgOrderValue')}
          value={avgOrderValue}
          format="currency"
          change={5.7}
          changeLabel={t('overview.vsLastWeek')}
          icon={<ArrowTrendingUpIcon className="w-8 h-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('overview.revenueChart')}
          </h3>
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
            {activitiesData.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeDate(activity.createdAt)}
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