import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { DataExporter, type ExportFormat } from '../../lib/export';
import Button from '../ui/Button';

interface ExportButtonProps<T> {
  data: T[];
  filename?: string;
  disabled?: boolean;
  className?: string;
}

function ExportButton<T extends Record<string, any>>({
  data,
  filename = 'export',
  disabled = false,
  className
}: ExportButtonProps<T>) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    if (!data || data.length === 0) {
      alert(t('export.noData'));
      return;
    }

    setIsExporting(true);
    try {
      const extension = format === 'excel' ? 'xlsx' : format;
      await DataExporter.export(format, data, {
        filename: `${filename}.${extension}`
      });
    } catch (error) {
      console.error('Export error:', error);
      alert(t('export.error'));
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExporting}
        loading={isExporting}
        className={`inline-flex items-center gap-2 ${className}`}
        variant="secondary"
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        {t('export.button')}
        <ChevronDownIcon className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            <button
              onClick={() => handleExport('csv')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('export.formats.csv')}
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('export.formats.excel')}
            </button>
            <button
              onClick={() => handleExport('json')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t('export.formats.json')}
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default memo(ExportButton) as <T extends Record<string, any>>(props: ExportButtonProps<T>) => JSX.Element;