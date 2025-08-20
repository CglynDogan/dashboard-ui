import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { 
  ChartBarIcon, 
  ChartPieIcon, 
  PresentationChartLineIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/outline';

export type ChartType = 'bar' | 'line' | 'pie' | 'area';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
}

const chartTypes = [
  { type: 'bar' as ChartType, icon: ChartBarIcon, label: 'Bar Chart' },
  { type: 'line' as ChartType, icon: PresentationChartLineIcon, label: 'Line Chart' },
  { type: 'pie' as ChartType, icon: ChartPieIcon, label: 'Pie Chart' },
  { type: 'area' as ChartType, icon: Squares2X2Icon, label: 'Area Chart' },
];

export default function ChartTypeSelector({ selectedType, onTypeChange }: ChartTypeSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('charts.type')}:
      </span>
      <div className="flex space-x-1">
        {chartTypes.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant={selectedType === type ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onTypeChange(type)}
            className="p-2"
            title={label}
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}