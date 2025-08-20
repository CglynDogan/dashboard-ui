import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LanguageToggle from '../components/ui/LanguageToggle';
import { useTheme } from '../store/themeStore';

export default function Settings() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  
  // localStorage'dan ayarları oku
  const [compactView, setCompactView] = useState(() => {
    const saved = localStorage.getItem('compactView');
    return saved === 'true';
  });
  
  const [animations, setAnimations] = useState(() => {
    const saved = localStorage.getItem('animations');
    return saved !== 'false'; // varsayılan true
  });

  // Ayarları localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('compactView', compactView.toString());
    // Body'ye class ekle/çıkar
    if (compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
  }, [compactView]);

  useEffect(() => {
    localStorage.setItem('animations', animations.toString());
    // Body'ye class ekle/çıkar
    if (animations) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
  }, [animations]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.themeSettings')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.darkMode')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.darkModeDesc')}
                </p>
              </div>
              <Button
                variant={theme === 'dark' ? 'primary' : 'secondary'}
                size="sm"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? t('settings.on') : t('settings.off')}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.language')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.languageDesc')}
                </p>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </Card>

        {/* Display Settings */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.displaySettings')}
          </h3>
          <div className="space-y-4">
            {compactView && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t('settings.compactActive')}
                </p>
              </div>
            )}
            {!animations && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  {t('settings.animationsOff')}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t('settings.compactView')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('settings.compactViewDesc')}
                </p>
              </div>
              <Button 
                variant={compactView ? 'primary' : 'secondary'} 
                size="sm"
                onClick={() => setCompactView(!compactView)}
              >
                {compactView ? t('settings.on') : t('settings.off')}
              </Button>
            </div>
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
                variant={animations ? 'primary' : 'secondary'} 
                size="sm"
                onClick={() => setAnimations(!animations)}
              >
                {animations ? t('settings.on') : t('settings.off')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}