import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable, { type Column } from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/filters/SearchInput';
import FilterDropdown from '../components/filters/FilterDropdown';
import Pagination from '../components/ui/Pagination';
import { usePagination } from '../hooks/usePagination';
import { formatCurrency, formatDate } from '../lib/format';
import { type Customer } from '../types';
import customersData from '../data/customers.json';

export default function Customers() {
  const { t } = useTranslation();
  const [data] = useState<Customer[]>(customersData as Customer[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Filter options
  const segmentOptions = [
    { value: 'VIP', label: t('customers.segments.VIP') },
    { value: 'Loyal', label: t('customers.segments.Loyal') },
    { value: 'New', label: t('customers.segments.New') },
    { value: 'ChurnRisk', label: t('customers.segments.ChurnRisk') }
  ];

  const countryOptions = useMemo(() => {
    const countries = [...new Set(data.map(customer => customer.country))];
    return countries.map(country => ({ value: country, label: country }));
  }, [data]);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter(customer => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase());

      // Segment filter
      const matchesSegment = selectedSegments.length === 0 || 
        selectedSegments.includes(customer.segment);

      // Country filter
      const matchesCountry = selectedCountries.length === 0 || 
        selectedCountries.includes(customer.country);

      return matchesSearch && matchesSegment && matchesCountry;
    });
  }, [data, searchTerm, selectedSegments, selectedCountries]);

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

  // Reset pagination when filters change - use ref to avoid infinite loops
  const prevFiltersRef = useRef({ searchTerm, selectedSegments, selectedCountries });
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.searchTerm !== searchTerm ||
      prevFilters.selectedSegments.length !== selectedSegments.length ||
      prevFilters.selectedCountries.length !== selectedCountries.length ||
      !prevFilters.selectedSegments.every(s => selectedSegments.includes(s)) ||
      !prevFilters.selectedCountries.every(c => selectedCountries.includes(c))
    ) {
      goToPage(1);
      prevFiltersRef.current = { searchTerm, selectedSegments, selectedCountries };
    }
  }, [searchTerm, selectedSegments, selectedCountries, goToPage]);

  const getSegmentVariant = (segment: string) => {
    switch (segment) {
      case 'VIP': return 'success';
      case 'Loyal': return 'warning';
      case 'ChurnRisk': return 'error';
      default: return 'default';
    }
  };

  const getSegmentLabel = (segment: string) => {
    return t(`customers.segments.${segment}`, segment);
  };

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: t('customers.columns.name'),
      sortable: true
    },
    {
      key: 'email',
      header: t('customers.columns.email'),
      sortable: true
    },
    {
      key: 'country',
      header: t('customers.columns.country'),
      sortable: true
    },
    {
      key: 'ltv',
      header: t('customers.columns.ltv'),
      sortable: true,
      render: (value) => formatCurrency(Number(value))
    },
    {
      key: 'lastActive',
      header: t('customers.columns.lastActive'),
      sortable: true,
      render: (value) => formatDate(String(value))
    },
    {
      key: 'segment',
      header: t('customers.columns.segment'),
      sortable: true,
      render: (value) => (
        <Badge variant={getSegmentVariant(String(value))}>
          {getSegmentLabel(String(value))}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('customers.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('customers.subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('customers.searchPlaceholder')}
          />
        </div>
        <div className="flex gap-2">
          <FilterDropdown
            label={t('customers.filters.segment')}
            options={segmentOptions}
            selectedValues={selectedSegments}
            onChange={setSelectedSegments}
          />
          <FilterDropdown
            label={t('customers.filters.country')}
            options={countryOptions}
            selectedValues={selectedCountries}
            onChange={setSelectedCountries}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {(searchTerm || selectedSegments.length > 0 || selectedCountries.length > 0) 
            ? t('customers.showingResultsFiltered', { filtered: filteredData.length, total: data.length })
            : t('customers.showingResults', { count: filteredData.length })
          }
        </p>
        {(searchTerm || selectedSegments.length > 0 || selectedCountries.length > 0) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSegments([]);
              setSelectedCountries([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t('customers.clearFilters')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <DataTable
          data={paginatedData}
          columns={columns}
          emptyMessage={
            searchTerm || selectedSegments.length > 0 || selectedCountries.length > 0
              ? t('customers.noFilterResults')
              : t('customers.noDataFound')
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