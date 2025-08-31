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
    <div className="space-y-2 min-w-0">
      {/* Stock Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStockColor()}`}
          style={{ width: `${Math.min(getStockPercentage(), 100)}%` }}
        ></div>
      </div>
      
      {/* Stock Details */}
      <div className="space-y-1 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 truncate">
            {t('inventory.stockLevels.current')}:
          </span>
          <span className={`font-medium ${getTextColor()} ml-2`}>
            {product.currentStock}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 truncate">
            {t('inventory.stockLevels.available')}:
          </span>
          <span className="font-medium text-gray-900 dark:text-white ml-2">
            {product.available}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 truncate">
            {t('inventory.stockLevels.reserved')}:
          </span>
          <span className="font-medium text-gray-900 dark:text-white ml-2">
            {product.reserved}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 truncate">
            {t('inventory.stockLevels.onOrder')}:
          </span>
          <span className="font-medium text-blue-600 dark:text-blue-400 ml-2">
            {product.onOrder}
          </span>
        </div>
      </div>
      
      {/* Min/Max Indicators */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-200 dark:border-gray-600">
        <span className="truncate">Min: {product.minStock}</span>
        <span className="truncate ml-2">Max: {product.maxStock}</span>
      </div>
    </div>
  );
}