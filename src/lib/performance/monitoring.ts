// Performance monitoring and optimization utilities

/**
 * Configuration for performance monitoring
 */
export interface PerformanceMonitorConfig {
  sampleRate?: number;       // Percentage of users to monitor (0-100)
  logLevel?: 'error' | 'warn' | 'info' | 'debug';
  maxEntries?: number;       // Maximum number of entries to store
  reportToServer?: boolean;  // Whether to send metrics to server
  apiEndpoint?: string;      // Endpoint to send metrics to
}

/**
 * Default performance monitoring configuration
 */
export const defaultMonitorConfig: PerformanceMonitorConfig = {
  sampleRate: 10,
  logLevel: 'warn',
  maxEntries: 100,
  reportToServer: false,
  apiEndpoint: '/api/metrics'
};

/**
 * Performance metric types
 */
export type MetricType = 
  | 'navigation'      // Page navigation timing
  | 'resource'        // Resource loading timing
  | 'paint'           // Paint timing (FP, FCP)
  | 'layout'          // Layout shifts
  | 'interaction'     // User interactions
  | 'memory'          // Memory usage
  | 'custom';         // Custom metrics

/**
 * Performance metric entry
 */
export interface PerformanceMetric {
  type: MetricType;
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Store for collected metrics
const metrics: PerformanceMetric[] = [];

/**
 * Initialize performance monitoring
 * @param config Performance monitoring configuration
 */
export function initPerformanceMonitoring(config: PerformanceMonitorConfig = {}): void {
  if (typeof window === 'undefined') return;
  
  // Merge with default config
  const finalConfig = { ...defaultMonitorConfig, ...config };
  
  // Only monitor a percentage of users based on sample rate
  if (Math.random() * 100 > finalConfig.sampleRate) return;
  
  // Monitor navigation timing
  if (performance && performance.getEntriesByType) {
    // Collect navigation timing
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navigationTiming = navigationEntries[0] as PerformanceNavigationTiming;
      
      recordMetric({
        type: 'navigation',
        name: 'page-load',
        value: navigationTiming.loadEventEnd - navigationTiming.startTime,
        timestamp: Date.now(),
        metadata: {
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime,
          firstByte: navigationTiming.responseStart - navigationTiming.requestStart,
          domInteractive: navigationTiming.domInteractive - navigationTiming.startTime,
          url: window.location.pathname
        }
      });
    }
    
    // Monitor paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      recordMetric({
        type: 'paint',
        name: entry.name,
        value: entry.startTime,
        timestamp: Date.now()
      });
    });
  }
  
  // Setup observers for ongoing monitoring
  setupPerformanceObservers(finalConfig);
  
  // Setup periodic reporting if enabled
  if (finalConfig.reportToServer) {
    setInterval(() => {
      reportMetricsToServer(finalConfig.apiEndpoint);
    }, 60000); // Report every minute
  }
}

/**
 * Setup performance observers for ongoing monitoring
 * @param config Performance monitoring configuration
 */
