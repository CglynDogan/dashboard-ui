import { memo, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  EyeIcon, 
  ChartBarIcon, 
  PresentationChartLineIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

export type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface InteractiveChartProps {
  data: any[];
  title: string;
  subtitle?: string;
  type?: ChartType;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showTypeSelector?: boolean;
  formatValue?: (value: any) => string;
  className?: string;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

function InteractiveChart({
  data,
  title,
  subtitle,
  type = 'line',
  xKey,
  yKey,
  color = '#3b82f6',
  height = 300,
  showTypeSelector = true,
  formatValue = (value) => value.toString(),
  className = ''
}: InteractiveChartProps) {
  const [selectedType, setSelectedType] = useState<ChartType>(type);
  const [, setHoveredIndex] = useState<number | null>(null);

  const chartTypes = [
    { type: 'line' as ChartType, icon: PresentationChartLineIcon, label: 'Çizgi' },
    { type: 'area' as ChartType, icon: EyeIcon, label: 'Alan' },
    { type: 'bar' as ChartType, icon: ChartBarIcon, label: 'Sütun' },
    { type: 'pie' as ChartType, icon: ChartPieIcon, label: 'Pasta' },
  ];

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    if (!data.length) return null;

    const values = data.map(item => Number(item[yKey]) || 0);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { total, average, max, min, count: values.length };
  }, [data, yKey]);

  const renderChart = () => {
    const commonProps = {
      data
    };

    const tooltipStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      color: '#374151'
    };

    switch (selectedType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              formatter={(value) => [formatValue(value), title]}
            />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorArea)"
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              formatter={(value) => [formatValue(value), title]}
            />
            <Bar 
              dataKey={yKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={Math.min(height * 0.35, 120)}
              dataKey={yKey}
              label={(entry) => entry[xKey]}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatValue(value), title]} />
          </PieChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              formatter={(value) => [formatValue(value), title]}
            />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          
          {showTypeSelector && (
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {chartTypes.map(({ type: chartType, icon: Icon, label }) => (
                <button
                  key={chartType}
                  onClick={() => setSelectedType(chartType)}
                  className={`
                    p-2 rounded-md transition-all duration-200 text-xs font-medium
                    ${selectedType === chartType
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {summaryStats && selectedType !== 'pie' && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Toplam</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatValue(summaryStats.total)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Ortalama</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatValue(summaryStats.average)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">En Yüksek</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatValue(summaryStats.max)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">En Düşük</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatValue(summaryStats.min)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="px-6 pb-6">
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default memo(InteractiveChart);