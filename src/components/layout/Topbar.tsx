import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../store/themeStore';
import LanguageToggle from '../ui/LanguageToggle';

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          {/* Search alanı buraya gelecek */}
        </div>
        
        <div className="flex items-center space-x-2">
          <LanguageToggle />
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