function setupPerformanceObservers(config: PerformanceMonitorConfig): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
  
  // Monitor layout shifts
  try {
    const layoutShiftObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.hadRecentInput) return;
        
        recordMetric({
          type: 'layout',
          name: 'cumulative-layout-shift',
          value: entry.value,
          timestamp: Date.now(),
          metadata: {
            url: window.location.pathname
          }
        });
      });
    });
    
    layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('Layout Shift observer not supported', e);
  }
  
  // Monitor largest contentful paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      recordMetric({
        type: 'paint',
        name: 'largest-contentful-paint',
        value: lastEntry.startTime,
        timestamp: Date.now(),
        metadata: {
          size: lastEntry.size,
          url: window.location.pathname
        }
      });
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observer not supported', e);
  }
  
  // Monitor first input delay
  try {
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        recordMetric({
          type: 'interaction',
          name: 'first-input-delay',
          value: entry.processingStart - entry.startTime,
          timestamp: Date.now(),
          metadata: {
            url: window.location.pathname
          }
        });
      });
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observer not supported', e);
  }
  
  // Monitor resource timing
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Only monitor important resources
        if (
          entry.initiatorType === 'fetch' || 
          entry.initiatorType === 'xmlhttprequest' ||
          entry.initiatorType === 'script' ||
          entry.initiatorType === 'css'
        ) {
          recordMetric({
            type: 'resource',
            name: entry.name.split('/').pop() || entry.name,
            value: entry.duration,
            timestamp: Date.now(),
            metadata: {
              url: entry.name,
              initiatorType: entry.initiatorType,
              size: (entry as PerformanceResourceTiming).transferSize || 0
            }
          });
        }
      });
    });
    
    resourceObserver.observe({ type: 'resource', buffered: true });
  } catch (e) {
    console.warn('Resource observer not supported', e);
  }
  
  // Monitor memory usage if available
  if ((performance as any).memory) {
    setInterval(() => {
      recordMetric({
        type: 'memory',
        name: 'heap-size',
        value: (performance as any).memory.usedJSHeapSize,
        timestamp: Date.now(),
        metadata: {
          totalHeapSize: (performance as any).memory.totalJSHeapSize,
          heapLimit: (performance as any).memory.jsHeapSizeLimit
        }
      });
    }, 30000); // Check every 30 seconds
  }
}

/**
 * Record a performance metric
 * @param metric Performance metric to record
 */
export function recordMetric(metric: PerformanceMetric): void {
  metrics.push(metric);
  
  // Trim metrics array if it gets too large
  if (metrics.length > defaultMonitorConfig.maxEntries) {
    metrics.shift();
  }
  
  // Log metric if debug level is appropriate
  if (defaultMonitorConfig.logLevel === 'debug') {
    console.debug('Performance metric:', metric);
  }
}

/**
 * Record a custom performance metric
 * @param name Metric name
 * @param value Metric value
 * @param metadata Additional metadata
 */
export function recordCustomMetric(
  name: string,
  value: number,
  metadata?: Record<string, any>
): void {
  recordMetric({
    type: 'custom',
    name,
    value,
    timestamp: Date.now(),
    metadata
  });
}

/**
 * Measure the execution time of a function
 * @param fn Function to measure
 * @param metricName Name to use for the metric
 * @returns The original function wrapped with timing measurement
 */
export function measureExecutionTime<T extends (...args: any[]) => any>(
  fn: T,
  metricName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return function(...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = fn(...args);
    
    // For promises, measure when they resolve
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - start;
        recordCustomMetric(metricName, duration, { async: true });
      }) as ReturnType<T>;
    }
    
    // For synchronous functions, measure immediately
    const duration = performance.now() - start;
    recordCustomMetric(metricName, duration, { async: false });
    
    return result;
  };
}

/**
 * Report collected metrics to server
 * @param endpoint API endpoint to send metrics to
 */
function reportMetricsToServer(endpoint: string = '/api/metrics'): void {
  if (metrics.length === 0) return;
  
  // Clone metrics to avoid race conditions
  const metricsToSend = [...metrics];
  
  // Clear metrics array
  metrics.length = 0;
  
  // Send metrics to server
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metrics: metricsToSend,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      url: window.location.href
    }),
    // Use keepalive to ensure the request completes even if the page is unloaded
    keepalive: true
  }).catch(error => {
    console.warn('Failed to report metrics:', error);
    
    // Add metrics back to the queue if sending failed
    metrics.push(...metricsToSend);
  });
}

/**
 * Get collected performance metrics
 * @returns Array of collected metrics
 */
export function getCollectedMetrics(): PerformanceMetric[] {
  return [...metrics];
}

/**
 * Clear collected performance metrics
 */
export function clearMetrics(): void {
  metrics.length = 0;
}
