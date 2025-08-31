import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppSettings {
  animations: boolean;
  sidebarCollapsed: boolean;
}

interface Filter {
  [key: string]: string | string[] | number | boolean | null;
}

interface AppState {
  // Settings
  settings: AppSettings;
  
  // Global loading states
  isLoading: boolean;
  
  // Filters for different pages
  filters: {
    sales: Filter;
    customers: Filter;
    inventory: Filter;
    support: Filter;
    returns: Filter;
  };
  
  // Pagination states
  pagination: {
    sales: { page: number; itemsPerPage: number };
    customers: { page: number; itemsPerPage: number };
    inventory: { page: number; itemsPerPage: number };
    support: { page: number; itemsPerPage: number };
    returns: { page: number; itemsPerPage: number };
  };
  
  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  setLoading: (loading: boolean) => void;
  updateFilter: (page: keyof AppState['filters'], filter: Partial<Filter>) => void;
  clearFilters: (page: keyof AppState['filters']) => void;
  updatePagination: (page: keyof AppState['pagination'], pagination: Partial<{ page: number; itemsPerPage: number }>) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        settings: {
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
        
        // Actions
        updateSettings: (newSettings) =>
          set((state) => ({
            settings: { ...state.settings, ...newSettings },
          }), false, 'updateSettings'),
          
        setLoading: (loading) =>
          set({ isLoading: loading }, false, 'setLoading'),
          
        updateFilter: (page, filter) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [page]: { ...state.filters[page], ...filter },
            },
          }), false, 'updateFilter'),
          
        clearFilters: (page) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [page]: {},
            },
          }), false, 'clearFilters'),
          
        updatePagination: (page, pagination) =>
          set((state) => ({
            pagination: {
              ...state.pagination,
              [page]: { ...state.pagination[page], ...pagination },
            },
          }), false, 'updatePagination'),
      }),
      {
        name: 'dashboard-app-store',
        partialize: (state) => ({
          settings: state.settings,
          pagination: state.pagination,
        }),
      }
    ),
    {
      name: 'dashboard-app-store',
    }
  )
);