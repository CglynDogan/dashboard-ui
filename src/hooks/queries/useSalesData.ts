import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesApi } from '../../lib/api';

// Query keys
export const salesKeys = {
  all: ['sales'] as const,
  detail: (id: string) => [...salesKeys.all, id] as const,
};

// Get all sales
export function useSalesData() {
  return useQuery({
    queryKey: salesKeys.all,
    queryFn: () => salesApi.getAll(),
    select: (response) => response.data,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get single sale by ID
export function useSaleById(id: string) {
  return useQuery({
    queryKey: salesKeys.detail(id),
    queryFn: () => salesApi.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

// Example mutation for creating/updating sales
export function useCreateSaleMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (saleData: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, data: saleData };
    },
    onSuccess: () => {
      // Invalidate and refetch sales data
      queryClient.invalidateQueries({ queryKey: salesKeys.all });
    },
    onError: (error) => {
      console.error('Failed to create sale:', error);
    },
  });
}