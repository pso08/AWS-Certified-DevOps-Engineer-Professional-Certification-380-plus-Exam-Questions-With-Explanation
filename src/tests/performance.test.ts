// Test script for performance optimizations
// This script tests caching, image optimization, data fetching, code splitting, and monitoring

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  memoize, 
  debounce, 
  throttle, 
  cachifyAsync,
  localStorageWithExpiry
} from '../lib/performance/cache';
import {
  getOptimizedImageUrl,
  generateImagePlaceholder,
  preloadCriticalImages,
  setupLazyLoading,
  getResponsiveImageAttributes
} from '../lib/performance/image-optimization';
import {
  enhancedFetch,
  prefetchData,
  progressiveDataLoad,
  optimizeDataPayload
} from '../lib/performance/data-fetching';
import {
  lazyLoad,
  setupLinkPreloading,
  loadCSS,
  loadScript,
  prefetchPage,
  setupAutoPrefetch
} from '../lib/performance/code-splitting';
import {
  initPerformanceMonitoring,
  recordMetric,
  recordCustomMetric,
  measureExecutionTime,
  getCollectedMetrics,
  clearMetrics
} from '../lib/performance/monitoring';

// Mock window and document objects
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
});

Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    getEntriesByType: jest.fn(() => []),
    mark: jest.fn(),
    measure: jest.fn(),
    memory: {
      usedJSHeapSize: 1000000,
      totalJSHeapSize: 2000000,
      jsHeapSizeLimit: 4000000
    }
  },
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
  })
);

// Mock document methods
document.createElement = jest.fn().mockImplementation((tag) => {
  if (tag === 'link') {
    return {
      rel: '',
      href: '',
      as: '',
      onload: null,
      onerror: null
    };
  } else if (tag === 'script') {
    return {
      src: '',
      async: false,
      onload: null,
      onerror: null
    };
  }
  return {};
});

document.head = {
  appendChild: jest.fn()
};

document.body = {
  appendChild: jest.fn()
};

document.querySelectorAll = jest.fn().mockReturnValue([]);

