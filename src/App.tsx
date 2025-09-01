import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import Dashboard from './pages/Dashboard';
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
const Product = lazy(() => import('./pages/Product'));
const Security = lazy(() => import('./pages/Security'));
const Help = lazy(() => import('./pages/Help'));
const Invoice = lazy(() => import('./pages/Invoice'));
const Automation = lazy(() => import('./pages/Automation'));
const Payment = lazy(() => import('./pages/Payment'));
const Messages = lazy(() => import('./pages/Messages'));

export default function App() {
  const { settings } = useAppStore();
  const { theme } = useThemeStore();
  
  // Initialize app settings from localStorage and apply to DOM
  useEffect(() => {
    // Apply animations setting
    if (!settings.animations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [settings.animations]);
  
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
                <Dashboard />
              </PageErrorBoundary>
            } />
            <Route path="overview" element={
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
            <Route path="product" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Product />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="security" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Security />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="help" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Help />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="invoice" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Invoice />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="automation" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Automation />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="payment" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Payment />
                </Suspense>
              </PageErrorBoundary>
            } />
            <Route path="messages" element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Messages />
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