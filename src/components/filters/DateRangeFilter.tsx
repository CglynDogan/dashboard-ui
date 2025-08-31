import { memo, useCallback } from 'react';

interface DateRangeFilterProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  label?: string;
}

function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label = 'Tarih Aralığı'
}: DateRangeFilterProps) {
  const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(e.target.value);
  }, [onStartDateChange]);

  const handleEndDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(e.target.value);
  }, [onEndDateChange]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex space-x-2">
        <input
          type="date"
          value={startDate || ''}
          onChange={handleStartDateChange}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Başlangıç"
        />
        <input
          type="date"
          value={endDate || ''}
          onChange={handleEndDateChange}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Bitiş"
        />
      </div>
    </div>
  );
}

export default memo(DateRangeFilter);