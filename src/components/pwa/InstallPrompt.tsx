import { memo } from 'react';
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import Button from '../ui/Button';

function InstallPrompt() {
  const { isInstallable, installApp } = useInstallPrompt();

  if (!isInstallable) return null;

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      console.log('App installed successfully');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Uygulamayı Yükle
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Dashboard'u cihazınıza yükleyip çevrimdışı erişim sağlayın.
          </p>
          <div className="flex space-x-2">
            <Button 
              onClick={handleInstall}
              size="sm"
              className="inline-flex items-center gap-1"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Yükle
            </Button>
          </div>
        </div>
        <button
          onClick={() => {/* Hide prompt */}}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default memo(InstallPrompt);