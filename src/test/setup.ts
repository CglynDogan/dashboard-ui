import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
Object.assign(globalThis, {
  IntersectionObserver: class IntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds: number[] = [];
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  },
});

// Mock ResizeObserver
Object.assign(globalThis, {
  ResizeObserver: class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
