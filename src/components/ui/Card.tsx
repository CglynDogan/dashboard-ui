import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700',
        // Only apply default padding if no custom className with padding is provided
        !className?.includes('p-') && {
          'p-3 sm:p-4': padding === 'sm',
          'p-4 sm:p-6': padding === 'md', 
          'p-6 sm:p-8': padding === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
}