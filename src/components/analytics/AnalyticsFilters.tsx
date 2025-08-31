import { memo, useState } from 'react';
import {
  FunnelIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import DateRangeFilter from '../filters/DateRangeFilter';

interface AnalyticsFiltersProps {
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
  loading?: boolean;
}

function AnalyticsFilters({ onFiltersChange, onReset, loading = false }: AnalyticsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'revenue', 'customers', 'orders'
  ]);
  const [timeGranularity, setTimeGranularity] = useState('daily');

  const metrics = [
    { id: 'revenue', label: 'Gelir', color: 'blue' },
    { id: 'customers', label: 'Müşteriler', color: 'green' },
    { id: 'orders', label: 'Siparişler', color: 'purple' },
    { id: 'conversion', label: 'Dönüşüm', color: 'orange' },
    { id: 'retention', label: 'Elde Tutma', color: 'red' }
  ];

  const timeOptions = [
    { value: 'hourly', label: 'Saatlik' },
    { value: 'daily', label: 'Günlük' },
    { value: 'weekly', label: 'Haftalık' },
    { value: 'monthly', label: 'Aylık' }
  ];

  const handleApplyFilters = () => {
    onFiltersChange({
      dateRange,
      selectedMetrics,
      timeGranularity
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setDateRange({ startDate: '', endDate: '' });
    setSelectedMetrics(['revenue', 'customers', 'orders']);
    setTimeGranularity('daily');
    onReset();
    setIsOpen(false);
  };

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const hasActiveFilters = dateRange.startDate || dateRange.endDate || 
    selectedMetrics.length !== 3 || timeGranularity !== 'daily';

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="secondary"
        className={`inline-flex items-center gap-2 ${hasActiveFilters ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
      >
        <FunnelIcon className="w-4 h-4" />
        Filtreler
        {hasActiveFilters && (
          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedMetrics.length}
          </span>
        )}
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filtreler
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Date Range */}
            <div className="mb-6">
              <DateRangeFilter
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
                onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
                label="Tarih Aralığı"
              />
            </div>

            {/* Time Granularity */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Zaman Aralığı
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeGranularity(option.value)}
                    className={`
                      px-3 py-2 text-sm rounded-lg border transition-colors
                      ${timeGranularity === option.value
                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Gösterilecek Metrikler
              </label>
              <div className="space-y-2">
                {metrics.map((metric) => (
                  <label
                    key={metric.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => toggleMetric(metric.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`w-3 h-3 rounded-full bg-${metric.color}-500`}></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {metric.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleApplyFilters}
                className="flex-1"
                loading={loading}
              >
                Uygula
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <ArrowPathIcon className="w-4 h-4" />
                Sıfırla
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default memo(AnalyticsFilters);