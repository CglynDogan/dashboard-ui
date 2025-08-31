import { ReactNode, memo } from 'react';
import { clsx } from 'clsx';
import { formatCurrency, formatNumber } from '../../lib/format';

interface KpiStatProps {
  title: string;
  value: number;
  format: 'currency' | 'number' | 'percentage';
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  className?: string;
}

function KpiStat({
  title,
  value,
  format,
  change,
  changeLabel,
  icon,
  className
}: KpiStatProps) {
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'number':
      default:
        return formatNumber(val);
    }
  };

  const isPositiveChange = change !== undefined && change > 0;
  const isNegativeChange = change !== undefined && change < 0;

  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatValue(value, format)}
          </p>
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          </div>
        )}
      </div>
      
      {change !== undefined && changeLabel && (
        <div className="mt-4 flex items-center">
          <span className={clsx(
            'text-sm font-medium',
            {
              'text-green-600 dark:text-green-400': isPositiveChange,
              'text-red-600 dark:text-red-400': isNegativeChange,
              'text-gray-600 dark:text-gray-400': change === 0,
            }
          )}>
            {change > 0 && '+'}
            {change.toFixed(1)}%
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {changeLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(KpiStat);