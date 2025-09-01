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
    if (percentage <= 10) return 'bg-nexus-error';
    if (percentage <= 25) return 'bg-nexus-warning';
    if (percentage <= 50) return 'bg-nexus-warning';
    if (percentage >= 90) return 'bg-nexus-purple';
    return 'bg-nexus-success';
  };

  const getTextColor = () => {
    const percentage = getStockPercentage();
    if (percentage <= 10) return 'text-nexus-error';
    if (percentage <= 25) return 'text-nexus-warning';
    if (percentage <= 50) return 'text-nexus-warning';
    if (percentage >= 90) return 'text-nexus-purple';
    return 'text-nexus-success';
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
          <span className="font-medium text-nexus-info ml-2">
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