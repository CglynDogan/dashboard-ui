import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../lib/format';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { type ChartType } from './ChartTypeSelector';

interface SalesChartProps {
  data: { region: string; revenue: number }[];
  chartType: ChartType;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SalesChart({ data, chartType }: SalesChartProps) {
  const { t } = useTranslation();

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip 
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
              labelStyle={{ color: 'var(--tooltip-text)' }}
              labelFormatter={(value) => `${t('chart.region')}: ${value}`}
              formatter={(value) => [formatCurrency(Number(value)), t('chart.revenue')]}
            />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
              labelStyle={{ color: 'var(--tooltip-text)' }}
              labelFormatter={(value) => `${t('chart.region')}: ${value}`}
              formatter={(value) => [formatCurrency(Number(value)), t('chart.revenue')]}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ region, percent }) => `${region} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="revenue"
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
                color: 'var(--tooltip-text)'
              }}
              formatter={(value) => [formatCurrency(Number(value)), t('chart.revenue')]}
            />
            <Legend />
          </PieChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
              labelStyle={{ color: 'var(--tooltip-text)' }}
              labelFormatter={(value) => `${t('chart.region')}: ${value}`}
              formatter={(value) => [formatCurrency(Number(value)), t('chart.revenue')]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.3}
            />
          </AreaChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}