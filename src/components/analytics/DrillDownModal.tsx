import { memo, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import InteractiveChart from './InteractiveChart';

interface ChartDataItem {
  [key: string]: string | number;
}

interface DrillDownModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly data: ChartDataItem[];
  readonly drillDownType: 'hourly' | 'daily' | 'weekly' | 'monthly';
  readonly metric: string;
}

function DrillDownModal({ 
  isOpen, 
  onClose, 
  title, 
  data, 
  drillDownType, 
  metric 
}: DrillDownModalProps) {
  const getDrillDownData = () => {
    // In a real app, this would fetch detailed data based on drillDownType
    switch (drillDownType) {
      case 'hourly':
        return data.slice(0, 24); // Last 24 hours
      case 'daily':
        return data.slice(0, 30); // Last 30 days
      case 'weekly':
        return data.slice(0, 12); // Last 12 weeks
      case 'monthly':
        return data.slice(0, 12); // Last 12 months
      default:
        return data;
    }
  };

  const getTimeLabel = () => {
    switch (drillDownType) {
      case 'hourly':
        return 'Saatlik';
      case 'daily':
        return 'Günlük';
      case 'weekly':
        return 'Haftalık';
      case 'monthly':
        return 'Aylık';
      default:
        return '';
    }
  };

  const drillDownData = getDrillDownData();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                      <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getTimeLabel()} {title} Analizi
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Detaylı veri görünümü ve trend analizi
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Detailed Chart */}
                <div className="mb-6">
                  <InteractiveChart
                    data={drillDownData}
                    title={`${getTimeLabel()} ${title}`}
                    subtitle={`Son ${drillDownData.length} ${getTimeLabel().toLowerCase()} veri`}
                    xKey={drillDownType === 'hourly' ? 'hour' : 'date'}
                    yKey={metric}
                    height={400}
                    showTypeSelector={true}
                    formatValue={(value) => 
                      metric === 'revenue' ? 
                        new Intl.NumberFormat('tr-TR', { 
                          style: 'currency', 
                          currency: 'TRY' 
                        }).format(value) : 
                        value.toLocaleString()
                    }
                  />
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {(() => {
                    const values = drillDownData.map(item => Number(item[metric]) || 0);
                    const total = values.reduce((sum, val) => sum + val, 0);
                    const average = total / values.length;
                    const max = Math.max(...values);
                    const min = Math.min(...values);

                    return (
                      <>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Toplam</div>
                          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                            {metric === 'revenue' ? 
                              new Intl.NumberFormat('tr-TR', { 
                                style: 'currency', 
                                currency: 'TRY',
                                notation: 'compact'
                              }).format(total) : 
                              total.toLocaleString()
                            }
                          </div>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Ortalama</div>
                          <div className="text-lg font-bold text-green-700 dark:text-green-300">
                            {metric === 'revenue' ? 
                              new Intl.NumberFormat('tr-TR', { 
                                style: 'currency', 
                                currency: 'TRY',
                                notation: 'compact'
                              }).format(average) : 
                              Math.round(average).toLocaleString()
                            }
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                          <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">En Yüksek</div>
                          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                            {metric === 'revenue' ? 
                              new Intl.NumberFormat('tr-TR', { 
                                style: 'currency', 
                                currency: 'TRY',
                                notation: 'compact'
                              }).format(max) : 
                              max.toLocaleString()
                            }
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                          <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">En Düşük</div>
                          <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                            {metric === 'revenue' ? 
                              new Intl.NumberFormat('tr-TR', { 
                                style: 'currency', 
                                currency: 'TRY',
                                notation: 'compact'
                              }).format(min) : 
                              min.toLocaleString()
                            }
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Kapat
                  </button>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                    Rapor Dışa Aktar
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(DrillDownModal);