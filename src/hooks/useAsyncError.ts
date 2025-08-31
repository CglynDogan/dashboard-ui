import { useCallback } from 'react';

// Hook to throw async errors to error boundary
export const useAsyncError = () => {
  const throwAsyncError = useCallback((error: Error) => {
    // Create a synchronous error that can be caught by error boundary
    setTimeout(() => {
      throw error;
    }, 0);
  }, []);

  return throwAsyncError;
};