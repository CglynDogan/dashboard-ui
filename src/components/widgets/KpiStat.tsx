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

  const changeColor = change && change > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatValue()}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${changeColor}`}>
                {formatPercentage(change)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {changeLabel}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}