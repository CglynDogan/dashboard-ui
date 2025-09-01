import { type ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200': variant === 'default',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': variant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant === 'error',
          'text-white': variant === 'primary' || variant === 'secondary' || variant === 'success' || variant === 'info',
          
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        }
      )}
      style={{
        backgroundColor: 
          variant === 'primary' ? '#5347CE' :
          variant === 'secondary' ? '#16C8C7' :
          variant === 'success' ? '#16C8C7' :
          variant === 'info' ? '#4896FE' :
          undefined
      }}
    >
      {children}
    </span>
  );
}