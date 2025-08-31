import { memo } from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';

interface QueryStatusProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  loadingText?: string;
  errorText?: string;
  children?: React.ReactNode;
}

function QueryStatus({
  isLoading,
  isError,
  error,
  onRetry,
  loadingText = 'Yükleniyor...',
  errorText = 'Bir hata oluştu',
  children
}: QueryStatusProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center max-w-md">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {errorText}
          </h3>
          {error && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {error.message}
            </p>
          )}
          {onRetry && (
            <Button onClick={onRetry} className="inline-flex items-center gap-2">
              <ArrowPathIcon className="h-4 w-4" />
              Tekrar Dene
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default memo(QueryStatus);