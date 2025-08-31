// Mock API functions that simulate real API calls
import salesData from '../data/sales.json';
import customersData from '../data/customers.json';
import inventoryData from '../data/inventory.json';
import supportData from '../data/support.json';
import returnsData from '../data/returns.json';
import analyticsData from '../data/analytics.json';
import activitiesData from '../data/activities.json';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Response type
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Sales API
export const salesApi = {
  getAll: async (): Promise<ApiResponse<typeof salesData>> => {
    await delay(500);
    return { data: salesData, success: true };
  },
  
  getById: async (id: string): Promise<ApiResponse<typeof salesData[0] | null>> => {
    await delay(300);
    const sale = salesData.find(s => s.id === id);
    return { data: sale || null, success: !!sale };
  },
};

// Customers API
export const customersApi = {
  getAll: async (): Promise<ApiResponse<typeof customersData>> => {
    await delay(400);
    return { data: customersData, success: true };
  },
  
  getById: async (id: string): Promise<ApiResponse<typeof customersData[0] | null>> => {
    await delay(200);
    const customer = customersData.find(c => c.id === id);
    return { data: customer || null, success: !!customer };
  },
};

// Inventory API
export const inventoryApi = {
  getAll: async (): Promise<ApiResponse<typeof inventoryData>> => {
    await delay(600);
    return { data: inventoryData, success: true };
  },
  
  updateStock: async (_id: string, _quantity: number): Promise<ApiResponse<boolean>> => {
    await delay(800);
    // Simulate API call
    return { data: true, success: true, message: 'Stock updated successfully' };
  },
};

// Support API
export const supportApi = {
  getTickets: async (): Promise<ApiResponse<typeof supportData>> => {
    await delay(300);
    return { data: supportData, success: true };
  },
  
  updateTicketStatus: async (_id: string, _status: string): Promise<ApiResponse<boolean>> => {
    await delay(500);
    return { data: true, success: true, message: 'Ticket status updated' };
  },
};

// Returns API
export const returnsApi = {
  getAll: async (): Promise<ApiResponse<typeof returnsData>> => {
    await delay(450);
    return { data: returnsData, success: true };
  },
  
  processReturn: async (_id: string, approved: boolean): Promise<ApiResponse<boolean>> => {
    await delay(700);
    return { 
      data: approved, 
      success: true, 
      message: approved ? 'Return approved' : 'Return rejected' 
    };
  },
};

// Analytics API
export const analyticsApi = {
  getOverview: async (): Promise<ApiResponse<typeof analyticsData>> => {
    await delay(800);
    return { data: analyticsData, success: true };
  },
  
  getRealtimeMetrics: async (): Promise<ApiResponse<any>> => {
    await delay(200);
    // Simulate real-time data with some randomness
    const now = new Date();
    return {
      data: {
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        currentRevenue: Math.floor(Math.random() * 10000) + 50000,
        conversionRate: (Math.random() * 5 + 2).toFixed(2),
        timestamp: now.toISOString(),
      },
      success: true,
    };
  },
};

// Activities API
export const activitiesApi = {
  getRecent: async (limit: number = 10): Promise<ApiResponse<typeof activitiesData>> => {
    await delay(250);
    const recentActivities = activitiesData.slice(0, limit);
    return { data: recentActivities, success: true };
  },
  
  createActivity: async (activity: { title: string; description: string }): Promise<ApiResponse<any>> => {
    await delay(400);
    const newActivity = {
      id: `act-${Date.now()}`,
      ...activity,
      createdAt: new Date().toISOString(),
      userId: 'current-user',
    };
    return { data: newActivity, success: true };
  },
};