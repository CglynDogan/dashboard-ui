import { useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
}

export const useErrorHandler = () => {
  const { setLoading } = useAppStore();

  const handleError = useCallback((
    error: Error, 
    options: ErrorHandlerOptions = {}
  ) => {
    const { showToast = true, logError = true } = options;

    // Stop any loading states
    setLoading(false);

    // Log error in development
    if (logError && process.env.NODE_ENV === 'development') {
      console.error('Error handled:', error);
    }

    // In production, you might want to send to error tracking service
    if (process.env.NODE_ENV === 'production' && logError) {
      // Example: sendToErrorTracking(error);
    }

    // Show toast notification if requested
    if (showToast) {
      // Here you could integrate with a toast library
      console.warn('Error toast:', error.message);
    }
  }, [setLoading]);

  return handleError;
};