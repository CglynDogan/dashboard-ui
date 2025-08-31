import { ReactNode } from 'react';
import ErrorBoundary from '../error/ErrorBoundary';

interface PageErrorBoundaryProps {
  children: ReactNode;
}

export default function PageErrorBoundary({ children }: PageErrorBoundaryProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}