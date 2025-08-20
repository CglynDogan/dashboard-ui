import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.overview'), href: '/', icon: HomeIcon },
    { name: t('nav.sales'), href: '/sales', icon: ChartBarIcon },
    { name: t('nav.customers'), href: '/customers', icon: UsersIcon },
    { name: t('nav.support'), href: '/support', icon: LifebuoyIcon },
    { name: t('nav.settings'), href: '/settings', icon: CogIcon },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('nav.dashboard')}
        </h1>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}