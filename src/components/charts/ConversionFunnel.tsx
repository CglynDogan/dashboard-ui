import { type ConversionFunnelStage } from '../../types';

interface ConversionFunnelProps {
  data: ConversionFunnelStage[];
}

export default function ConversionFunnel({ data }: ConversionFunnelProps) {

  return (
    <div className="space-y-4">
      {data.map((stage, index) => {
        const isLast = index === data.length - 1;
        const nextStage = !isLast ? data[index + 1] : null;
        const dropOffRate = nextStage ? 
          ((stage.value - nextStage.value) / stage.value * 100).toFixed(1) : 
          null;

        return (
          <div key={stage.stage} className="relative">
            {/* Funnel Stage */}
            <div 
              className="relative flex items-center justify-between p-4 rounded-lg text-white font-medium"
              style={{ backgroundColor: stage.color }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold">
                  {stage.stage}
                </div>
                <div className="text-sm opacity-90">
                  {stage.value.toLocaleString()} kişi
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  %{stage.percentage}
                </div>
                <div className="text-xs opacity-90">
                  dönüşüm oranı
                </div>
              </div>
            </div>

            {/* Drop-off indicator */}
            {!isLast && dropOffRate && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                  <span>%{dropOffRate} kayıp</span>
                  <div className="text-xs">
                    ({(stage.value - nextStage!.value).toLocaleString()} kişi)
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              %{data[data.length - 1]?.percentage || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Toplam Dönüşüm
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data[0]?.value.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Toplam Ziyaretçi
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data[data.length - 1]?.value.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Başarılı Satış
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data[0] && data[data.length - 1] ? 
                (data[0].value - data[data.length - 1].value).toLocaleString() : 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Kayıp Potansiyel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}