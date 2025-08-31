import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable, { type Column } from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/filters/SearchInput';
import FilterDropdown from '../components/filters/FilterDropdown';
import Pagination from '../components/ui/Pagination';
import { usePagination } from '../hooks/usePagination';
import { formatDate } from '../lib/format';
import { type SupportTicket } from '../types';
import supportData from '../data/support.json';

export default function Support() {
  const { t } = useTranslation();
  const [data] = useState<SupportTicket[]>(supportData as SupportTicket[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  // Filter options
  const statusOptions = [
    { value: 'Açık', label: t('support.statuses.Açık') },
    { value: 'İşlemde', label: t('support.statuses.İşlemde') },
    { value: 'Beklemede', label: t('support.statuses.Beklemede') },
    { value: 'İnceleme', label: t('support.statuses.İnceleme') },
    { value: 'Çözüldü', label: t('support.statuses.Çözüldü') },
    { value: 'Kapatıldı', label: t('support.statuses.Kapatıldı') }
  ];

  const priorityOptions = [
    { value: 'Kritik', label: t('support.priorities.Kritik') },
    { value: 'Yüksek', label: t('support.priorities.Yüksek') },
    { value: 'Orta', label: t('support.priorities.Orta') },
    { value: 'Düşük', label: t('support.priorities.Düşük') }
  ];

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(data.map(ticket => ticket.category))];
    return categories.map(category => ({ 
      value: category, 
      label: t(`support.categories.${category}`) 
    }));
  }, [data, t]);

  const assigneeOptions = useMemo(() => {
    const assignees = [...new Set(data.map(ticket => ticket.assignedTo))];
    return assignees.map(assignee => ({ value: assignee, label: assignee }));
  }, [data]);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter(ticket => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(ticket.status);

      // Priority filter
      const matchesPriority = selectedPriorities.length === 0 || 
        selectedPriorities.includes(ticket.priority);

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(ticket.category);

      // Assignee filter
      const matchesAssignee = selectedAssignees.length === 0 || 
        selectedAssignees.includes(ticket.assignedTo);

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignee;
    });
  }, [data, searchTerm, selectedStatuses, selectedPriorities, selectedCategories, selectedAssignees]);

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
  const prevFiltersRef = useRef({ searchTerm, selectedStatuses, selectedPriorities, selectedCategories, selectedAssignees });
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.searchTerm !== searchTerm ||
      prevFilters.selectedStatuses.length !== selectedStatuses.length ||
      prevFilters.selectedPriorities.length !== selectedPriorities.length ||
      prevFilters.selectedCategories.length !== selectedCategories.length ||
      prevFilters.selectedAssignees.length !== selectedAssignees.length ||
      !prevFilters.selectedStatuses.every(s => selectedStatuses.includes(s)) ||
      !prevFilters.selectedPriorities.every(p => selectedPriorities.includes(p)) ||
      !prevFilters.selectedCategories.every(c => selectedCategories.includes(c)) ||
      !prevFilters.selectedAssignees.every(a => selectedAssignees.includes(a))
    ) {
      goToPage(1);
      prevFiltersRef.current = { searchTerm, selectedStatuses, selectedPriorities, selectedCategories, selectedAssignees };
    }
  }, [searchTerm, selectedStatuses, selectedPriorities, selectedCategories, selectedAssignees, goToPage]);

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
      case 'Çözüldü': return 'success';
      case 'Kapatıldı': return 'default';
      case 'İşlemde': return 'warning';
      case 'Beklemede': return 'warning';
      case 'İnceleme': return 'warning';
      case 'Açık': return 'error';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    return t(`support.priorities.${priority}`, priority);
  };

  const getStatusLabel = (status: string) => {
    return t(`support.statuses.${status}`, status);
  };

  // Priority sorting function - Kritik > Yüksek > Orta > Düşük
  const prioritySortFunction = (a: SupportTicket, b: SupportTicket, direction: 'asc' | 'desc') => {
    const priorityOrder = { 'Kritik': 4, 'Yüksek': 3, 'Orta': 2, 'Düşük': 1 };
    const aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (direction === 'asc') {
      return bValue - aValue; // Highest priority first when ascending
    } else {
      return aValue - bValue; // Lowest priority first when descending
    }
  };

  const columns: Column<SupportTicket>[] = [
    {
      key: 'id',
      header: t('support.columns.id'),
      sortable: true,
      width: 'w-32'
    },
    {
      key: 'title',
      header: t('support.columns.title'),
      sortable: true,
      render: (value, row) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {row.description}
          </div>
        </div>
      )
    },
    {
      key: 'customerName',
      header: t('support.columns.customer'),
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
      key: 'priority',
      header: t('support.columns.priority'),
      sortable: true,
      sortFunction: prioritySortFunction,
      render: (value) => (
        <Badge variant={getPriorityVariant(String(value || ''))}>
          {getPriorityLabel(String(value || ''))}
        </Badge>
      )
    },
    {
      key: 'status',
      header: t('support.columns.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={getStatusVariant(String(value || ''))}>
          {getStatusLabel(String(value || ''))}
        </Badge>
      )
    },
    {
      key: 'category',
      header: t('support.columns.category'),
      sortable: true,
      render: (value) => t(`support.categories.${value}`)
    },
    {
      key: 'assignedTo',
      header: t('support.columns.assignedTo'),
      sortable: true
    },
    {
      key: 'createdAt',
      header: t('support.columns.createdAt'),
      sortable: true,
      render: (value) => formatDate(String(value || ''))
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('support.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('support.subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('support.searchPlaceholder')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label={t('support.filters.status')}
            options={statusOptions}
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
          />
          <FilterDropdown
            label={t('support.filters.priority')}
            options={priorityOptions}
            selectedValues={selectedPriorities}
            onChange={setSelectedPriorities}
          />
          <FilterDropdown
            label={t('support.filters.category')}
            options={categoryOptions}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
          />
          <FilterDropdown
            label={t('support.filters.assignedTo')}
            options={assigneeOptions}
            selectedValues={selectedAssignees}
            onChange={setSelectedAssignees}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {(searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedCategories.length > 0 || selectedAssignees.length > 0) 
            ? t('support.showingResultsFiltered', { filtered: filteredData.length, total: data.length })
            : t('support.showingResults', { count: filteredData.length })
          }
        </p>
        {(searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedCategories.length > 0 || selectedAssignees.length > 0) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatuses([]);
              setSelectedPriorities([]);
              setSelectedCategories([]);
              setSelectedAssignees([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t('support.clearFilters')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <DataTable
          data={paginatedData}
          columns={columns}
          emptyMessage={
            searchTerm || selectedStatuses.length > 0 || selectedPriorities.length > 0 || selectedCategories.length > 0 || selectedAssignees.length > 0
              ? t('support.noFilterResults')
              : t('support.noDataFound')
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