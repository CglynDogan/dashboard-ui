import { type ReactNode, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
} | null;

export default function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  loading = false,
  emptyMessage = 'Veri bulunamadı'
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof T) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.width || ''
                  } ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`w-3 h-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-primary-600' 
                              : 'text-gray-400'
                          }`} 
                        />
                        <ChevronDownIcon 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-primary-600' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row) => (
                <tr 
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {columns.map((column) => (
                    <td 
                      key={String(column.key)}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                    >
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="animate-pulse p-6">
      <div className="h-12 bg-gray-200 dark:bg-gray-700 mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-8 bg-gray-100 dark:bg-gray-800 mb-2"></div>
      ))}
    </div>
  );
}