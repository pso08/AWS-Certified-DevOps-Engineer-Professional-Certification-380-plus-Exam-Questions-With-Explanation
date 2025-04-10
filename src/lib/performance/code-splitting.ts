// Code splitting and lazy loading utilities for improved performance

import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * Configuration for lazy loading components
 */
export interface LazyLoadConfig {
  fallback?: React.ReactNode;
  preload?: boolean;
  errorBoundary?: boolean;
}

/**
 * Enhanced lazy loading function with preloading capability
 * @param factory Function that imports the component
 * @param config Lazy loading configuration
 * @returns Lazy loaded component
 */
export function lazyLoad<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  config: LazyLoadConfig = {}
): LazyExoticComponent<T> & { preload: () => void } {
  const LazyComponent = lazy(factory);
  
  // Add preload method to the lazy component
  const EnhancedLazyComponent = LazyComponent as LazyExoticComponent<T> & { preload: () => void };
  
  // Add preload method
  EnhancedLazyComponent.preload = () => {
    factory().catch(() => {
      // Silently catch preload errors
    });
  };
  
  // Preload immediately if configured
  if (config.preload) {
    EnhancedLazyComponent.preload();
  }
  
  return EnhancedLazyComponent;
}

/**
 * Preloads components when user hovers over links
 * @param selector CSS selector for links to watch
 * @param getComponent Function that returns the component to preload based on the link
 */
export function setupLinkPreloading(
  selector: string = 'a[data-preload]',
  getComponent: (link: HTMLAnchorElement) => { preload: () => void } | null
): void {
  if (typeof window === 'undefined') return;
  
  const preloadComponent = (link: HTMLAnchorElement) => {
    const component = getComponent(link);
    if (component) {
      component.preload();
    }
  };
  
  // Setup intersection observer for links that are visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        
        // Add event listeners for hover and touch
        link.addEventListener('mouseenter', () => preloadComponent(link), { once: true });
        link.addEventListener('touchstart', () => preloadComponent(link), { once: true });
        
        // Stop observing once we've added the listeners
        observer.unobserve(link);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.01
  });
  
  // Start observing links
  document.querySelectorAll(selector).forEach(link => {
    observer.observe(link as HTMLAnchorElement);
  });
}

/**
 * Dynamically imports CSS when needed
 * @param href URL of the CSS file
 * @returns Promise that resolves when the CSS is loaded
 */
export function loadCSS(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the stylesheet is already loaded
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    
    document.head.appendChild(link);
  });
}

/**
 * Dynamically imports JavaScript when needed
 * @param src URL of the JavaScript file
 * @param async Whether to load the script asynchronously
 * @returns Promise that resolves when the script is loaded
 */
export function loadScript(src: string, async: boolean = true): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
}

/**
 * Prefetches a page for faster navigation
 * @param url URL to prefetch
 */
export function prefetchPage(url: string): void {
  if (typeof window === 'undefined') return;
  
  // Check if the link is already prefetched
  if (document.querySelector(`link[rel="prefetch"][href="${url}"]`)) {
    return;
  }
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = 'document';
  
  document.head.appendChild(link);
}

/**
 * Sets up automatic prefetching for visible links
 * @param selector CSS selector for links to prefetch
 */
export function setupAutoPrefetch(selector: string = 'a[data-prefetch]'): void {
  if (typeof window === 'undefined') return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute('href');
        
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          prefetchPage(href);
        }
        
        // Stop observing once prefetched
        observer.unobserve(link);
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.01
  });
  
  // Start observing links
  document.querySelectorAll(selector).forEach(link => {
    observer.observe(link as HTMLAnchorElement);
  });
}
