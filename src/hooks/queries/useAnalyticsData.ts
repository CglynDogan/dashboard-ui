import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../../lib/api';

export const analyticsKeys = {
  all: ['analytics'] as const,
  overview: () => [...analyticsKeys.all, 'overview'] as const,
  realtime: () => [...analyticsKeys.all, 'realtime'] as const,
};

// Get analytics overview
export function useAnalyticsOverview() {
  return useQuery({
    queryKey: analyticsKeys.overview(),
    queryFn: () => analyticsApi.getOverview(),
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get real-time metrics with auto-refresh
export function useRealtimeMetrics() {
  return useQuery({
    queryKey: analyticsKeys.realtime(),
    queryFn: () => analyticsApi.getRealtimeMetrics(),
    select: (response) => response.data,
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
    staleTime: 0, // Always consider data stale for real-time updates
  });
}