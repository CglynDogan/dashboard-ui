import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  CheckCircleIcon,
  XMarkIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import DataTable, { type Column } from '../components/ui/DataTable';
import { formatCurrency, formatDate } from '../lib/format';

// Mock data for payments
const recentTransactions = [
  {
    id: 'PAY-001',
    amount: 2459.00,
    currency: 'USD',
    status: 'completed',
    method: 'Credit Card',
    description: 'Subscription Payment - Pro Plan',
    date: '2024-01-15T10:30:00Z',
    customer: 'John Doe'
  },
  {
    id: 'PAY-002',
    amount: 1200.00,
    currency: 'USD',
    status: 'pending',
    method: 'Bank Transfer',
    description: 'Invoice Payment #INV-2024-001',
    date: '2024-01-14T14:20:00Z',
    customer: 'Tech Corp Inc.'
  },
  {
    id: 'PAY-003',
    amount: 899.00,
    currency: 'USD',
    status: 'failed',
    method: 'Credit Card',
    description: 'Subscription Renewal',
    date: '2024-01-14T09:15:00Z',
    customer: 'Sarah Johnson'
  },
  {
    id: 'PAY-004',
    amount: 3200.00,
    currency: 'USD',
    status: 'completed',
    method: 'PayPal',
    description: 'Enterprise Plan Upgrade',
    date: '2024-01-13T16:45:00Z',
    customer: 'Global Solutions Ltd.'
  }
];

const paymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    name: 'Visa ending in 4242',
    isDefault: true,
    expiry: '12/2027',
    icon: '💳'
  },
  {
    id: 2,
    type: 'Bank Account',
    name: 'Chase Bank ****1234',
    isDefault: false,
    expiry: null,
    icon: '🏦'
  },
  {
    id: 3,
    type: 'PayPal',
    name: 'john.doe@example.com',
    isDefault: false,
    expiry: null,
    icon: '💰'
  }
];

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  description: string;
  date: string;
  customer: string;
}

export default function Payment() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return recentTransactions.filter(transaction => {
      const matchesSearch = searchTerm === '' || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus.length === 0 || 
        selectedStatus.includes(transaction.status);

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  // Calculate totals
  const totalRevenue = recentTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = recentTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const failedAmount = recentTransactions
    .filter(t => t.status === 'failed')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const transactionColumns: Column<Transaction>[] = [
    {
      header: 'Transaction ID',
      accessorKey: 'id',
      cell: ({ row }) => (
        <div className="font-medium text-nexus-primary">{row.original.id}</div>
      ),
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <div className="font-semibold">
          {formatCurrency(row.original.amount)}
        </div>
      ),
    },
    {
      header: 'Customer',
      accessorKey: 'customer',
      cell: ({ row }) => (
        <div className="text-gray-900 dark:text-white">{row.original.customer}</div>
      ),
    },
    {
      header: 'Method',
      accessorKey: 'method',
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-400">{row.original.method}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }) => (
        <div className="text-gray-600 dark:text-gray-400">
          {formatDate(row.original.date)}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage payments and billing</p>
              </div>
            </div>
            <button className="btn-nexus-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Add Payment Method</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Revenue */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-nexus-success" />
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
                <span className="text-sm font-medium text-nexus-success">↗ 12.5%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>

          {/* Pending Payments */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CalendarDaysIcon className="w-5 h-5 text-nexus-warning" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(pendingAmount)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-warning">⏳ Processing</span>
              </div>
            </div>
          </Card>

          {/* Failed Payments */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <XMarkIcon className="w-5 h-5 text-nexus-error" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(failedAmount)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-error">↘ Requires attention</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
                <button className="text-sm text-nexus-info hover:underline">
                  View All
                </button>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <DataTable
                data={filteredTransactions}
                columns={transactionColumns}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                pageSize={5}
              />
            </Card>
          </div>

          {/* Payment Methods */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h3>
                <button className="text-sm text-nexus-info hover:underline">
                  <PlusIcon className="w-4 h-4 inline mr-1" />
                  Add New
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{method.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{method.type}</div>
                          {method.expiry && (
                            <div className="text-xs text-gray-400">Expires {method.expiry}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <Badge variant="primary">Default</Badge>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <EllipsisHorizontalIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Security Info */}
            <Card className="p-6 mt-6">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-nexus-success" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-nexus-success" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-nexus-success" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-nexus-success" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fraud Protection</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}