import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import Button from '../ui/Button';

interface ErrorFallbackProps {
  error: Error | null;
  resetError?: () => void;
}

export default function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const handleRefresh = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Bir şeyler yanlış gitti
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Üzgünüz, beklenmeyen bir hata oluştu. Sayfayı yeniden yüklemeyi deneyin.
        </p>

        {import.meta.env.DEV && error && (
          <details className="text-left bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-4 text-sm">
            <summary className="cursor-pointer font-medium text-red-600 dark:text-red-400">
              Hata detayları (geliştirme modunda)
            </summary>
            <pre className="mt-2 text-red-500 dark:text-red-400 whitespace-pre-wrap">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}

        <Button onClick={handleRefresh} className="inline-flex items-center gap-2">
          <ArrowPathIcon className="h-4 w-4" />
          Sayfayı Yenile
        </Button>
      </div>
    </div>
  );
}
