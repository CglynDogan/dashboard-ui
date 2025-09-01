import { MoonIcon, SunIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../../store/useThemeStore';

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center">
          {/* Mobile menu button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          )}
          
          {/* Page title or search - responsive */}
          <div className="flex-1">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white lg:hidden">
              Dashboard
            </h2>
            {/* Desktop search area can be added here */}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}