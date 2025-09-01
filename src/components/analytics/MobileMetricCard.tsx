import { memo, type ReactNode } from 'react';

interface MobileMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

function MobileMetricCard({ title, value, change, icon, color = 'blue' }: MobileMetricCardProps) {
  const colorClasses = {
    blue: '#4896FE',
    green: '#16C8C7', 
    purple: '#5347CE',
    orange: '#F59E0B'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-xl flex-shrink-0" 
          style={{ backgroundColor: colorClasses[color] }}
        >
          <div className="w-5 h-5 text-white">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {change !== undefined && (
              <span className={`text-xs font-medium ${
                change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MobileMetricCard);