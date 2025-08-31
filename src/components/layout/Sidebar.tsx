import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon,
  LifebuoyIcon,
  ArrowUturnLeftIcon,
  ChartPieIcon,
  CubeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.overview'), href: '/', icon: HomeIcon },
    { name: t('nav.analytics'), href: '/analytics', icon: ChartPieIcon },
    { name: t('nav.sales'), href: '/sales', icon: ChartBarIcon },
    { name: t('nav.customers'), href: '/customers', icon: UsersIcon },
    { name: t('nav.inventory'), href: '/inventory', icon: CubeIcon },
    { name: t('nav.support'), href: '/support', icon: LifebuoyIcon },
    { name: t('nav.returns'), href: '/returns', icon: ArrowUturnLeftIcon },
    { name: t('nav.settings'), href: '/settings', icon: CogIcon },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg lg:shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('nav.dashboard')}
        </h1>
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
      <nav className="flex-1 px-2 py-4 lg:px-4 lg:py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onClose} // Close mobile menu on navigation
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 lg:px-4 lg:py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer - optional brand info */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Dashboard v1.0
        </div>
      </div>
    </div>
  );
}