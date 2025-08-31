import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import PageLoader from './components/ui/PageLoader';
import ErrorBoundary from './components/error/ErrorBoundary';
import PageErrorBoundary from './components/layout/PageErrorBoundary';
import { useAppStore } from './store/useAppStore';
import { useThemeStore } from './store/useThemeStore';
import { queryClient } from './lib/queryClient';

// Lazy load heavy pages
const Analytics = lazy(() => import('./pages/AnalyticsModern'));
const Sales = lazy(() => import('./pages/Sales'));
const Customers = lazy(() => import('./pages/Customers'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Support = lazy(() => import('./pages/Support'));
const Returns = lazy(() => import('./pages/Returns'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const { settings } = useAppStore();
  const { theme } = useThemeStore();
  
  // Initialize app settings from localStorage and apply to DOM
  useEffect(() => {
    // Apply compact view
    if (settings.compactView) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
    
    // Apply animations setting
    if (!settings.animations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [settings.compactView, settings.animations]);
  
  // Initialize theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={
              <PageErrorBoundary>
                <Overview />
              </PageErrorBoundary>
            } />
            <Route path="analytics" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Analytics />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="sales" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Sales />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="customers" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Customers />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="inventory" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Inventory />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="support" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Support />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="returns" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Returns />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="settings" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Settings />
                </Suspense>
              </PageErrorBoundary>
            } />
          </Route>
        </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}