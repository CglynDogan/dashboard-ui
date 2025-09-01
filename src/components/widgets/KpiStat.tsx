import { type ReactNode } from 'react';
import Card from '../ui/Card';
import { formatCurrency, formatNumber, formatPercentage } from '../../lib/format';

interface KpiStatProps {
  title: string;
  value: number;
  format?: 'currency' | 'number' | 'percentage';
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
}

export default function KpiStat({ 
  title, 
  value, 
  format = 'number',
  change,
  changeLabel,
  icon 
}: KpiStatProps) {
  
  const formatValue = () => {
    switch (format) {
      case 'currency': return formatCurrency(value);
      case 'percentage': return formatPercentage(value);
      default: return formatNumber(value);
    }
  };

  const changeColor = change && change > 0 ? 'text-nexus-success' : 'text-nexus-error';
  const iconColor = 'text-nexus-primary';

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`${iconColor} w-5 h-5`}>
                {icon}
              </div>
            </div>
          )}
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="5" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="15" r="1.5"/>
          </svg>
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatValue()}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${changeColor}`}>
              {change > 0 ? '↗' : '↘'} {formatPercentage(Math.abs(change))}
            </span>
            {changeLabel && (
              <span className="text-sm text-gray-500">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}