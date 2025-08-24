import { Injectable } from '@angular/core';

export interface ImageSize {
  width: number;
  height: number;
  quality: number;
  format: 'webp' | 'jpg' | 'png';
}

export interface OptimizedImage {
  src: string;
  srcset: string;
  sizes: string;
  webp: string;
  fallback: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizerService {
  
  // Predefined image sizes for different use cases
  private readonly imageSizes: { [key: string]: ImageSize } = {
    thumb: { width: 150, height: 150, quality: 80, format: 'webp' },
    small: { width: 300, height: 300, quality: 85, format: 'webp' },
    medium: { width: 600, height: 600, quality: 90, format: 'webp' },
    large: { width: 1200, height: 1200, quality: 95, format: 'webp' },
    xlarge: { width: 1920, height: 1920, quality: 95, format: 'webp' }
  };

  // Responsive breakpoints
  private readonly breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1440
  };

  /**
   * Generate optimized image paths for different sizes and formats
   */
  getOptimizedImage(category: string, imageName: string, size: keyof typeof this.imageSizes = 'medium'): OptimizedImage {
    const basePath = `/assets/images/${category}`;
    const nameWithoutExt = imageName.replace(/\.[^/.]+$/, '');
    const sizeConfig = this.imageSizes[size];
    
    // Generate WebP version
    const webpPath = `${basePath}/optimized/${nameWithoutExt}_${size}.webp`;
    
    // Generate fallback JPEG version
    const jpegPath = `${basePath}/optimized/${nameWithoutExt}_${size}.jpg`;
    
    // Generate srcset for responsive images
    const srcset = this.generateSrcset(category, nameWithoutExt, size);
    
    // Generate sizes attribute for responsive images
    const sizes = this.generateSizes(size);
    
    return {
      src: jpegPath, // Fallback for older browsers
      srcset: srcset,
      sizes: sizes,
      webp: webpPath,
      fallback: jpegPath
    };
  }

  /**
   * Generate responsive srcset for different screen sizes
   */
  private generateSrcset(category: string, imageName: string, baseSize: keyof typeof this.imageSizes): string {
    const srcsetParts: string[] = [];
    
    // Add different sizes for responsive images
    Object.entries(this.imageSizes).forEach(([size, config]) => {
      const path = `/assets/images/${category}/optimized/${imageName}_${size}.${config.format}`;
      srcsetParts.push(`${path} ${config.width}w`);
    });
    
    return srcsetParts.join(', ');
  }

  /**
   * Generate sizes attribute for responsive images
   */
  private generateSizes(size: keyof typeof this.imageSizes): string {
    switch (size) {
      case 'thumb':
        return '150px';
      case 'small':
        return '(max-width: 480px) 100vw, 300px';
      case 'medium':
        return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 600px';
      case 'large':
        return '(max-width: 480px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 1200px';
      case 'xlarge':
        return '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 1920px';
      default:
        return '100vw';
    }
  }

  /**
   * Get the best image size for a given container width
   */
  getOptimalImageSize(containerWidth: number): keyof typeof this.imageSizes {
    if (containerWidth <= this.breakpoints.mobile) {
      return 'small';
    } else if (containerWidth <= this.breakpoints.tablet) {
      return 'medium';
    } else if (containerWidth <= this.breakpoints.desktop) {
      return 'large';
    } else {
      return 'xlarge';
    }
  }

  /**
   * Generate placeholder data URL for lazy loading
   */
  generatePlaceholder(width: number, height: number): string {
    // Generate a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#2d4a6b"/>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2d4a6b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a2a3a;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Check if WebP is supported by the browser
   */
  isWebPSupported(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Preload critical images
   */
  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
      img.src = src;
    });
  }

  /**
   * Get image dimensions from file
   */
  getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => reject(new Error('Failed to get image dimensions'));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Calculate optimal compression quality based on image size
   */
  getOptimalQuality(width: number, height: number): number {
    const pixels = width * height;
    
    if (pixels <= 150 * 150) {
      return 80; // Thumbnails
    } else if (pixels <= 600 * 600) {
      return 85; // Small images
    } else if (pixels <= 1200 * 1200) {
      return 90; // Medium images
    } else {
      return 95; // Large images
    }
  }

  /**
   * Generate image optimization recommendations
   */
  getOptimizationRecommendations(originalSize: number, currentFormat: string): string[] {
    const recommendations: string[] = [];
    
    // File size recommendations
    if (originalSize > 500 * 1024) { // 500KB
      recommendations.push('Consider reducing image dimensions');
      recommendations.push('Use WebP format for better compression');
      recommendations.push('Implement progressive JPEG loading');
    }
    
    // Format recommendations
    if (currentFormat.toLowerCase() === 'png' && originalSize > 200 * 1024) {
      recommendations.push('Convert PNG to WebP for better compression');
    }
    
    // Quality recommendations
    if (originalSize > 1 * 1024 * 1024) { // 1MB
      recommendations.push('Reduce image quality to 85-90%');
      recommendations.push('Implement responsive images with multiple sizes');
    }
    
    return recommendations;
  }
}
