import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import ConversionFunnel from '../components/charts/ConversionFunnel';
import CustomerAcquisitionChart from '../components/charts/CustomerAcquisitionChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../lib/format';
import analyticsData from '../data/analytics.json';
import { 
  type ConversionFunnelStage, 
  type CustomerAcquisition, 
  type RevenueByHour,
  type ProductPerformance,
  type GeographicData 
} from '../types';

export default function Analytics() {
  const { t } = useTranslation();
  
  const [conversionData] = useState<ConversionFunnelStage[]>(analyticsData.conversionFunnel);
  const [acquisitionData] = useState<CustomerAcquisition[]>(analyticsData.customerAcquisition);
  const [hourlyData] = useState<RevenueByHour[]>(analyticsData.revenueByHour);
  const [productData] = useState<ProductPerformance[]>(analyticsData.productPerformance);
  const [geoData] = useState<GeographicData[]>(analyticsData.geographicData as GeographicData[]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('analytics.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('analytics.subtitle')}</p>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t('analytics.conversionFunnel')}
        </h3>
        <ConversionFunnel data={conversionData} />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Customer Acquisition */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('analytics.customerAcquisition')}
          </h3>
          <CustomerAcquisitionChart data={acquisitionData} />
        </Card>

        {/* Hourly Revenue */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('analytics.revenueByHour')}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text)'
                  }}
                  labelFormatter={(value) => `Saat: ${value}`}
                  formatter={(value) => [formatCurrency(Number(value)), 'Gelir']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('analytics.productPerformance')}
          </h3>
          <div className="space-y-4">
            {productData.map((product) => (
              <div key={product.product} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {t(`products.${product.product}`)}
                  </h4>
                  <span className={`text-sm font-medium ${
                    product.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Gelir</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Adet</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.units}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Ort. Fiyat</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(product.avgPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Kar Marjı</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      %{product.margin}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Geographic Analysis */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t('analytics.geographicAnalysis')}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="country" type="category" width={80} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text)'
                  }}
                  formatter={(value) => [formatCurrency(Number(value)), 'Gelir']}
                />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Geographic Summary */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {geoData.length}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Ülke</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCurrency(geoData.reduce((sum, item) => sum + item.revenue, 0))}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Toplam Gelir</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {geoData.reduce((sum, item) => sum + item.customers, 0)}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Toplam Müşteri</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}