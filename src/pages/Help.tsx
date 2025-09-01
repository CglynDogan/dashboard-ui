import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ArrowRightIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

// Mock help data
const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '🚀',
    questions: [
      { id: 1, question: 'How do I create my first dashboard?', views: 1250 },
      { id: 2, question: 'How to invite team members?', views: 890 },
      { id: 3, question: 'Setting up integrations', views: 756 },
      { id: 4, question: 'Understanding the interface', views: 654 },
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Subscriptions',
    icon: '💳',
    questions: [
      { id: 5, question: 'How to upgrade my plan?', views: 2100 },
      { id: 6, question: 'Payment methods and billing cycle', views: 1450 },
      { id: 7, question: 'Refund and cancellation policy', views: 980 },
      { id: 8, question: 'Understanding usage limits', views: 670 },
    ],
  },
  {
    id: 'features',
    name: 'Features & Functionality',
    icon: '⚙️',
    questions: [
      { id: 9, question: 'Advanced analytics features', views: 1890 },
      { id: 10, question: 'Custom dashboard creation', views: 1456 },
      { id: 11, question: 'Data export and reporting', views: 1200 },
      { id: 12, question: 'API integration guide', views: 890 },
    ],
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    icon: '🔧',
    questions: [
      { id: 13, question: 'Login and authentication issues', views: 2340 },
      { id: 14, question: 'Data not syncing properly', views: 1670 },
      { id: 15, question: 'Performance and loading issues', views: 1120 },
      { id: 16, question: 'Browser compatibility problems', views: 890 },
    ],
  },
];

const quickActions = [
  {
    id: 'live-chat',
    name: 'Live Chat',
    description: 'Chat with our support team',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-nexus-primary',
    available: true,
    response: '< 2 min',
  },
  {
    id: 'schedule-demo',
    name: 'Schedule Demo',
    description: 'Book a personalized demo',
    icon: VideoCameraIcon,
    color: 'bg-nexus-teal',
    available: true,
    response: 'Next available: Today 3:00 PM',
  },
  {
    id: 'email-support',
    name: 'Email Support',
    description: 'Send us a detailed message',
    icon: EnvelopeIcon,
    color: 'bg-nexus-info',
    available: true,
    response: '< 4 hours',
  },
  {
    id: 'phone-support',
    name: 'Phone Support',
    description: 'Call our support hotline',
    icon: PhoneIcon,
    color: 'bg-nexus-warning',
    available: false,
    response: 'Available Mon-Fri 9AM-6PM EST',
  },
];

const resources = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Comprehensive guides and API references',
    icon: BookOpenIcon,
    articles: 156,
    updated: '2024-01-30T10:00:00Z',
  },
  {
    id: 'video-tutorials',
    name: 'Video Tutorials',
    description: 'Step-by-step video guides',
    icon: VideoCameraIcon,
    articles: 45,
    updated: '2024-01-28T15:30:00Z',
  },
  {
    id: 'release-notes',
    name: 'Release Notes',
    description: 'Latest updates and feature announcements',
    icon: DocumentTextIcon,
    articles: 24,
    updated: '2024-01-31T09:00:00Z',
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    description: 'Tips and recommendations from experts',
    icon: StarIcon,
    articles: 38,
    updated: '2024-01-29T14:20:00Z',
  },
];

const recentUpdates = [
  {
    id: 1,
    title: 'New Analytics Dashboard Released',
    type: 'feature',
    date: '2024-01-31T09:00:00Z',
    summary: 'Enhanced analytics with real-time data visualization',
  },
  {
    id: 2,
    title: 'API Rate Limits Updated',
    type: 'update',
    date: '2024-01-30T14:00:00Z',
    summary: 'Increased rate limits for Pro and Enterprise plans',
  },
  {
    id: 3,
    title: 'Security Enhancement: 2FA Required',
    type: 'security',
    date: '2024-01-29T10:00:00Z',
    summary: 'Two-factor authentication now mandatory for all accounts',
  },
];

export default function Help() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredQuestions =
    selectedCategory === 'all'
      ? faqCategories.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.name })))
      : faqCategories.find(cat => cat.id === selectedCategory)?.questions || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <CheckCircleIcon className="w-4 h-4 text-nexus-success" />;
      case 'update':
        return <ClockIcon className="w-4 h-4 text-nexus-info" />;
      case 'security':
        return <LifebuoyIcon className="w-4 h-4 text-nexus-warning" />;
      default:
        return <DocumentTextIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="p-2 bg-gradient-to-br rounded-xl shadow-lg"
                style={{ background: 'linear-gradient(135deg, #5347CE 0%, #887CFD 100%)' }}
              >
                <LifebuoyIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Help & Support
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find answers and get help when you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <Card className="p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              How can we help you?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Search our knowledge base or get in touch with support
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-nexus-primary focus:border-transparent"
            />
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(action => (
              <button
                key={action.id}
                type="button"
                className="text-left w-full"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`p-3 ${action.color} rounded-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{action.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {action.available ? (
                      <Badge variant="success">Available</Badge>
                    ) : (
                      <Badge variant="default">Offline</Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {action.response}
                  </span>
                </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Categories</option>
                  {faqCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-6">
                {faqCategories.map(category => (
                  <div key={category.id}>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{category.icon}</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h4>
                    </div>
                    <div className="space-y-2 ml-11">
                      {category.questions.slice(0, 4).map(question => (
                        <button
                          key={question.id}
                          type="button"
                          className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer w-full text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">
                              {question.question}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {question.views.toLocaleString()} views
                            </span>
                            <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <div className="space-y-4">
                {resources.map(resource => (
                  <button
                    key={resource.id}
                    type="button"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer w-full text-left"
                  >
                    <resource.icon className="w-5 h-5 text-nexus-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {resource.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.articles} articles
                      </div>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Recent Updates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Updates
              </h3>
              <div className="space-y-4">
                {recentUpdates.map(update => (
                  <div key={update.id} className="border-l-4 border-nexus-primary pl-4">
                    <div className="flex items-start space-x-2">
                      {getTypeIcon(update.type)}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {update.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {update.summary}
                        </p>
                        <span className="text-xs text-gray-400">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-nexus-info hover:underline">
                View all updates
              </button>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-sm text-nexus-info">info@cglyndogan.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Phone</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Support Hours
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Mon-Fri 9AM-6PM EST
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
