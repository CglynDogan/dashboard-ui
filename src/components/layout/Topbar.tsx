import { Bars3Icon } from '@heroicons/react/24/outline';

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
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
            <h2 className="text-sm sm:text-lg font-semibold text-gray-900 lg:hidden">Dashboard</h2>
            {/* Desktop search area can be added here */}
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2" />
      </div>
    </header>
  );
}
