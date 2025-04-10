// Server-side rendering and data fetching optimization utilities

/**
 * Configuration for data fetching optimization
 */
export interface DataFetchConfig {
  revalidate?: number; // Time in seconds to revalidate data
  dedupe?: boolean;    // Whether to deduplicate requests
  retry?: number;      // Number of retry attempts
  retryDelay?: number; // Delay between retries in milliseconds
  fallback?: any;      // Fallback data if fetch fails
}

/**
 * Default data fetch configuration
 */
export const defaultFetchConfig: DataFetchConfig = {
  revalidate: 60,
  dedupe: true,
  retry: 3,
  retryDelay: 1000,
  fallback: null
};

// Store for deduplicating in-flight requests
const inFlightRequests = new Map<string, Promise<any>>();

/**
 * Enhanced fetch function with caching, deduplication, and retry logic
 * @param url URL to fetch
 * @param options Fetch options
 * @param config Data fetch configuration
 * @returns Promise with the fetched data
 */
export async function enhancedFetch<T>(
  url: string,
  options: RequestInit = {},
  config: DataFetchConfig = {}
): Promise<T> {
  // Merge with default config
  const finalConfig = { ...defaultFetchConfig, ...config };
  
  // Create a cache key based on URL and options
  const cacheKey = `${url}:${JSON.stringify(options)}`;
  
  // Check if we already have an in-flight request for this URL
  if (finalConfig.dedupe && inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) as Promise<T>;
  }
  
  // Function to perform the actual fetch with retry logic
  const fetchWithRetry = async (attemptsLeft: number): Promise<T> => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (attemptsLeft > 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, finalConfig.retryDelay));
        return fetchWithRetry(attemptsLeft - 1);
      }
      
      // If we've run out of retries and have a fallback, return it
      if (finalConfig.fallback !== undefined) {
        return finalConfig.fallback;
      }
      
      // Otherwise, throw the error
      throw error;
    }
  };
  
  // Create the fetch promise
  const fetchPromise = fetchWithRetry(finalConfig.retry || 1);
  
  // Store the promise for deduplication
  if (finalConfig.dedupe) {
    inFlightRequests.set(cacheKey, fetchPromise);
    
    // Clean up after the request is complete
    fetchPromise.finally(() => {
      inFlightRequests.delete(cacheKey);
    });
  }
  
  return fetchPromise;
}

/**
 * Prefetches data for faster page transitions
 * @param urls Array of URLs to prefetch
 * @param options Fetch options
 */
export function prefetchData(urls: string[], options: RequestInit = {}): void {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    enhancedFetch(url, options, { dedupe: true, retry: 1 })
      .catch(() => {
        // Silently fail prefetch attempts
      });
  });
}

/**
 * Progressively loads data in chunks to improve perceived performance
 * @param fetchFn Function that fetches a chunk of data
 * @param totalChunks Total number of chunks to fetch
 * @param onChunkLoaded Callback when a chunk is loaded
 * @param onComplete Callback when all chunks are loaded
 */
export async function progressiveDataLoad<T>(
  fetchFn: (chunkIndex: number) => Promise<T>,
  totalChunks: number,
  onChunkLoaded: (data: T, index: number) => void,
  onComplete: (allData: T[]) => void
): Promise<void> {
  const results: T[] = [];
  
  // Load first chunk immediately
  try {
    const firstChunk = await fetchFn(0);
    results.push(firstChunk);
    onChunkLoaded(firstChunk, 0);
    
    // Load remaining chunks in parallel
    const remainingChunks = Array.from({ length: totalChunks - 1 }, (_, i) => i + 1);
    
    await Promise.all(
      remainingChunks.map(async (index) => {
        try {
          const chunk = await fetchFn(index);
          results[index] = chunk;
          onChunkLoaded(chunk, index);
        } catch (error) {
          console.error(`Failed to load chunk ${index}:`, error);
        }
      })
    );
    
    // Call complete callback with all loaded data
    onComplete(results.filter(Boolean));
  } catch (error) {
    console.error('Failed to load initial data chunk:', error);
  }
}

/**
 * Optimizes data by only sending the fields that are needed
 * @param data Original data object
 * @param fields Array of field paths to include
 * @returns Filtered data object
 */
export function optimizeDataPayload<T extends Record<string, any>>(
  data: T,
  fields: string[]
): Partial<T> {
  const result: Partial<T> = {};
  
  fields.forEach(field => {
    const parts = field.split('.');
    let current = data;
    let target = result;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (current === undefined || current === null) {
        break;
      }
      
      if (i === parts.length - 1) {
        // Last part, set the value
        target[part as keyof typeof target] = current[part];
      } else {
        // Not the last part, create nested object if needed
        current = current[part];
        target[part as keyof typeof target] = target[part as keyof typeof target] || {};
        target = target[part as keyof typeof target] as any;
      }
    }
  });
  
  return result;
}
