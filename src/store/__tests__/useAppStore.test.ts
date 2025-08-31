import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../useAppStore'
import { act, renderHook } from '@testing-library/react'

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state
    useAppStore.setState({
      settings: {
        compactView: false,
        animations: true,
        sidebarCollapsed: false,
      },
      isLoading: false,
      filters: {
        sales: {},
        customers: {},
        inventory: {},
        support: {},
        returns: {},
      },
      pagination: {
        sales: { page: 1, itemsPerPage: 25 },
        customers: { page: 1, itemsPerPage: 25 },
        inventory: { page: 1, itemsPerPage: 25 },
        support: { page: 1, itemsPerPage: 25 },
        returns: { page: 1, itemsPerPage: 25 },
      },
    })
  })

  it('has correct initial state', () => {
    const { result } = renderHook(() => useAppStore())
    
    expect(result.current.settings).toEqual({
      compactView: false,
      animations: true,
      sidebarCollapsed: false,
    })
    expect(result.current.isLoading).toBe(false)
  })

  it('updates settings correctly', () => {
    const { result } = renderHook(() => useAppStore())
    
    act(() => {
      result.current.updateSettings({ compactView: true })
    })
    
    expect(result.current.settings.compactView).toBe(true)
    expect(result.current.settings.animations).toBe(true) // should not change
  })

  it('updates loading state', () => {
    const { result } = renderHook(() => useAppStore())
    
    act(() => {
      result.current.setLoading(true)
    })
    
    expect(result.current.isLoading).toBe(true)
  })

  it('updates filters correctly', () => {
    const { result } = renderHook(() => useAppStore())
    
    act(() => {
      result.current.updateFilter('sales', { region: 'EU', product: 'Premium' })
    })
    
    expect(result.current.filters.sales).toEqual({
      region: 'EU',
      product: 'Premium'
    })
  })

  it('clears filters correctly', () => {
    const { result } = renderHook(() => useAppStore())
    
    // First set some filters
    act(() => {
      result.current.updateFilter('sales', { region: 'EU', product: 'Premium' })
    })
    
    // Then clear them
    act(() => {
      result.current.clearFilters('sales')
    })
    
    expect(result.current.filters.sales).toEqual({})
  })

  it('updates pagination correctly', () => {
    const { result } = renderHook(() => useAppStore())
    
    act(() => {
      result.current.updatePagination('sales', { page: 2, itemsPerPage: 50 })
    })
    
    expect(result.current.pagination.sales).toEqual({
      page: 2,
      itemsPerPage: 50
    })
  })
})