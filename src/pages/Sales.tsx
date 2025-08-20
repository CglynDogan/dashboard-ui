import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable, { type Column } from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import SearchInput from '../components/filters/SearchInput';
import FilterDropdown from '../components/filters/FilterDropdown';
import ChartTypeSelector, { type ChartType } from '../components/charts/ChartTypeSelector';
import SalesChart from '../components/charts/SalesChart';
import { formatCurrency, formatDate } from '../lib/format';
import { type Sale } from '../types';
import salesData from '../data/sales.json';

export default function Sales() {
  const { t } = useTranslation();
  const [data] = useState<Sale[]>(salesData as Sale[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [chartType, setChartType] = useState<ChartType>('bar');

  // Filter options
  const regionOptions = [
    { value: 'EMEA', label: 'EMEA' },
    { value: 'AMER', label: 'AMER' },
    { value: 'APAC', label: 'APAC' }
  ];

  const channelOptions = [
    { value: 'Web', label: 'Web' },
    { value: 'Mobil', label: 'Mobil' },
    { value: 'Mağaza', label: 'Mağaza' }
  ];

  const productOptions = useMemo(() => {
    const products = [...new Set(data.map(sale => sale.product))];
    return products.map(product => ({ value: product, label: product }));
  }, [data]);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter(sale => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.channel.toLowerCase().includes(searchTerm.toLowerCase());

      // Region filter
      const matchesRegion = selectedRegions.length === 0 || 
        selectedRegions.includes(sale.region);

      // Channel filter
      const matchesChannel = selectedChannels.length === 0 || 
        selectedChannels.includes(sale.channel);

      // Product filter
      const matchesProduct = selectedProducts.length === 0 || 
        selectedProducts.includes(sale.product);

      return matchesSearch && matchesRegion && matchesChannel && matchesProduct;
    });
  }, [data, searchTerm, selectedRegions, selectedChannels, selectedProducts]);

  const columns: Column<Sale>[] = [
    {
      key: 'date',
      header: t('sales.columns.date'),
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'region',
      header: t('sales.columns.region'),
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'EMEA' ? 'success' : value === 'AMER' ? 'warning' : 'default'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'product',
      header: t('sales.columns.product'),
      sortable: true,
      render: (value) => t(`products.${value}`)
    },
    {
      key: 'channel',
      header: t('sales.columns.channel'),
      sortable: true,
      render: (value) => (
        <Badge variant="default">{t(`channels.${value}`)}</Badge>
      )
    },
    {
      key: 'revenue',
      header: t('sales.columns.revenue'),
      sortable: true,
      render: (value) => formatCurrency(value)
    },
    {
      key: 'units',
      header: t('sales.columns.units'),
      sortable: true
    }
  ];

  // Chart data (filtered)
  const chartData = filteredData.reduce((acc, sale) => {
    const existing = acc.find(item => item.region === sale.region);
    if (existing) {
      existing.revenue += sale.revenue;
    } else {
      acc.push({ region: sale.region, revenue: sale.revenue });
    }
    return acc;
  }, [] as { region: string; revenue: number }[]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('sales.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('sales.subtitle')}</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('sales.searchPlaceholder')}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            label={t('sales.filters.region')}
            options={regionOptions}
            selectedValues={selectedRegions}
            onChange={setSelectedRegions}
          />
          <FilterDropdown
            label={t('sales.filters.channel')}
            options={channelOptions}
            selectedValues={selectedChannels}
            onChange={setSelectedChannels}
          />
          <FilterDropdown
            label={t('sales.filters.product')}
            options={productOptions}
            selectedValues={selectedProducts}
            onChange={setSelectedProducts}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {(searchTerm || selectedRegions.length > 0 || selectedChannels.length > 0 || selectedProducts.length > 0) 
            ? t('sales.showingResultsFiltered', { filtered: filteredData.length, total: data.length })
            : t('sales.showingResults', { count: filteredData.length })
          }
        </p>
        {(searchTerm || selectedRegions.length > 0 || selectedChannels.length > 0 || selectedProducts.length > 0) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegions([]);
              setSelectedChannels([]);
              setSelectedProducts([]);
            }}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {t('sales.clearFilters')}
          </button>
        )}
      </div>

      {/* Chart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {filteredData.length !== data.length ? t('sales.chartTitleFiltered') : t('sales.chartTitle')}
          </h3>
          <ChartTypeSelector 
            selectedType={chartType}
            onTypeChange={setChartType}
          />
        </div>
        <SalesChart data={chartData} chartType={chartType} />
      </Card>

      {/* Data Table */}
      <Card>
        <DataTable
          data={filteredData}
          columns={columns}
          emptyMessage={
            searchTerm || selectedRegions.length > 0 || selectedChannels.length > 0 || selectedProducts.length > 0
              ? t('sales.noFilterResults')
              : t('sales.noDataFound')
          }
        />
      </Card>
    </div>
  );
}