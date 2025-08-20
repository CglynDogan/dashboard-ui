import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './store/themeStore';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Support from './pages/Support';
import Returns from './pages/Returns';
import Settings from './pages/Settings';

export default function App() {
  // Uygulama başlatıldığında kaydedilmiş ayarları yükle
  useEffect(() => {
    // Kompakt görünüm ayarını yükle
    const compactView = localStorage.getItem('compactView') === 'true';
    if (compactView) {
      document.body.classList.add('compact-view');
    }
    
    // Animasyon ayarını yükle
    const animations = localStorage.getItem('animations');
    if (animations === 'false') {
      document.body.classList.add('no-animations');
    }
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="sales" element={<Sales />} />
            <Route path="customers" element={<Customers />} />
            <Route path="support" element={<Support />} />
            <Route path="returns" element={<Returns />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}