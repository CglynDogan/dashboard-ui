import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { formatCurrency } from '../../lib/format';
import { type CustomerAcquisition } from '../../types';

interface CustomerAcquisitionChartProps {
  data: CustomerAcquisition[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function CustomerAcquisitionChart({ data }: CustomerAcquisitionChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ source, percentage }) => `${source} ${percentage.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="customers"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)',
              }}
              formatter={value => [`${value} müşteri`, 'Kazanılan Müşteri']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Table */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Müşteri Kazanım Metrikleri
        </h4>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.source}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{item.source}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.customers} müşteri (%{item.percentage.toFixed(1)})
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-white">
                  {item.cac > 0 ? formatCurrency(item.cac) : 'Ücretsiz'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">CAC</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {data.reduce((sum, item) => sum + item.customers, 0)}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Toplam Müşteri</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(
                  data.reduce((sum, item) => sum + item.cost, 0) /
                    data.reduce((sum, item) => sum + item.customers, 0)
                )}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Average CAC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
