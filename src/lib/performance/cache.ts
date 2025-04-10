// Cache utility functions for improved performance

/**
 * Creates a memoized version of a function that caches its results
 * @param fn The function to memoize
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Creates a debounced version of a function that delays its execution
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Creates a throttled version of a function that limits its execution frequency
 * @param fn The function to throttle
 * @param limit The minimum time between executions in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= limit) {
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, limit - timeSinceLastCall);
    }
  };
}

/**
 * Creates a cached version of an async function with a specified TTL
 * @param fn The async function to cache
 * @param ttl Time to live in milliseconds
 * @returns A cached version of the async function
 */
export function cachifyAsync<T extends (...args: any[]) => Promise<any>>(fn: T, ttl: number = 60000): T {
  const cache = new Map<string, { value: any, timestamp: number }>();
  
  return (async (...args: any[]) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    const now = Date.now();
    
    if (cached && now - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = await fn(...args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  }) as T;
}

/**
 * Local storage wrapper with expiration
 */
export const localStorageWithExpiry = {
  /**
   * Set an item in localStorage with expiration
   * @param key The key to store the data under
   * @param value The value to store
   * @param ttl Time to live in milliseconds
   */
  setItem: (key: string, value: any, ttl: number): void => {
    const item = {
      value,
      expiry: ttl ? Date.now() + ttl : null,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  /**
   * Get an item from localStorage, respecting expiration
   * @param key The key to retrieve
   * @returns The stored value, or null if expired or not found
   */
  getItem: (key: string): any => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    try {
      const item = JSON.parse(itemStr);
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  },
  
  /**
   * Remove an item from localStorage
   * @param key The key to remove
   */
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  /**
   * Clear all items from localStorage
   */
  clear: (): void => {
    localStorage.clear();
  }
};