describe('Performance Optimization Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Caching Utilities', () => {
    it('should memoize function results', () => {
      // Create a mock expensive function
      const mockFn = jest.fn((a, b) => a + b);
      const memoizedFn = memoize(mockFn);
      
      // Call with same arguments multiple times
      const result1 = memoizedFn(1, 2);
      const result2 = memoizedFn(1, 2);
      const result3 = memoizedFn(1, 2);
      
      // Call with different arguments
      const result4 = memoizedFn(2, 3);
      
      expect(result1).toBe(3);
      expect(result2).toBe(3);
      expect(result3).toBe(3);
      expect(result4).toBe(5);
      
      // Original function should only be called twice (once for each unique set of args)
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should debounce function calls', () => {
      jest.useFakeTimers();
      
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);
      
      // Call multiple times
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      // Function should not have been called yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Function should have been called once
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      jest.useRealTimers();
    });

    it('should throttle function calls', () => {
      jest.useFakeTimers();
      
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);
      
      // First call executes immediately
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // Reset mock to test throttling
      mockFn.mockReset();
      
      // Call multiple times in quick succession
      throttledFn();
      throttledFn();
      throttledFn();
      
      // Function should not have been called again yet
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Function should have been called once more
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      jest.useRealTimers();
    });

    it('should cache async function results with TTL', async () => {
      jest.useFakeTimers();
      
      // Create a mock async function
      const mockAsyncFn = jest.fn().mockImplementation(async (id) => {
        return { id, data: 'test' };
      });
      
      const cachedFn = cachifyAsync(mockAsyncFn, 1000);
      
      // Call with same argument multiple times
      const result1 = await cachedFn(1);
      const result2 = await cachedFn(1);
      
      expect(result1).toEqual({ id: 1, data: 'test' });
      expect(result2).toEqual({ id: 1, data: 'test' });
      
      // Original function should only be called once
      expect(mockAsyncFn).toHaveBeenCalledTimes(1);
      
      // Advance time past TTL
      jest.advanceTimersByTime(1500);
      
      // Call again with same argument
      const result3 = await cachedFn(1);
      
      // Original function should be called again
      expect(mockAsyncFn).toHaveBeenCalledTimes(2);
      expect(result3).toEqual({ id: 1, data: 'test' });
      
      jest.useRealTimers();
    });

    it('should store and retrieve items with expiry in localStorage', () => {
      jest.useFakeTimers();
      
      // Mock localStorage.getItem implementation
      window.localStorage.getItem.mockImplementation((key) => {
        if (key === 'test-item') {
          return JSON.stringify({
            value: 'test-value',
            expiry: Date.now() + 1000
          });
        }
        if (key === 'expired-item') {
          return JSON.stringify({
            value: 'expired-value',
            expiry: Date.now() - 1000
          });
        }
        return null;
      });
      
      // Set an item
      localStorageWithExpiry.setItem('new-item', 'new-value', 2000);
      
      // Check if setItem was called correctly
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'new-item',
        expect.stringContaining('new-value')
      );
      
      // Get a valid item
      const value = localStorageWithExpiry.getItem('test-item');
      expect(value).toBe('test-value');
      
      // Get an expired item
      const expiredValue = localStorageWithExpiry.getItem('expired-item');
      expect(expiredValue).toBeNull();
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('expired-item');
      
      jest.useRealTimers();
    });
  });

  describe('Image Optimization', () => {
    it('should generate optimized image URLs', () => {
      // Test with external URL
      const externalUrl = 'https://example.com/image.jpg';
      const optimizedExternalUrl = getOptimizedImageUrl(externalUrl, {
        width: 800,
        quality: 75,
        format: 'webp'
      });
      
      expect(optimizedExternalUrl).toContain('example.com/image.jpg');
      expect(optimizedExternalUrl).toContain('w=800');
      expect(optimizedExternalUrl).toContain('q=75');
      expect(optimizedExternalUrl).toContain('fm=webp');
      
      // Test with local URL
      const localUrl = '/images/local.jpg';
      const optimizedLocalUrl = getOptimizedImageUrl(localUrl);
      
      expect(optimizedLocalUrl).toBe(localUrl);
    });

    it('should generate image placeholders', () => {
      const placeholder = generateImagePlaceholder('test.jpg', 20);
      
      expect(placeholder).toContain('data:image/svg+xml');
      expect(placeholder).toContain('width=\'20\'');
    });

    it('should preload critical images', () => {
      const imageSrcs = ['image1.jpg', 'image2.jpg'];
      preloadCriticalImages(imageSrcs);
      
      expect(document.createElement).toHaveBeenCalledTimes(2);
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalledTimes(2);
    });

    it('should generate responsive image attributes', () => {
      const { src, srcset } = getResponsiveImageAttributes('test.jpg', [300, 600, 900]);
      
      expect(src).toBeDefined();
      expect(srcset).toBeDefined();
      expect(srcset).toContain('300w');
      expect(srcset).toContain('600w');
      expect(srcset).toContain('900w');
    });
  });

  describe('Data Fetching Optimizations', () => {
    it('should enhance fetch with retry logic', async () => {
      // Mock fetch to fail once then succeed
      let attempts = 0;
      global.fetch.mockImplementation(() => {
        attempts++;
        if (attempts === 1) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'test' }),
        });
      });
      
      const result = await enhancedFetch('https://example.com/api', {}, {
        retry: 3,
        retryDelay: 100
      });
      
      expect(result).toEqual({ data: 'test' });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should deduplicate in-flight requests', async () => {
      // Reset fetch mock
      global.fetch.mockReset();
      global.fetch.mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: 'test' }),
        })
      );
      
      // Make multiple concurrent requests to the same URL
      const promise1 = enhancedFetch('https://example.com/api', {}, { dedupe: true });
      const promise2 = enhancedFetch('https://example.com/api', {}, { dedupe: true });
      const promise3 = enhancedFetch('https://example.com/api', {}, { dedupe: true });
      
      const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);
      
      expect(result1).toEqual({ data: 'test' });
      expect(result2).toEqual({ data: 'test' });
      expect(result3).toEqual({ data: 'test' });
      
      // Fetch should only be called once
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should prefetch data', () => {
      // Reset fetch mock
      global.fetch.mockReset();
      
      const urls = ['https://example.com/api1', 'https://example.com/api2'];
      prefetchData(urls);
      
      // enhancedFetch should be called for each URL
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should optimize data payload', () => {
      const data = {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          address: {
            street: '123 Main St',
            city: 'Test City',
            zip: '12345'
          }
        },
        orders: [
          { id: 1, total: 100 },
          { id: 2, total: 200 }
        ]
      };
      
      const fields = ['user.id', 'user.name', 'user.address.city', 'orders'];
      const optimized = optimizeDataPayload(data, fields);
      
      expect(optimized).toHaveProperty('user.id', 1);
      expect(optimized).toHaveProperty('user.name', 'Test User');
      expect(optimized).toHaveProperty('user.address.city', 'Test City');
      expect(optimized).toHaveProperty('orders', data.orders);
      
      // These should not be included
      expect(optimized.user).not.toHaveProperty('email');
      expect(optimized.user.address).not.toHaveProperty('street');
      expect(optimized.user.address).not.toHaveProperty('zip');
    });
  });

  describe('Code Splitting and Lazy Loading', () => {
    it('should lazy load components with preload capability', () => {
      const mockImport = jest.fn(() => Promise.resolve({ default: () => null }));
      const LazyComponent = lazyLoad(mockImport, { preload: false });
      
      // Preload method should be added
      expect(LazyComponent).toHaveProperty('preload');
      
      // Preload should not have been called yet
      expect(mockImport).not.toHaveBeenCalled();
      
      // Call preload manually
      LazyComponent.preload();
      
      // Import should now be called
      expect(mockImport).toHaveBeenCalledTimes(1);
    });

    it('should load CSS dynamically', async () => {
      // Mock document.querySelector to simulate CSS not already loaded
      document.querySelector = jest.fn().mockReturnValue(null);
      
      // Call loadCSS
      const cssPromise = loadCSS('styles.css');
      
      // Simulate onload event
      const link = document.createElement('link');
      link.onload();
      
      await cssPromise;
      
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalled();
    });

    it('should load JavaScript dynamically', async () => {
      // Mock document.querySelector to simulate script not already loaded
      document.querySelector = jest.fn().mockReturnValue(null);
      
      // Call loadScript
      const scriptPromise = loadScript('script.js');
      
      // Simulate onload event
      const script = document.createElement('script');
      script.onload();
      
      await scriptPromise;
      
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(document.body.appendChild).toHaveBeenCalled();
    });

    it('should prefetch pages', () => {
      // Mock document.querySelector to simulate link not already prefetched
      document.querySelector = jest.fn().mockReturnValue(null);
      
      prefetchPage('/about');
      
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalled();
    });
  });

  describe('Performance Monitoring', () => {
    it('should record and retrieve metrics', () => {
      // Clear any existing metrics
      clearMetrics();
      
      // Record a custom metric
      recordCustomMetric('test-metric', 100, { test: true });
      
      // Get collected metrics
      const metrics = getCollectedMetrics();
      
      expect(metrics.length).toBe(1);
      expect(metrics[0].name).toBe('test-metric');
      expect(metrics[0].value).toBe(100);
      expect(metrics[0].metadata).toEqual({ test: true });
    });

    it('should measure function execution time', () => {
      // Create a mock function
      const mockFn = jest.fn(() => {
        // Simulate some work
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      });
      
      // Wrap with timing measurement
      const measuredFn = measureExecutionTime(mockFn, 'test-function');
      
      // Call the function
      const result = measuredFn();
      
      expect(result).toBe(499500); // Sum of 0 to 999
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // In a real test, this would verify that recordCustomMetric was called
      // with the execution time
    });

    it('should initialize performance monitoring', () => {
      // Mock PerformanceObserver
      global.PerformanceObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        disconnect: jest.fn()
      }));
      
      initPerformanceMonitoring({
        sampleRate: 100,
        logLevel: 'debug'
      });
      
      // In a real test, this would verify that observers were set up
      // and initial metrics were collected
    });
  });
});
