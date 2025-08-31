import LoadingSpinner from './LoadingSpinner';

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
      </div>
    </div>
  );
}