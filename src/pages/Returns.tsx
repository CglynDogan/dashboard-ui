import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable, { type Column } from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/filters/SearchInput';
import FilterDropdown from '../components/filters/FilterDropdown';
import Pagination from '../components/ui/Pagination';
import { usePagination } from '../hooks/usePagination';
import { formatCurrency, formatDate } from '../lib/format';
import { type ReturnRequest } from '../types';
import returnsData from '../data/returns.json';

export default function Returns() {
  const { t } = useTranslation();
  const [data] = useState<ReturnRequest[]>(returnsData as ReturnRequest[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedReasonCategories, setSelectedReasonCategories] = useState<string[]>([]);
  const [selectedRefundMethods, setSelectedRefundMethods] = useState<string[]>([]);

  // Filter options
  const statusOptions = [
    { value: 'Onay Bekliyor', label: t('returns.statuses.Onay Bekliyor') },
    { value: 'İnceleme', label: t('returns.statuses.İnceleme') },
    { value: 'İşlemde', label: t('returns.statuses.İşlemde') },
    { value: 'Tamamlandı', label: t('returns.statuses.Tamamlandı') },
    { value: 'Reddedildi', label: t('returns.statuses.Reddedildi') },
    { value: 'İptal Edildi', label: t('returns.statuses.İptal Edildi') }
  ];

  const priorityOptions = [
    { value: 'Kritik', label: t('returns.priorities.Kritik') },
    { value: 'Yüksek', label: t('returns.priorities.Yüksek') },
    { value: 'Orta', label: t('returns.priorities.Orta') },
    { value: 'Düşük', label: t('returns.priorities.Düşük') }
  ];

  const reasonCategoryOptions = [
    { value: 'Kalite', label: t('returns.reasonCategories.Kalite') },
    { value: 'Sipariş Hatası', label: t('returns.reasonCategories.Sipariş Hatası') },
    { value: 'Teknik', label: t('returns.reasonCategories.Teknik') },
    { value: 'Politika', label: t('returns.reasonCategories.Politika') },
    { value: 'Hasar', label: t('returns.reasonCategories.Hasar') },
    { value: 'Değişim', label: t('returns.reasonCategories.Değişim') },
    { value: 'Memnuniyetsizlik', label: t('returns.reasonCategories.Memnuniyetsizlik') }
  ];

  const refundMethodOptions = useMemo(() => {
    const methods = [...new Set(data.filter(item => item.refundMethod).map(item => item.refundMethod))];
    return methods.map(method => ({ 
      value: method!, 
      label: t(`returns.refundMethods.${method}`) 
    }));
  }, [data, t]);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter(returnRequest => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        returnRequest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnRequest.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnRequest.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnRequest.product.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(returnRequest.status);

      // Priority filter
      const matchesPriority = selectedPriorities.length === 0 || 
        selectedPriorities.includes(returnRequest.priority);

      // Reason category filter
      const matchesReasonCategory = selectedReasonCategories.length === 0 || 
        selectedReasonCategories.includes(returnRequest.reasonCategory);

      // Refund method filter
      const matchesRefundMethod = selectedRefundMethods.length === 0 || 
        (returnRequest.refundMethod && selectedRefundMethods.includes(returnRequest.refundMethod));

      return matchesSearch && matchesStatus && matchesPriority && matchesReasonCategory && matchesRefundMethod;
    });
  }, [data, searchTerm, selectedStatuses, selectedPriorities, selectedReasonCategories, selectedRefundMethods]);

  // Pagination
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData,
    goToPage,
    changeItemsPerPage,
    totalItems
  } = usePagination({ data: filteredData, initialItemsPerPage: 25 });

  // Reset pagination when filters change
  const prevFiltersRef = useRef({ searchTerm, selectedStatuses, selectedPriorities, selectedReasonCategories, selectedRefundMethods });
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.searchTerm !== searchTerm ||
      prevFilters.selectedStatuses.length !== selectedStatuses.length ||
      prevFilters.selectedPriorities.length !== selectedPriorities.length ||
      prevFilters.selectedReasonCategories.length !== selectedReasonCategories.length ||
      prevFilters.selectedRefundMethods.length !== selectedRefundMethods.length ||
      !prevFilters.selectedStatuses.every(s => selectedStatuses.includes(s)) ||
      !prevFilters.selectedPriorities.every(p => selectedPriorities.includes(p)) ||
      !prevFilters.selectedReasonCategories.every(r => selectedReasonCategories.includes(r)) ||
      !prevFilters.selectedRefundMethods.every(m => selectedRefundMethods.includes(m))
    ) {
      goToPage(1);
      prevFiltersRef.current = { searchTerm, selectedStatuses, selectedPriorities, selectedReasonCategories, selectedRefundMethods };
    }
  }, [searchTerm, selectedStatuses, selectedPriorities, selectedReasonCategories, selectedRefundMethods, goToPage]);

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Kritik': return 'error';
      case 'Yüksek': return 'warning';
      case 'Orta': return 'default';
      case 'Düşük': return 'success';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Tamamlandı': return 'success';
      case 'İşlemde': return 'warning';
      case 'İnceleme': return 'warning';
      case 'Onay Bekliyor': return 'warning';
      case 'Reddedildi': return 'error';
      case 'İptal Edildi': return 'default';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return t(`returns.priorities.${priority}`, priority);
  };

  const getStatusLabel = (status: string) => {
    return t(`returns.statuses.${status}`, status);
  };

  // Priority sorting function - Kritik > Yüksek > Orta > Düşük
  const prioritySortFunction = (a: ReturnRequest, b: ReturnRequest, direction: 'asc' | 'desc') => {
    const priorityOrder = { 'Kritik': 4, 'Yüksek': 3, 'Orta': 2, 'Düşük': 1 };
    const aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (direction === 'asc') {
      return bValue - aValue; // Highest priority first when ascending
    } else {
      return aValue - bValue; // Lowest priority first when descending
    }
  };

  const columns: Column<ReturnRequest>[] = [
    {
      key: 'id',
      header: t('returns.columns.id'),
      sortable: true,
      width: 'w-32'
    },
    {
      key: 'customerName',
      header: t('returns.columns.customer'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.customerEmail}
          </div>
        </div>
      )
    },
    {
      key: 'product',
      header: t('returns.columns.product'),
      sortable: true,
      render: (value) => t(`products.${value}`)
    },
    {
      key: 'originalAmount',
      header: t('returns.columns.originalAmount'),
      sortable: true,
      render: (value) => formatCurrency(Number(value || 0))
    },
    {
      key: 'refundAmount',
      header: t('returns.columns.refundAmount'),
      sortable: true,
      render: (value) => formatCurrency(Number(value || 0))
    },
    {
      key: 'reason',
      header: t('returns.columns.reason'),
      sortable: true,
      render: (value, row) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {t(`returns.reasonCategories.${row.reasonCategory}`)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {value}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: t('returns.columns.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={getStatusVariant(String(value || ''))}>
          {getStatusLabel(String(value || ''))}
        </Badge>
      )
    },
    {
      key: 'priority',
      header: t('returns.columns.priority'),
      sortable: true,
      sortFunction: prioritySortFunction,
      render: (value) => (
        <Badge variant={getPriorityVariant(String(value || ''))}>
          {getPriorityLabel(String(value || ''))}
        </Badge>
      )
    },
    {
      key: 'requestedAt',
      header: t('returns.columns.requestedAt'),
      sortable: true,
      render: (value) => formatDate(String(value || ''))
    },
    {
      key: 'assignedTo',
      header: t('returns.columns.assignedTo'),
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('returns.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('returns.subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('returns.searchPlaceholder')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label={t('returns.filters.status')}
            options={statusOptions}
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
          />
          <FilterDropdown
            label={t('returns.filters.priority')}
            options={priorityOptions}
            selectedValues={selectedPriorities}
            onChange={setSelectedPriorities}
          />
          <FilterDropdown
            label={t('returns.filters.reasonCategory')}
            options={reasonCategoryOptions}
            selectedValues={selectedReasonCategories}
            onChange={setSelectedReasonCategories}
          />
          <FilterDropdown
            label={t('returns.filters.refundMethod')}
            options={refundMethodOptions}
            selectedValues={selectedRefundMethods}
            onChange={setSelectedRefundMethods}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {(searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedReasonCategories.length > 0 || selectedRefundMethods.length > 0) 
            ? t('returns.showingResultsFiltered', { filtered: filteredData.length, total: data.length })
            : t('returns.showingResults', { count: filteredData.length })
          }
        </p>
        {(searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedReasonCategories.length > 0 || selectedRefundMethods.length > 0) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatuses([]);
              setSelectedPriorities([]);
              setSelectedReasonCategories([]);
              setSelectedRefundMethods([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t('returns.clearFilters')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <DataTable
          data={paginatedData}
          columns={columns}
          emptyMessage={
            searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedReasonCategories.length > 0 || selectedRefundMethods.length > 0
              ? t('returns.noFilterResults')
              : t('returns.noDataFound')
          }
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onItemsPerPageChange={changeItemsPerPage}
        />
      </div>
    </div>
  );
}