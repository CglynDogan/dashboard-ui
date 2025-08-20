import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable, { type Column } from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import SearchInput from '../components/filters/SearchInput';
import FilterDropdown from '../components/filters/FilterDropdown';
import Pagination from '../components/ui/Pagination';
import StockLevelIndicator from '../components/widgets/StockLevelIndicator';
import { usePagination } from '../hooks/usePagination';
import { formatCurrency } from '../lib/format';
import { type InventoryProduct } from '../types';
import inventoryData from '../data/inventory.json';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

export default function Inventory() {
  const { t } = useTranslation();
  const [products] = useState<InventoryProduct[]>(inventoryData.products as InventoryProduct[]);
  // const [suppliers] = useState<Supplier[]>(inventoryData.suppliers as Supplier[]);
  // const [warehouses] = useState<Warehouse[]>(inventoryData.warehouses as Warehouse[]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Filter options
  const statusOptions = [
    { value: 'Stokta', label: t('inventory.statuses.Stokta') },
    { value: 'Düşük Stok', label: t('inventory.statuses.Düşük Stok') },
    { value: 'Kritik Düşük', label: t('inventory.statuses.Kritik Düşük') },
    { value: 'Stok Yok', label: t('inventory.statuses.Stok Yok') },
    { value: 'Fazla Stok', label: t('inventory.statuses.Fazla Stok') }
  ];

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.map(category => ({ value: category, label: category }));
  }, [products]);

  const supplierOptions = useMemo(() => {
    const supplierNames = [...new Set(products.map(product => product.supplier))];
    return supplierNames.map(supplier => ({ value: supplier, label: supplier }));
  }, [products]);

  const locationOptions = useMemo(() => {
    const locations = [...new Set(products.map(product => product.location))];
    return locations.map(location => ({ value: location, label: location }));
  }, [products]);

  // Filtered data
  const filteredData = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(product.status);

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      const matchesSupplier = selectedSuppliers.length === 0 || 
        selectedSuppliers.includes(product.supplier);

      const matchesLocation = selectedLocations.length === 0 || 
        selectedLocations.includes(product.location);

      return matchesSearch && matchesStatus && matchesCategory && matchesSupplier && matchesLocation;
    });
  }, [products, searchTerm, selectedStatuses, selectedCategories, selectedSuppliers, selectedLocations]);

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
  const prevFiltersRef = useRef({ searchTerm, selectedStatuses, selectedCategories, selectedSuppliers, selectedLocations });
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.searchTerm !== searchTerm ||
      prevFilters.selectedStatuses.length !== selectedStatuses.length ||
      prevFilters.selectedCategories.length !== selectedCategories.length ||
      prevFilters.selectedSuppliers.length !== selectedSuppliers.length ||
      prevFilters.selectedLocations.length !== selectedLocations.length ||
      !prevFilters.selectedStatuses.every(s => selectedStatuses.includes(s)) ||
      !prevFilters.selectedCategories.every(c => selectedCategories.includes(c)) ||
      !prevFilters.selectedSuppliers.every(s => selectedSuppliers.includes(s)) ||
      !prevFilters.selectedLocations.every(l => selectedLocations.includes(l))
    ) {
      goToPage(1);
      prevFiltersRef.current = { searchTerm, selectedStatuses, selectedCategories, selectedSuppliers, selectedLocations };
    }
  }, [searchTerm, selectedStatuses, selectedCategories, selectedSuppliers, selectedLocations, goToPage]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Stokta': return 'success';
      case 'Düşük Stok': return 'warning';
      case 'Kritik Düşük': return 'error';
      case 'Stok Yok': return 'error';
      case 'Fazla Stok': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Stokta': return <CheckCircleIcon className="w-4 h-4" />;
      case 'Düşük Stok': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'Kritik Düşük': return <XCircleIcon className="w-4 h-4" />;
      case 'Stok Yok': return <XCircleIcon className="w-4 h-4" />;
      case 'Fazla Stok': return <ArrowPathIcon className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`inventory.statuses.${status}`, status);
  };

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.status === 'Düşük Stok' || p.status === 'Kritik Düşük').length;
    const outOfStockProducts = products.filter(p => p.status === 'Stok Yok').length;
    const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.unitCost), 0);
    
    return {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalValue
    };
  }, [products]);

  const columns: Column<InventoryProduct>[] = [
    {
      key: 'name',
      header: t('inventory.columns.name'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            SKU: {row.sku}
          </div>
        </div>
      )
    },
    {
      key: 'category',
      header: t('inventory.columns.category'),
      sortable: true
    },
    {
      key: 'currentStock',
      header: t('inventory.columns.currentStock'),
      sortable: true,
      render: (_, row) => (
        <div className="w-32">
          <StockLevelIndicator product={row} />
        </div>
      )
    },
    {
      key: 'status',
      header: t('inventory.columns.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          <div className="flex items-center space-x-1">
            {getStatusIcon(value)}
            <span>{getStatusLabel(value)}</span>
          </div>
        </Badge>
      )
    },
    {
      key: 'supplier',
      header: t('inventory.columns.supplier'),
      sortable: true
    },
    {
      key: 'location',
      header: t('inventory.columns.location'),
      sortable: true
    },
    {
      key: 'unitPrice',
      header: t('inventory.columns.unitPrice'),
      sortable: true,
      render: (value) => formatCurrency(value)
    },
    {
      key: 'turnoverRate',
      header: t('inventory.columns.turnover'),
      sortable: true,
      render: (value) => `${value}x`
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('inventory.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('inventory.subtitle')}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Toplam Ürün
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {summaryStats.totalProducts}
              </p>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Düşük Stok Uyarısı
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {summaryStats.lowStockProducts}
              </p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Stok Tükendi
              </p>
              <p className="text-2xl font-bold text-red-600">
                {summaryStats.outOfStockProducts}
              </p>
            </div>
            <XCircleIcon className="w-8 h-8 text-red-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Toplam Stok Değeri
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(summaryStats.totalValue)}
              </p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('inventory.searchPlaceholder')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label={t('inventory.filters.status')}
            options={statusOptions}
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
          />
          <FilterDropdown
            label={t('inventory.filters.category')}
            options={categoryOptions}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
          />
          <FilterDropdown
            label={t('inventory.filters.supplier')}
            options={supplierOptions}
            selectedValues={selectedSuppliers}
            onChange={setSelectedSuppliers}
          />
          <FilterDropdown
            label={t('inventory.filters.location')}
            options={locationOptions}
            selectedValues={selectedLocations}
            onChange={setSelectedLocations}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {(searchTerm || selectedStatuses.length > 0 || selectedCategories.length > 0 || selectedSuppliers.length > 0 || selectedLocations.length > 0) 
            ? t('inventory.showingResultsFiltered', { filtered: filteredData.length, total: products.length })
            : t('inventory.showingResults', { count: filteredData.length })
          }
        </p>
        {(searchTerm || selectedStatuses.length > 0 || selectedCategories.length > 0 || selectedSuppliers.length > 0 || selectedLocations.length > 0) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatuses([]);
              setSelectedCategories([]);
              setSelectedSuppliers([]);
              setSelectedLocations([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t('inventory.clearFilters')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <DataTable
          data={paginatedData}
          columns={columns}
          emptyMessage={
            searchTerm || selectedStatuses.length > 0 || selectedCategories.length > 0 || selectedSuppliers.length > 0 || selectedLocations.length > 0
              ? t('inventory.noFilterResults')
              : t('inventory.noDataFound')
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