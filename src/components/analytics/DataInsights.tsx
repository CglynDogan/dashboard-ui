import { memo, useMemo } from 'react';
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface DataInsightsProps {
  data: any;
  className?: string;
}

interface Insight {
  type: 'positive' | 'negative' | 'warning' | 'info';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: number;
}

function DataInsights({ data, className = '' }: DataInsightsProps) {
  const insights = useMemo(() => {
    if (!data) return [];

    const insights: Insight[] = [];

    // Revenue trend analysis
    if (data.revenueByHour && data.revenueByHour.length > 1) {
      const recent = data.revenueByHour.slice(-6);
      const older = data.revenueByHour.slice(-12, -6);
      const recentAvg = recent.reduce((sum: number, item: any) => sum + item.revenue, 0) / recent.length;
      const olderAvg = older.reduce((sum: number, item: any) => sum + item.revenue, 0) / older.length;
      
      if (recentAvg > olderAvg * 1.1) {
        insights.push({
          type: 'positive',
          title: 'Gelir Artış Trendi',
          description: `Son 6 saatte gelir ortalaması %${((recentAvg - olderAvg) / olderAvg * 100).toFixed(1)} arttı`,
          icon: ArrowTrendingUpIcon,
          priority: 9
        });
      } else if (recentAvg < olderAvg * 0.9) {
        insights.push({
          type: 'warning',
          title: 'Gelir Düşüş Eğilimi',
          description: `Son 6 saatte gelir ortalaması %${((olderAvg - recentAvg) / olderAvg * 100).toFixed(1)} azaldı`,
          icon: ArrowTrendingDownIcon,
          priority: 8
        });
      }
    }

    // Product performance analysis
    if (data.productPerformance) {
      const topProduct = data.productPerformance[0];
      const totalRevenue = data.productPerformance.reduce((sum: number, p: any) => sum + p.revenue, 0);
      const topProductShare = (topProduct.revenue / totalRevenue * 100);

      if (topProductShare > 60) {
        insights.push({
          type: 'warning',
          title: 'Ürün Yoğunlaşma Riski',
          description: `${topProduct.product} toplam gelirin %${topProductShare.toFixed(1)}'ini oluşturuyor`,
          icon: ExclamationTriangleIcon,
          priority: 7
        });
      }

      // Growth products
      const growthProducts = data.productPerformance.filter((p: any) => p.growth > 15);
      if (growthProducts.length > 0) {
        insights.push({
          type: 'positive',
          title: 'Yüksek Büyüme Ürünleri',
          description: `${growthProducts.length} ürün %15'in üzerinde büyüme gösteriyor`,
          icon: CheckCircleIcon,
          priority: 6
        });
      }
    }

    // Conversion funnel analysis
    if (data.conversionFunnel) {
      const stages = data.conversionFunnel;
      const conversionRates = stages.map((stage: any, index: number) => {
        if (index === 0) return 100;
        return (stage.count / stages[0].count) * 100;
      });

      const biggestDrop = conversionRates.reduce((max: number, rate: number, index: number) => {
        if (index === 0) return { index: 0, drop: 0 };
        const drop = conversionRates[index - 1] - rate;
        return drop > (max as any).drop ? { index, drop } : max;
      }, { index: 0, drop: 0 });

      if (biggestDrop.drop > 20) {
        insights.push({
          type: 'warning',
          title: 'Dönüşüm Kaybı Tespit Edildi',
          description: `${stages[biggestDrop.index - 1].stage} → ${stages[biggestDrop.index].stage} arasında %${biggestDrop.drop.toFixed(1)} kayıp var`,
          icon: ExclamationTriangleIcon,
          priority: 8
        });
      }
    }

    // Geographic analysis
    if (data.geographicData) {
      const sortedCountries = [...data.geographicData].sort((a: any, b: any) => b.revenue - a.revenue);
      const topCountry = sortedCountries[0];
      const totalRevenue = sortedCountries.reduce((sum: number, c: any) => sum + c.revenue, 0);
      const topCountryShare = (topCountry.revenue / totalRevenue * 100);

      if (topCountryShare < 30) {
        insights.push({
          type: 'positive',
          title: 'Dengeli Coğrafi Dağılım',
          description: `Gelir farklı ülkelere dengeli şekilde dağılmış (En yüksek %${topCountryShare.toFixed(1)})`,
          icon: CheckCircleIcon,
          priority: 5
        });
      }
    }

    return insights.sort((a, b) => b.priority - a.priority).slice(0, 4);
  }, [data]);

  const getInsightStyle = (type: Insight['type']) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          iconBg: 'bg-green-100 dark:bg-green-900',
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'negative':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          iconBg: 'bg-red-100 dark:bg-red-900',
          iconColor: 'text-red-600 dark:text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          iconBg: 'bg-yellow-100 dark:bg-yellow-900',
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          iconBg: 'bg-blue-100 dark:bg-blue-900',
          iconColor: 'text-blue-600 dark:text-blue-400'
        };
    }
  };

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <LightBulbIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Veri İçgörüleri
        </h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const styles = getInsightStyle(insight.type);
          const Icon = insight.icon;

          return (
            <div
              key={index}
              className={`
                p-4 rounded-xl border transition-all duration-200 hover:shadow-sm
                ${styles.bg} ${styles.border}
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${styles.iconBg}`}>
                  <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Bu içgörüler verileriniz otomatik olarak analiz edilerek oluşturulmuştur
        </p>
      </div>
    </div>
  );
}

export default memo(DataInsights);