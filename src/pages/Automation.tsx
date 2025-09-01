import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CogIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  PlayIcon,
  PauseIcon,
  PencilIcon,
  TrashIcon,
  BoltIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatDate } from '../lib/format';

// Mock automation workflows
const workflows = [
  {
    id: 'WF-001',
    name: 'Welcome Email Sequence',
    description: 'Send automated welcome emails to new customers',
    status: 'active',
    type: 'Email Marketing',
    trigger: 'New Customer Registration',
    actions: 3,
    runs: 1250,
    successRate: 98.5,
    lastRun: '2024-01-31T14:30:00Z',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'WF-002',
    name: 'Invoice Payment Reminder',
    description: 'Automatically send reminders for overdue invoices',
    status: 'active',
    type: 'Billing',
    trigger: 'Invoice Overdue',
    actions: 2,
    runs: 450,
    successRate: 95.2,
    lastRun: '2024-01-31T09:15:00Z',
    createdAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'WF-003',
    name: 'Lead Scoring Update',
    description: 'Update lead scores based on customer interactions',
    status: 'draft',
    type: 'CRM',
    trigger: 'Customer Activity',
    actions: 5,
    runs: 0,
    successRate: 0,
    lastRun: null,
    createdAt: '2024-01-25T11:45:00Z'
  },
  {
    id: 'WF-004',
    name: 'Subscription Renewal Alert',
    description: 'Send renewal notifications before subscription expires',
    status: 'paused',
    type: 'Subscription',
    trigger: 'Subscription Near Expiry',
    actions: 4,
    runs: 180,
    successRate: 92.8,
    lastRun: '2024-01-30T16:20:00Z',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: 'WF-005',
    name: 'Product Recommendation',
    description: 'Send personalized product recommendations',
    status: 'active',
    type: 'E-commerce',
    trigger: 'Purchase Complete',
    actions: 3,
    runs: 890,
    successRate: 87.3,
    lastRun: '2024-01-31T12:45:00Z',
    createdAt: '2024-01-18T14:20:00Z'
  }
];

const templates = [
  {
    id: 'TPL-001',
    name: 'Email Marketing Campaign',
    description: 'Multi-step email marketing automation',
    category: 'Marketing',
    icon: '📧',
    popular: true
  },
  {
    id: 'TPL-002',
    name: 'Customer Onboarding',
    description: 'Streamline new customer onboarding process',
    category: 'Customer Success',
    icon: '👋',
    popular: true
  },
  {
    id: 'TPL-003',
    name: 'Lead Qualification',
    description: 'Automatically qualify and score leads',
    category: 'Sales',
    icon: '🎯',
    popular: false
  },
  {
    id: 'TPL-004',
    name: 'Support Ticket Routing',
    description: 'Route support tickets to appropriate teams',
    category: 'Support',
    icon: '🎫',
    popular: false
  },
  {
    id: 'TPL-005',
    name: 'Inventory Management',
    description: 'Automate inventory tracking and alerts',
    category: 'Operations',
    icon: '📦',
    popular: true
  },
  {
    id: 'TPL-006',
    name: 'Social Media Posting',
    description: 'Schedule and publish social media content',
    category: 'Marketing',
    icon: '📱',
    popular: false
  }
];

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft' | 'error';
  type: string;
  trigger: string;
  actions: number;
  runs: number;
  successRate: number;
  lastRun: string | null;
  createdAt: string;
}

export default function Automation() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'workflows' | 'templates'>('workflows');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayIcon className="w-4 h-4 text-nexus-success" />;
      case 'paused':
        return <PauseIcon className="w-4 h-4 text-nexus-warning" />;
      case 'draft':
        return <ClockIcon className="w-4 h-4 text-gray-400" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-4 h-4 text-nexus-error" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'paused':
        return <Badge variant="warning">Paused</Badge>;
      case 'draft':
        return <Badge variant="default">Draft</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const activeWorkflows = workflows.filter(w => w.status === 'active');
  const totalRuns = workflows.reduce((sum, w) => sum + w.runs, 0);
  const avgSuccessRate = workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br rounded-xl shadow-lg" style={{background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)'}}>
                <CogIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Automation</h1>
                  <Badge variant="primary">BETA</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Automate your workflows and processes</p>
              </div>
            </div>
            <button className="btn-nexus-primary flex items-center space-x-2">
              <PlusIcon className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Workflows */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CogIcon className="w-5 h-5 text-nexus-primary" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Workflows</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {workflows.length}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 25%</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>

          {/* Active Workflows */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <PlayIcon className="w-5 h-5 text-nexus-success" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {activeWorkflows.length}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Running smoothly</span>
              </div>
            </div>
          </Card>

          {/* Total Runs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <BoltIcon className="w-5 h-5 text-nexus-warning" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Runs</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalRuns.toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 18%</span>
                <span className="text-sm text-gray-500">this month</span>
              </div>
            </div>
          </Card>

          {/* Success Rate */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-nexus-teal" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {avgSuccessRate.toFixed(1)}%
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Excellent performance</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('workflows')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'workflows'
                ? 'bg-white dark:bg-gray-700 text-nexus-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            My Workflows
          </button>
          <button
            onClick={() => setSelectedTab('templates')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'templates'
                ? 'bg-white dark:bg-gray-700 text-nexus-primary shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Templates
          </button>
        </div>

        {selectedTab === 'workflows' ? (
          /* Workflows Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(workflow.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{workflow.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(workflow.status)}
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <EllipsisHorizontalIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                    <Badge variant="secondary">{workflow.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Trigger:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{workflow.trigger}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Actions:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{workflow.actions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Runs:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{workflow.runs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate:</span>
                    <span className="text-sm font-medium text-nexus-success">{workflow.successRate}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {workflow.lastRun ? `Last run: ${formatDate(workflow.lastRun)}` : 'Never run'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-nexus-primary">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-nexus-success">
                      <PlayIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-nexus-error">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Templates Grid */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workflow Templates</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button key={template.id} type="button" className="text-left w-full">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{template.icon}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{template.name}</h4>
                          {template.popular && (
                            <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>

                  <div className="flex items-center justify-between">
                    {template.popular && (
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Popular</span>
                      </div>
                    )}
                    <button className="btn-nexus-primary text-sm flex items-center space-x-1">
                      <span>Use Template</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}