import { NavLink } from 'react-router-dom';

// import { useTranslation } from 'react-i18next';
import {
  ChartPieIcon,
  ChatBubbleLeftEllipsisIcon,
  CogIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  LifebuoyIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  // const { t } = useTranslation();

  const navigationGeneral = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Payment', href: '/payment', icon: CreditCardIcon },
    { name: 'Customers', href: '/customers', icon: UsersIcon },
    { name: 'Message', href: '/messages', icon: ChatBubbleLeftEllipsisIcon, badge: 8 },
  ];

  const navigationTools = [
    { name: 'Product', href: '/product', icon: HomeIcon },
    { name: 'Invoice', href: '/invoice', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartPieIcon },
    { name: 'Automation', href: '/automation', icon: CogIcon, badge: 'BETA' },
  ];

  const navigationSupport = [
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Security', href: '/security', icon: LifebuoyIcon },
    { name: 'Help', href: '/help', icon: LifebuoyIcon },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg lg:shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#5347CE' }}
          >
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white font-nexus">
            CglynDogan
          </h1>
        </div>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8">
        {/* GENERAL Section */}
        <div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            GENERAL
          </div>
          <div className="space-y-1">
            {navigationGeneral.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
                style={({ isActive }: { isActive: boolean }) =>
                  isActive ? { backgroundColor: '#5347CE' } : {}
                }
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* TOOLS Section */}
        <div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            TOOLS
          </div>
          <div className="space-y-1">
            {navigationTools.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
                style={({ isActive }: { isActive: boolean }) =>
                  isActive ? { backgroundColor: '#5347CE' } : {}
                }
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-indigo-600 bg-indigo-100 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* SUPPORT Section */}
        <div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            SUPPORT
          </div>
          <div className="space-y-1">
            {navigationSupport.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
                style={({ isActive }: { isActive: boolean }) =>
                  isActive ? { backgroundColor: '#5347CE' } : {}
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#16C8C7' }}
          >
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Team Marketing
            </p>
          </div>
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-4 text-center">
          <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-colors">
            Upgrade Plan
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          © 2024 cglyndogan.me
        </div>
      </div>
    </div>
  );
}
