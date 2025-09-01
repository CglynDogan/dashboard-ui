import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DocumentTextIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PaperAirplaneIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatCurrency, formatDate } from '../lib/format';

// Mock invoice data
const invoices = [
  {
    id: 'INV-2024-001',
    customerName: 'Tech Corp Inc.',
    customerEmail: 'billing@techcorp.com',
    amount: 2459.00,
    status: 'paid',
    dueDate: '2024-02-15T00:00:00Z',
    issueDate: '2024-01-15T00:00:00Z',
    paidDate: '2024-01-18T10:30:00Z',
    items: [
      { name: 'Nexus Pro Dashboard', quantity: 1, price: 1999.00 },
      { name: 'Analytics Module', quantity: 2, price: 230.00 }
    ]
  },
  {
    id: 'INV-2024-002',
    customerName: 'Global Solutions Ltd.',
    customerEmail: 'accounts@globalsolutions.com',
    amount: 3200.00,
    status: 'pending',
    dueDate: '2024-02-20T00:00:00Z',
    issueDate: '2024-01-20T00:00:00Z',
    paidDate: null,
    items: [
      { name: 'Enterprise License', quantity: 1, price: 2999.00 },
      { name: 'Integration Pack', quantity: 1, price: 201.00 }
    ]
  },
  {
    id: 'INV-2024-003',
    customerName: 'StartUp Inc.',
    customerEmail: 'finance@startup.com',
    amount: 899.00,
    status: 'overdue',
    dueDate: '2024-01-25T00:00:00Z',
    issueDate: '2024-01-10T00:00:00Z',
    paidDate: null,
    items: [
      { name: 'Nexus Pro Dashboard', quantity: 1, price: 899.00 }
    ]
  },
  {
    id: 'INV-2024-004',
    customerName: 'Digital Agency Co.',
    customerEmail: 'billing@digitalagency.com',
    amount: 1500.00,
    status: 'draft',
    dueDate: '2024-02-25T00:00:00Z',
    issueDate: '2024-01-25T00:00:00Z',
    paidDate: null,
    items: [
      { name: 'Analytics Module', quantity: 5, price: 300.00 }
    ]
  },
  {
    id: 'INV-2024-005',
    customerName: 'Enterprise Corp',
    customerEmail: 'accounts@enterprise.com',
    amount: 4200.00,
    status: 'sent',
    dueDate: '2024-02-28T00:00:00Z',
    issueDate: '2024-01-28T00:00:00Z',
    paidDate: null,
    items: [
      { name: 'Enterprise License', quantity: 1, price: 2999.00 },
      { name: 'Analytics Module', quantity: 3, price: 400.00 },
      { name: 'Integration Pack', quantity: 1, price: 801.00 }
    ]
  }
];

interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  issueDate: string;
  paidDate: string | null;
  items: Array<{ name: string; quantity: number; price: number }>;
}

export default function Invoice() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = searchTerm === '' || 
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus.length === 0 || 
        selectedStatus.includes(invoice.status);

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  // Calculate totals
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid');
  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'sent');
  const overdueInvoices = invoices.filter(i => i.status === 'overdue');

  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'sent':
        return <Badge variant="info">Sent</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>;
      case 'draft':
        return <Badge variant="default">Draft</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'paid') return false;
    return new Date(dueDate) < new Date();
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Invoice</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage invoices</p>
              </div>
            </div>
            <button className="btn-nexus-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Invoices */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <DocumentTextIcon className="w-5 h-5 text-nexus-info" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalInvoices}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 12%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>

          {/* Paid Amount */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-nexus-success" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Paid</span>
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
                <span className="text-sm text-gray-500">{paidInvoices.length} invoices</span>
              </div>
            </div>
          </Card>

          {/* Pending Amount */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ClockIcon className="w-5 h-5 text-nexus-warning" />
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
                <span className="text-sm text-gray-500">{pendingInvoices.length} invoices</span>
              </div>
            </div>
          </Card>

          {/* Overdue Amount */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ExclamationTriangleIcon className="w-5 h-5 text-nexus-error" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(overdueAmount)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-error">Needs attention</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Invoices ({filteredInvoices.length})
            </h3>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-nexus-info hover:underline">
                Export
              </button>
              <button className="btn-nexus-secondary">
                Filter
              </button>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Invoice List</h3>
            <p className="text-gray-500 dark:text-gray-400">Data table coming soon</p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-nexus-primary rounded-lg">
                <PlusIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Create Invoice</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generate a new invoice</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-nexus-teal rounded-lg">
                <ArrowDownTrayIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Export Data</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download invoice reports</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-nexus-info rounded-lg">
                <PaperAirplaneIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Send Reminders</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Send overdue reminders</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}