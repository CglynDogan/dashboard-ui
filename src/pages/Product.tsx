import { useState, useMemo } from 'react';
import { 
  CubeIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  TagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatCurrency } from '../lib/format';

// Mock product data
const products = [
  {
    id: 'PROD-001',
    name: 'Nexus Pro Dashboard',
    description: 'Professional analytics dashboard with advanced features',
    category: 'Software',
    price: 99.99,
    stock: 150,
    status: 'active',
    sales: 1250,
    revenue: 124875.00,
    createdAt: '2024-01-01T08:00:00Z',
    image: '📊'
  },
  {
    id: 'PROD-002',
    name: 'Analytics Module',
    description: 'Advanced analytics and reporting module',
    category: 'Add-on',
    price: 49.99,
    stock: 85,
    status: 'active',
    sales: 850,
    revenue: 42491.50,
    createdAt: '2024-01-05T10:30:00Z',
    image: '📈'
  },
  {
    id: 'PROD-003',
    name: 'Enterprise License',
    description: 'Full enterprise license with unlimited users',
    category: 'License',
    price: 299.99,
    stock: 25,
    status: 'active',
    sales: 180,
    revenue: 53998.20,
    createdAt: '2024-01-10T14:15:00Z',
    image: '🏢'
  },
  {
    id: 'PROD-004',
    name: 'Mobile App',
    description: 'Companion mobile application',
    category: 'Software',
    price: 29.99,
    stock: 0,
    status: 'out-of-stock',
    sales: 2100,
    revenue: 62979.00,
    createdAt: '2024-01-12T09:45:00Z',
    image: '📱'
  },
  {
    id: 'PROD-005',
    name: 'Integration Pack',
    description: 'Third-party integrations bundle',
    category: 'Add-on',
    price: 79.99,
    stock: 45,
    status: 'limited',
    sales: 320,
    revenue: 25596.80,
    createdAt: '2024-01-15T16:20:00Z',
    image: '🔗'
  }
];

const categories = ['All', 'Software', 'Add-on', 'License'];

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock' | 'limited';
  sales: number;
  revenue: number;
  createdAt: string;
  image: string;
}

export default function Product() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus] = useState<string[]>([]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      const matchesStatus = selectedStatus.length === 0 || 
        selectedStatus.includes(product.status);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Calculate totals
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="default">Inactive</Badge>;
      case 'out-of-stock':
        return <Badge variant="error">Out of Stock</Badge>;
      case 'limited':
        return <Badge variant="warning">Limited Stock</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStockIndicator = (stock: number, status: string) => {
    if (status === 'out-of-stock') {
      return <span className="text-nexus-error font-medium">0</span>;
    }
    if (stock <= 10) {
      return <span className="text-nexus-warning font-medium">{stock}</span>;
    }
    return <span className="text-nexus-success font-medium">{stock}</span>;
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <CubeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Product</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your products and inventory</p>
              </div>
            </div>
            <button className="btn-nexus-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CubeIcon className="w-5 h-5 text-nexus-info" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalProducts}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 8.5%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>

          {/* Active Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <TagIcon className="w-5 h-5 text-nexus-success" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {activeProducts}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{Math.round((activeProducts / totalProducts) * 100)}% of total</span>
              </div>
            </div>
          </Card>

          {/* Total Sales */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ChartBarIcon className="w-5 h-5 text-nexus-purple" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalSales.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 15.2%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>

          {/* Total Revenue */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CubeIcon className="w-5 h-5 text-nexus-teal" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 22.1%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                More Filters
              </button>
            </div>
          </div>
        </Card>

        {/* Products Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Products ({filteredProducts.length})
            </h3>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-nexus-info hover:underline">
                Export
              </button>
              <button className="text-sm text-nexus-info hover:underline">
                Import
              </button>
            </div>
          </div>

          <div className="text-center py-12">
            <CubeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Product List</h3>
            <p className="text-gray-500 dark:text-gray-400">Data table coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  );
}