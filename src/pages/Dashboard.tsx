import { memo, useState } from 'react';
import { 
  EyeIcon, 
  CurrencyDollarIcon, 
  ArrowTopRightOnSquareIcon,
  UserGroupIcon,
  FunnelIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import Card from '../components/ui/Card';
import { formatCurrency, formatNumber } from '../lib/format';

// Chart data based on the design
const salesOverviewData = [
  { name: 'Oct', China: 2988.20, UE: 2200, USA: 1800, Canada: 1500, Other: 1200 },
  { name: 'Nov', China: 1765.09, UE: 1600, USA: 1400, Canada: 1200, Other: 1000 },
  { name: 'Dec', China: 4005.65, UE: 3200, USA: 2800, Canada: 2400, Other: 2000 }
];

const salesDistributionData = [
  { name: 'Website', value: 374.82, color: '#5347CE' },
  { name: 'Mobile App', value: 241.60, color: '#16C8C7' },
  { name: 'Other', value: 213.42, color: '#887CFD' }
];

const integrations = [
  {
    id: 1,
    name: 'Stripe',
    type: 'Finance',
    rate: 40,
    profit: 650.00,
    icon: 'S',
    iconColor: '#635BFF',
    color: '#5347CE'
  },
  {
    id: 2,
    name: 'Zapier',
    type: 'CRM',
    rate: 80,
    profit: 720.50,
    icon: '⚡',
    iconColor: '#FF4A00',
    color: '#5347CE'
  },
  {
    id: 3,
    name: 'Shopify',
    type: 'Marketplace',
    rate: 20,
    profit: 432.25,
    icon: 'S',
    iconColor: '#95BF47',
    color: '#887CFD'
  },
  {
    id: 4,
    name: 'Zoom',
    type: 'Technology',
    rate: 60,
    profit: 650.00,
    icon: 'Z',
    iconColor: '#2D8CFF',
    color: '#5347CE'
  }
];

const Dashboard = memo(() => {
  // const { t } = useTranslation();
  const [showTableFallbacks, setShowTableFallbacks] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Oct 18 - Nov 18</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <span>Monthly</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <FunnelIcon className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Page Views */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="5" r="1.5"/>
                  <circle cx="10" cy="10" r="1.5"/>
                  <circle cx="10" cy="15" r="1.5"/>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatNumber(12450)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 15.8%</span>
              </div>
            </div>
          </Card>

          {/* Total Revenue */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="5" r="1.5"/>
                  <circle cx="10" cy="10" r="1.5"/>
                  <circle cx="10" cy="15" r="1.5"/>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(363.95)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-error">↘ 34.0%</span>
              </div>
            </div>
          </Card>

          {/* Bounce Rate */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bounce Rate</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="5" r="1.5"/>
                  <circle cx="10" cy="10" r="1.5"/>
                  <circle cx="10" cy="15" r="1.5"/>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">86.5%</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-nexus-success">↗ 24.2%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Overview */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg">
                  <FunnelIcon className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg">
                  <span>Sort</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(9257.51)}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-medium text-nexus-success">15.8% ↗</span>
                <span className="text-sm text-gray-500">+ $143.50 increased</span>
              </div>
            </div>
            <div className="h-64">
              <div id="sales-overview-title" className="sr-only">Sales Overview Bar Chart</div>
              <div id="sales-overview-desc" className="sr-only">
                Stacked bar chart showing sales data for China, EU, USA, Canada and Other regions across October, November and December. 
                October: China $2,988.20, EU $2,200, USA $1,800, Canada $1,500, Other $1,200. 
                November: China $1,765.09, EU $1,600, USA $1,400, Canada $1,200, Other $1,000. 
                December: China $4,005.65, EU $3,200, USA $2,800, Canada $2,400, Other $2,000.
              </div>
              <div 
                role="img" 
                aria-labelledby="sales-overview-title"
                aria-describedby="sales-overview-desc"
                tabIndex={0}
                className="focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:ring-offset-2 rounded-lg h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesOverviewData} barGap={10}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="China" stackId="a" fill="#5347CE" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="UE" stackId="a" fill="#4896FE" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="USA" stackId="a" fill="#887CFD" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Canada" stackId="a" fill="#16C8C7" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Other" stackId="a" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#5347CE'}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">China</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#4896FE'}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">UE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#887CFD'}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">USA</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#16C8C7'}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Canada</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#94A3B8'}}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Other</span>
              </div>
            </div>
          </Card>

          {/* Total Subscriber */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <UserGroupIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Subscriber</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Weekly</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="mb-6">
              <div className="text-3xl font-semibold text-gray-900 dark:text-white">
                {formatNumber(24473)}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-medium text-nexus-success">8.3% ↗</span>
                <span className="text-sm text-gray-500">+749 increased</span>
              </div>
            </div>
            {/* Weekly bar chart */}
            <div className="space-y-4">
              <div 
                role="img" 
                aria-labelledby="subscriber-chart-title"
                aria-describedby="subscriber-chart-desc"
                tabIndex={0}
                className="focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:ring-offset-2 rounded-lg p-2"
              >
                <div id="subscriber-chart-title" className="sr-only">Weekly Subscriber Growth Chart</div>
                <div id="subscriber-chart-desc" className="sr-only">
                  Bar chart showing weekly subscriber data: Sunday 500 subscribers, Monday 875, Tuesday 1125, Wednesday 625, Thursday 2000, Friday 750, Saturday 375. Total current week: 3,874 subscribers.
                </div>
                <div className="flex items-end justify-between h-32 px-4">
                  {[
                    {day: 'Sun', height: 20, label: 'Sun', value: 500},
                    {day: 'Mon', height: 35, label: 'Mon', value: 875},
                    {day: 'Tue', height: 45, label: 'Tue', value: 1125},
                    {day: 'Wed', height: 25, label: 'Wed', value: 625},
                    {day: 'Thu', height: 80, label: 'Thu', value: 2000},
                    {day: 'Fri', height: 30, label: 'Fri', value: 750},
                    {day: 'Sat', height: 15, label: 'Sat', value: 375}
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-6 rounded-t-lg" 
                        style={{ 
                          backgroundColor: '#5347CE', 
                          height: `${item.height}px`,
                          minHeight: '8px'
                        }}
                        aria-label={`${item.day}: ${item.value} subscribers`}
                        title={`${item.day}: ${item.value} subscribers`}
                      ></div>
                      <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                3,874
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Distribution</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Monthly</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Website</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(374.82)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mobile App</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(241.60)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Other</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(213.42)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32">
                <div id="distribution-chart-title" className="sr-only">Sales Distribution Pie Chart</div>
                <div id="distribution-chart-desc" className="sr-only">
                  Pie chart showing sales distribution: Website $374.82 (45%), Mobile App $241.60 (29%), Other $213.42 (26%). Total sales: $829.84.
                </div>
                <div 
                  role="img" 
                  aria-labelledby="distribution-chart-title"
                  aria-describedby="distribution-chart-desc"
                  tabIndex={0}
                  className="focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:ring-offset-2 rounded-lg h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {salesDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>

          {/* List of Integration */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">List of Integration</h3>
              </div>
              <button className="text-sm text-nexus-info hover:underline">
                See All
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700">
                <span>APPLICATION</span>
                <span>TYPE</span>
                <span>RATE</span>
                <span>PROFIT</span>
              </div>
              {integrations.map((integration) => (
                <div key={integration.id} className="grid grid-cols-4 gap-4 py-3 items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4 text-nexus-primary border-gray-300 rounded" />
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                        style={{ backgroundColor: integration.iconColor }}
                      >
                        {integration.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {integration.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {integration.type}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${integration.rate}%`,
                          backgroundColor: integration.color 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {integration.rate}%
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(integration.profit)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Accessibility: Chart Data Tables Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowTableFallbacks(!showTableFallbacks)}
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-nexus-primary"
            aria-expanded={showTableFallbacks}
          >
            {showTableFallbacks ? 'Hide' : 'Show'} Chart Data Tables
          </button>
        </div>

        {/* Chart Data Tables - Alternative representation for screen readers */}
        {showTableFallbacks && (
          <div className="mt-8 space-y-8" role="region" aria-label="Chart data in table format">
            {/* Sales Overview Data Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sales Overview Data
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
                  <caption className="sr-only">
                    Sales data by region across three months: October, November, December
                  </caption>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Month
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        China
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        EU
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        USA
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Canada
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Other
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesOverviewData.map((row, index) => {
                      const total = row.China + row.UE + row.USA + row.Canada + row.Other;
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                            {row.name}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                            {formatCurrency(row.China)}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                            {formatCurrency(row.UE)}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                            {formatCurrency(row.USA)}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                            {formatCurrency(row.Canada)}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                            {formatCurrency(row.Other)}
                          </td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                            {formatCurrency(total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Weekly Subscriber Data Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Weekly Subscriber Data
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
                  <caption className="sr-only">
                    Weekly subscriber counts for each day of the week
                  </caption>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Day
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Subscribers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {day: 'Sunday', value: 500},
                      {day: 'Monday', value: 875},
                      {day: 'Tuesday', value: 1125},
                      {day: 'Wednesday', value: 625},
                      {day: 'Thursday', value: 2000},
                      {day: 'Friday', value: 750},
                      {day: 'Saturday', value: 375}
                    ].map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                          {row.day}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                          {formatNumber(row.value)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-medium">
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold text-gray-900 dark:text-white">
                        Weekly Total
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                        3,874
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Sales Distribution Data Table */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sales Distribution Data
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
                  <caption className="sr-only">
                    Sales distribution across different channels with values and percentages
                  </caption>
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                        Channel
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Sales Amount
                      </th>
                      <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-medium text-gray-900 dark:text-white">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const total = salesDistributionData.reduce((sum, item) => sum + item.value, 0);
                      return salesDistributionData.map((row, index) => {
                        const percentage = ((row.value / total) * 100).toFixed(1);
                        return (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                              {row.name}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                              {formatCurrency(row.value)}
                            </td>
                            <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right text-gray-900 dark:text-white">
                              {percentage}%
                            </td>
                          </tr>
                        );
                      });
                    })()}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-medium">
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-semibold text-gray-900 dark:text-white">
                        Total
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(salesDistributionData.reduce((sum, item) => sum + item.value, 0))}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">
                        100.0%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;