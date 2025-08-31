import { useCallback, useMemo } from 'react';

/**
 * Hook for creating memoized callbacks with complex dependencies
 */
export function useMemoizedCallback<T extends any[], R>(
  callback: (...args: T) => R,
  deps: React.DependencyList
) {
  return useCallback(callback, deps);
}

/**
 * Hook for creating memoized values with complex computations
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Hook for creating stable object references
 */
export function useStableObject<T extends Record<string, any>>(obj: T): T {
  return useMemo(() => obj, Object.values(obj));
}

/**
 * Hook for creating stable array references
 */
export function useStableArray<T>(arr: T[]): T[] {
  return useMemo(() => arr, arr);
}