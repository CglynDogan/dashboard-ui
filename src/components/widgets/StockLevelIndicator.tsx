import { useTranslation } from 'react-i18next';
import { type InventoryProduct } from '../../types';

interface StockLevelIndicatorProps {
  product: InventoryProduct;
}

export default function StockLevelIndicator({ product }: StockLevelIndicatorProps) {
  const { t } = useTranslation();
  
  const getStockPercentage = () => {
    return (product.currentStock / product.maxStock) * 100;
  };

  const getStockColor = () => {
    const percentage = getStockPercentage();
    if (percentage <= 10) return 'bg-red-500';
    if (percentage <= 25) return 'bg-orange-500';
    if (percentage <= 50) return 'bg-yellow-500';
    if (percentage >= 90) return 'bg-purple-500';
    return 'bg-green-500';
  };

  const getTextColor = () => {
    const percentage = getStockPercentage();
    if (percentage <= 10) return 'text-red-600 dark:text-red-400';
    if (percentage <= 25) return 'text-orange-600 dark:text-orange-400';
    if (percentage <= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 90) return 'text-purple-600 dark:text-purple-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="space-y-2">
      {/* Stock Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStockColor()}`}
          style={{ width: `${Math.min(getStockPercentage(), 100)}%` }}
        ></div>
      </div>
      
      {/* Stock Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-500 dark:text-gray-400">
            {t('inventory.stockLevels.current')}:
          </span>
          <span className={`ml-1 font-medium ${getTextColor()}`}>
            {product.currentStock}
          </span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">
            {t('inventory.stockLevels.available')}:
          </span>
          <span className="ml-1 font-medium text-gray-900 dark:text-white">
            {product.available}
          </span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">
            {t('inventory.stockLevels.reserved')}:
          </span>
          <span className="ml-1 font-medium text-gray-900 dark:text-white">
            {product.reserved}
          </span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">
            {t('inventory.stockLevels.onOrder')}:
          </span>
          <span className="ml-1 font-medium text-blue-600 dark:text-blue-400">
            {product.onOrder}
          </span>
        </div>
      </div>
      
      {/* Min/Max Indicators */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Min: {product.minStock}</span>
        <span>Max: {product.maxStock}</span>
      </div>
    </div>
  );
}