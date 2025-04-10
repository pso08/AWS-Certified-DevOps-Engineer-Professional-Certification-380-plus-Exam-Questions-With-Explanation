// Main performance optimization index file
// Export all performance utilities from a single entry point

export * from './cache';
export * from './image-optimization';
export * from './data-fetching';
export * from './code-splitting';
export * from './monitoring';

// Performance optimization hooks and utilities

import { useEffect, useState, useCallback, useRef } from 'react';
import { debounce, throttle } from './cache';

/**
 * Hook to detect when an element is visible in the viewport
 * @param options IntersectionObserver options
 * @returns [ref, isVisible] tuple
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.1 }
): [React.RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [options]);
  
  return [ref, isVisible];
}

/**
 * Hook to create a debounced function
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    debounce((...args: Parameters<T>) => callbackRef.current(...args), delay),
    [delay]
  );
}

/**
 * Hook to create a throttled function
 * @param callback Function to throttle
 * @param limit Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return useCallback(
    throttle((...args: Parameters<T>) => callbackRef.current(...args), limit),
    [limit]
  );
}

/**
 * Hook to measure component render time
 * @param componentName Name of the component
 */
export function useRenderTiming(componentName: string): void {
  const startTimeRef = useRef(performance.now());
  
  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    
    // Record render timing as a custom metric
    if (typeof window !== 'undefined') {
      // Import dynamically to avoid circular dependencies
      import('./monitoring').then(({ recordCustomMetric }) => {
        recordCustomMetric(`render-time-${componentName}`, duration, {
          component: componentName
        });
      });
    }
    
    // Reset start time for next render
    startTimeRef.current = performance.now();
  });
}

/**
 * Hook to detect network status changes
 * @returns Object with online status and connection information
 */
export function useNetworkStatus(): {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
} {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  
  const [connectionInfo, setConnectionInfo] = useState<{
    effectiveType?: string;
    downlink?: number;
    saveData?: boolean;
  }>({});
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
    };
    
    const updateConnectionInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        setConnectionInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          saveData: connection.saveData
        });
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionInfo);
      updateConnectionInfo();
    }
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);
  
  return { online, ...connectionInfo };
}

/**
 * Hook to detect when the user is idle
 * @param idleTime Time in milliseconds before user is considered idle
 * @returns Whether the user is idle
 */
export function useIdleDetection(idleTime: number = 60000): boolean {
  const [isIdle, setIsIdle] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let idleTimer: NodeJS.Timeout;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      idleTimer = setTimeout(() => setIsIdle(true), idleTime);
    };
    
    // User activity events
    const events = [
      'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart',
      'click', 'keydown', 'resize'
    ];
    
    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });
    
    // Initial timer
    resetIdleTimer();
    
    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [idleTime]);
  
  return isIdle;
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations(): void {
  if (typeof window === 'undefined') return;
  
  // Import and initialize performance monitoring
  import('./monitoring').then(({ initPerformanceMonitoring }) => {
    initPerformanceMonitoring({
      sampleRate: 100, // Monitor all users in development
      logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
      reportToServer: process.env.NODE_ENV === 'production'
    });
  });
  
  // Setup link prefetching
  import('./code-splitting').then(({ setupAutoPrefetch }) => {
    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      setupAutoPrefetch();
    } else {
      window.addEventListener('load', () => {
        setupAutoPrefetch();
      });
    }
  });
  
  // Setup image lazy loading
  import('./image-optimization').then(({ setupLazyLoading }) => {
    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      setupLazyLoading();
    } else {
      window.addEventListener('load', () => {
        setupLazyLoading();
      });
    }
  });
}
