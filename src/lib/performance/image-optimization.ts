// Image optimization utilities for improved performance

/**
 * Configuration for image optimization
 */
export interface ImageOptimizationConfig {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  width?: number;
  height?: number;
  placeholder?: boolean;
}

/**
 * Default image optimization configuration
 */
export const defaultImageConfig: ImageOptimizationConfig = {
  quality: 80,
  format: 'webp',
  placeholder: true
};

/**
 * Generates an optimized image URL for the given source
 * @param src Original image source
 * @param config Optimization configuration
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(src: string, config: ImageOptimizationConfig = {}): string {
  // Merge with default config
  const finalConfig = { ...defaultImageConfig, ...config };
  
  // For external URLs, we would use an image optimization service
  // For this implementation, we'll just return a mock URL structure
  if (src.startsWith('http')) {
    const url = new URL(src);
    const params = new URLSearchParams();
    
    if (finalConfig.width) params.append('w', finalConfig.width.toString());
    if (finalConfig.height) params.append('h', finalConfig.height.toString());
    if (finalConfig.quality) params.append('q', finalConfig.quality.toString());
    if (finalConfig.format) params.append('fm', finalConfig.format);
    
    // In a real implementation, this would be a call to an image optimization service
    // For now, we'll just append the parameters to the URL
    return `${url.origin}${url.pathname}?${params.toString()}`;
  }
  
  // For local images, we would use Next.js Image component
  // Just return the original source for now
  return src;
}

/**
 * Generates a low-quality image placeholder
 * @param src Original image source
 * @param width Placeholder width
 * @returns Base64 encoded placeholder image
 */
export function generateImagePlaceholder(src: string, width: number = 10): string {
  // In a real implementation, this would generate a tiny base64 encoded image
  // For this mock implementation, we'll return a placeholder string
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${Math.floor(width * 0.6)}' fill='%23f3f4f6'%3E%3Crect width='${width}' height='${Math.floor(width * 0.6)}' /%3E%3C/svg%3E`;
}

/**
 * Preloads critical images for faster rendering
 * @param imageSrcs Array of image sources to preload
 */
export function preloadCriticalImages(imageSrcs: string[]): void {
  if (typeof window === 'undefined') return;
  
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Lazy loads images as they enter the viewport
 * @param imageSelector CSS selector for images to lazy load
 */
export function setupLazyLoading(imageSelector: string = 'img[data-src]'): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const loadImage = (image: HTMLImageElement) => {
    const src = image.getAttribute('data-src');
    if (!src) return;
    
    image.src = src;
    image.removeAttribute('data-src');
    image.classList.add('loaded');
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target as HTMLImageElement);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  document.querySelectorAll(imageSelector).forEach(image => {
    observer.observe(image);
  });
}

/**
 * Responsive image helper that generates srcset for different screen sizes
 * @param src Base image source
 * @param widths Array of widths for different screen sizes
 * @param config Base optimization configuration
 * @returns Object with src and srcset attributes
 */
export function getResponsiveImageAttributes(
  src: string, 
  widths: number[] = [640, 750, 828, 1080, 1200, 1920], 
  config: ImageOptimizationConfig = {}
): { src: string, srcset: string } {
  const finalConfig = { ...defaultImageConfig, ...config };
  
  // Generate srcset with different widths
  const srcset = widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(src, { ...finalConfig, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
  
  // Default src is the middle size
  const defaultWidth = widths[Math.floor(widths.length / 2)];
  const defaultSrc = getOptimizedImageUrl(src, { ...finalConfig, width: defaultWidth });
  
  return {
    src: defaultSrc,
    srcset
  };
}
