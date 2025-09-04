import { useTranslation } from 'react-i18next';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAppStore } from '../store/useAppStore';

export default function Settings() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Display Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.displaySettings')}
          </h3>
          <div className="space-y-4">
            {!settings.animations && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  {t('settings.animationsOff')}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.animations')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.animationsDesc')}
                </p>
              </div>
              <Button
                variant={settings.animations ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => updateSettings({ animations: !settings.animations })}
              >
                {settings.animations ? t('settings.on') : t('settings.off')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
