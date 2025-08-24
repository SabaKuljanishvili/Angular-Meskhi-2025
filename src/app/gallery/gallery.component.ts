import { Component, OnInit, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)'
  },
  template: `
    <section id="gallery" class="gallery">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ფოტო გალერეა</h2>
          <p class="section-subtitle">ჩვენი სამუშაოების ნიმუშები და პროდუქტები</p>
        </div>
        
        <!-- Main Photo Carousel -->
        <div class="main-carousel">
          <div class="carousel-container">
            <div class="carousel-track" [style.transform]="'translateX(' + (-currentSlide * 100) + '%)'">
              <div class="carousel-slide" *ngFor="let image of showcaseImages; let i = index">
                <div class="image-container">
                  <!-- Progressive loading with placeholder -->
                  <div class="image-placeholder" *ngIf="!imageLoaded[i]">
                    <div class="placeholder-content">
                      <div class="placeholder-spinner"></div>
                      <span>იტვირთება...</span>
                    </div>
                  </div>
                  
                  <!-- Optimized image for carousel -->
                  <img 
                    [src]="getOptimizedImagePath(showcaseCategories[i], image, 'large')" 
                    [alt]="'Showcase image ' + (i + 1)"
                    [loading]="'lazy'"
                    (load)="onImageLoad(i)"
                    (error)="onImageError(i)"
                    class="carousel-image"
                    [class.loaded]="imageLoaded[i]">
                </div>
                
                <div class="slide-overlay">
                  <div class="slide-content">
                    <h3>პროდუქტი {{ i + 1 }}</h3>
                    <p>{{ getCategoryName(showcaseCategories[i]) }}</p>
                    <button class="view-btn" (click)="openShowcaseLightbox(i)">
                      <i class="fas fa-eye"></i> ნახვა
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Carousel Navigation -->
            <button class="carousel-nav prev" (click)="previousSlide()" [disabled]="currentSlide === 0">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carousel-nav next" (click)="nextSlide()" [disabled]="currentSlide === showcaseImages.length - 1">
              <i class="fas fa-chevron-right"></i>
            </button>
            
            <!-- Carousel Indicators -->
            <div class="carousel-indicators">
              <button 
                class="indicator" 
                *ngFor="let image of showcaseImages; let i = index"
                [class.active]="currentSlide === i"
                (click)="goToSlide(i)">
              </button>
            </div>
            
            <!-- Play/Pause Button -->
            <button class="play-pause-btn" (click)="toggleAutoplay()">
              <i [class]="isAutoplayActive ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>
          </div>
        </div>
        
        <!-- Category Tabs -->
        <div class="category-tabs">
          <button 
            class="tab-btn" 
            [class.active]="activeCategory === category.key"
            (click)="setActiveCategory(category.key)"
            *ngFor="let category of categories">
            {{ category.name }}
          </button>
        </div>
        
        <!-- Category Gallery with Grid Layout -->
        <div class="category-gallery">
          <div class="gallery-grid">
            <div class="gallery-item" 
                 *ngFor="let image of getCategoryImages(); let i = index; trackBy: trackByImage"
                 (click)="openLightbox(i)"
                 #galleryItem>
              <div class="image-container">
                <!-- Progressive loading with placeholder -->
                <div class="image-placeholder" *ngIf="!galleryImageLoaded[this.activeCategory][i]">
                  <div class="placeholder-content">
                    <div class="placeholder-spinner"></div>
                  </div>
                </div>
                
                <!-- Optimized image for gallery grid -->
                <img 
                  [src]="getOptimizedImagePath(activeCategory, image, 'medium')" 
                  [alt]="'Gallery image ' + (i + 1)"
                  [loading]="'lazy'"
                  (load)="onGalleryImageLoad(i)"
                  (error)="onGalleryImageError(i)"
                  class="gallery-image"
                  [class.loaded]="galleryImageLoaded[this.activeCategory][i]">
              </div>
              
              <div class="item-overlay">
                <i class="fas fa-search-plus"></i>
                <span class="image-title">{{ getImageTitle(image) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Enhanced Lightbox Modal -->
      <div class="lightbox" *ngIf="lightboxOpen" (click)="closeLightbox()">
        <div class="lightbox-content" 
             (click)="$event.stopPropagation()"
             (touchstart)="onLightboxTouchStart($event)"
             (touchmove)="onLightboxTouchMove($event)"
             (touchend)="onLightboxTouchEnd($event)">
          <button class="close-btn" (click)="closeLightbox()">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="lightbox-image-container">
            <!-- Progressive loading for lightbox -->
            <div class="lightbox-placeholder" *ngIf="!lightboxImageLoaded">
              <div class="placeholder-content">
                <div class="placeholder-spinner"></div>
                <span>იტვირთება...</span>
              </div>
            </div>
            
            <img 
              [src]="getOptimizedImagePath(activeCategory, getCurrentImageName(), 'xlarge')" 
              [alt]="'Lightbox image'"
              (load)="onLightboxImageLoad()"
              (error)="onLightboxImageError()"
              class="lightbox-image"
              [class.loaded]="lightboxImageLoaded">
            
            <div class="image-info">
              <h3>{{ getCurrentImageTitle() }}</h3>
              <p>{{ getCurrentImageCategory() }}</p>
            </div>
          </div>
          
          <div class="lightbox-nav">
            <button class="nav-btn prev" (click)="previousImage()">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn next" (click)="nextImage()">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="lightbox-thumbnails">
            <div class="lightbox-thumbnail" 
                 *ngFor="let image of getCurrentCategoryImages(); let i = index"
                 [class.active]="i === currentImageIndex"
                 (click)="goToImage(i)">
              <img [src]="getOptimizedImagePath(activeCategory, image, 'thumb')" 
                   [alt]="'Thumbnail ' + (i + 1)"
                   loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery {
      padding: 100px 0;
      background: linear-gradient(135deg, #1a2a3a 0%, #2d4a6b 100%);
      position: relative;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 700;
      color: #efe9db;
      margin-bottom: 20px;
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #d4af37, #b8860b);
      border-radius: 2px;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #d4af37;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Image Container and Placeholder Styles */
    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .image-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #2d4a6b 0%, #1a2a3a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .placeholder-content {
      text-align: center;
      color: #d4af37;
    }

    .placeholder-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(212, 175, 55, 0.3);
      border-top: 3px solid #d4af37;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 15px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .lightbox-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(26, 42, 58, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      border-radius: 15px;
    }

    /* Image Styles with Progressive Loading */
    .carousel-image,
    .gallery-image,
    .lightbox-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      /* Image optimization for faster loading */
      image-rendering: -webkit-optimize-contrast;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      /* Reduce image quality for faster loading on mobile */
      image-rendering: pixelated;
    }

    .carousel-image.loaded,
    .gallery-image.loaded,
    .lightbox-image.loaded {
      opacity: 1;
    }

    /* Main Carousel */
    .main-carousel {
      margin-bottom: 80px;
      position: relative;
    }

    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      touch-action: pan-y pinch-zoom;
      -webkit-overflow-scrolling: touch;
    }

    .carousel-slide {
      flex: 0 0 100%;
      position: relative;
      height: 500px;
    }

    .slide-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(26, 42, 58, 0.8) 0%, rgba(45, 74, 107, 0.6) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 2;
    }

    .carousel-slide:hover .slide-overlay {
      opacity: 1;
    }

    .slide-content {
      text-align: center;
      color: white;
      transform: translateY(20px);
      transition: transform 0.4s ease;
    }

    .carousel-slide:hover .slide-content {
      transform: translateY(0);
    }

    .slide-content h3 {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #d4af37;
    }

    .slide-content p {
      font-size: 1.2rem;
      margin-bottom: 25px;
      opacity: 0.9;
    }

    .view-btn {
      background: linear-gradient(135deg, #d4af37, #b8860b);
      color: #1a2a3a;
      border: none;
      padding: 15px 30px;
      border-radius: 25px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .view-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
    }

    /* Carousel Navigation */
    .carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(212, 175, 55, 0.9);
      border: none;
      color: #1a2a3a;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      z-index: 3;
    }

    .carousel-nav:hover:not(:disabled) {
      background: #d4af37;
      transform: translateY(-50%) scale(1.1);
    }

    .carousel-nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .carousel-nav.prev {
      left: 20px;
    }

    .carousel-nav.next {
      right: 20px;
    }

    /* Carousel Indicators */
    .carousel-indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 3;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #d4af37;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active,
    .indicator:hover {
      background: #d4af37;
      transform: scale(1.2);
    }

    /* Play/Pause Button */
    .play-pause-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(212, 175, 55, 0.9);
      border: none;
      color: #1a2a3a;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
    }

    .play-pause-btn:hover {
      background: #d4af37;
      transform: scale(1.1);
    }

    /* Category Tabs */
    .category-tabs {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 50px;
      flex-wrap: wrap;
    }

    .tab-btn {
      background: transparent;
      color: #d4af37;
      border: 2px solid #d4af37;
      padding: 12px 25px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .tab-btn:hover,
    .tab-btn.active {
      background: #d4af37;
      color: #1a2a3a;
      transform: translateY(-2px);
    }

    /* Category Gallery */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 60px;
    }

    .gallery-item {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      aspect-ratio: 4/3;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .gallery-item:hover img {
      transform: scale(1.1);
    }

    .item-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: white;
      text-align: center;
      z-index: 2;
    }

    .gallery-item:hover .item-overlay {
      opacity: 1;
    }

    .item-overlay i {
      font-size: 2rem;
      margin-bottom: 10px;
      color: #d4af37;
    }

    .image-title {
      font-size: 1rem;
      font-weight: 500;
    }

    /* Enhanced Lightbox */
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      touch-action: manipulation;
      -webkit-overflow-scrolling: touch;
    }

    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      background: #1a2a3a;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
      touch-action: pan-x pan-y;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .lightbox-image-container {
      position: relative;
      margin-bottom: 20px;
      overflow: hidden;
    }

    .lightbox-image {
      width: 100%;
      height: auto;
      border-radius: 15px;
      max-height: 70vh;
      object-fit: contain;
      touch-action: pan-x pan-y;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .image-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
      padding: 20px;
      border-radius: 0 0 15px 15px;
    }

    .image-info h3 {
      margin: 0 0 5px 0;
      color: #d4af37;
    }

    .image-info p {
      margin: 0;
      opacity: 0.8;
    }

    .close-btn {
      position: absolute;
      top: -50px;
      right: 0;
      background: #d4af37;
      border: none;
      color: #1a2a3a;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .close-btn:hover {
      background: #b8860b;
      transform: scale(1.1);
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      pointer-events: none;
    }

    .nav-btn {
      background: rgba(212, 175, 55, 0.9);
      border: none;
      color: #1a2a3a;
      padding: 15px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      pointer-events: auto;
    }

    .nav-btn:hover {
      background: #d4af37;
      transform: scale(1.1);
    }

    .lightbox-thumbnails {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
      overflow-x: auto;
      padding: 10px 0;
    }

    .lightbox-thumbnail {
      flex-shrink: 0;
      width: 80px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .lightbox-thumbnail:hover {
      transform: scale(1.05);
      border-color: #d4af37;
    }

    .lightbox-thumbnail.active {
      border-color: #d4af37;
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
    }

    .lightbox-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .gallery {
        padding: 60px 0;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
      
      .section-subtitle {
        font-size: 1.1rem;
      }
      
      .carousel-slide {
        height: 350px;
      }
      
      .slide-content h3 {
        font-size: 2rem;
      }
      
      .slide-content p {
        font-size: 1rem;
      }
      
      .view-btn {
        padding: 12px 25px;
        font-size: 1rem;
      }
      
      /* Hide navigation buttons on tablet and below */
      .carousel-nav {
        display: none;
      }
      
      /* Hide play/pause button on tablet and below */
      .play-pause-btn {
        display: none;
      }
      
      .lightbox-content {
        padding: 15px;
      }
      
      .lightbox-thumbnails {
        gap: 8px;
      }
      
      .lightbox-thumbnail {
        width: 60px;
        height: 45px;
      }
      
      .category-tabs {
        gap: 15px;
      }
      
      .tab-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
      }
      
      .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }
      
      /* Mobile scrolling optimizations */
      .gallery {
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
      }
      
      .carousel-container {
        touch-action: pan-y;
      }
      
      .gallery-grid {
        touch-action: pan-y;
      }
    }

    @media (max-width: 480px) {
      .gallery {
        padding: 40px 0;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .section-subtitle {
        font-size: 1rem;
      }
      
      .carousel-slide {
        height: 280px;
      }
      
      .slide-content h3 {
        font-size: 1.6rem;
      }
      
      .slide-content p {
        font-size: 0.9rem;
      }
      
      .view-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
      }
      
      .category-tabs {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      
      .tab-btn {
        width: 100%;
        max-width: 200px;
      }
      
      .gallery-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .gallery-item {
        aspect-ratio: 3/2;
      }
      
      .lightbox-content {
        padding: 10px;
        max-width: 95%;
        max-height: 95%;
      }
      
      .lightbox-image {
        max-height: 60vh;
      }
      
      .lightbox-thumbnails {
        gap: 5px;
      }
      
      .lightbox-thumbnail {
        width: 50px;
        height: 40px;
      }
      
      /* Hide lightbox navigation buttons on mobile for better touch experience */
      .lightbox-nav {
        display: none;
      }
    }

    @media (max-width: 360px) {
      .carousel-slide {
        height: 250px;
      }
      
      .slide-content h3 {
        font-size: 1.4rem;
      }
      
      .view-btn {
        padding: 8px 16px;
        font-size: 0.8rem;
      }
      
      .section-title {
        font-size: 1.8rem;
      }
    }

    /* Performance optimizations */
    .gallery-item {
      will-change: transform;
      backface-visibility: hidden;
      transform: translateZ(0);
    }

    .carousel-slide {
      will-change: transform;
      backface-visibility: hidden;
    }

    /* Loading states */
    .loading {
      opacity: 0.7;
      pointer-events: none;
    }

    /* Smooth transitions */
    .gallery-item img,
    .carousel-image {
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  `]
})
export class GalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  activeCategory = 'frezebi';
  lightboxOpen = false;
  currentLightboxImage = '';
  currentImageIndex = 0;
  currentSlide = 0;
  isAutoplayActive = true;
  autoplayInterval: any;
  
  // Image loading states
  imageLoaded: boolean[] = [];
  galleryImageLoaded: { [key: string]: boolean[] } = {};
  lightboxImageLoaded = false;
  
  // Touch/swipe variables
  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;
  minSwipeDistance = 50;

  // Intersection Observer for lazy loading
  private observer: IntersectionObserver | null = null;

  categories = [
    { key: 'frezebi', name: 'ფრეზები' },
    { key: 'cirkuli', name: 'ცირკული ხერხები' },
    { key: 'lenturi', name: 'ლენტური ხერხები' },
    { key: 'fuganebi', name: 'ფუგანები' }
  ];

  showcaseImages: string[] = [];
  showcaseCategories: string[] = [];

  ngOnInit() {
    this.initializeImageLoadingStates();
    this.generateRandomShowcase();
    this.startAutoplay();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeImageLoadingStates() {
    // Initialize loading states for showcase images
    this.imageLoaded = new Array(6).fill(false);
    
    // Initialize loading states for gallery images
    this.categories.forEach(category => {
      const images = this.getCategoryImages(category.key);
      this.galleryImageLoaded[category.key] = new Array(images.length).fill(false);
    });
  }

  private setupIntersectionObserver() {
    // Create intersection observer for lazy loading
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.setAttribute('src', dataSrc);
            img.removeAttribute('data-src');
            this.observer?.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  }

  // Image optimization methods - now using optimized images
  getOptimizedImagePath(category: string, imageName: string, size: 'thumb' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium'): string {
    const basePath = `/assets/images/${category}/optimized`;
    const nameWithoutExt = imageName.replace(/\.[^/.]+$/, '');
    
    // Return optimized image path with specified size
    return `${basePath}/${nameWithoutExt}_${size}.jpg`;
  }

  // Method to get lighter images for faster loading
  getLightImagePath(category: string, imageName: string): string {
    // For mobile devices, use smaller images
    const isMobile = window.innerWidth <= 768;
    const size = isMobile ? 'small' : 'medium';
    return this.getOptimizedImagePath(category, imageName, size);
  }

  // Image loading event handlers
  onImageLoad(index: number) {
    this.imageLoaded[index] = true;
  }

  onImageError(index: number) {
    console.warn(`Failed to load showcase image ${index}`);
    this.imageLoaded[index] = true; // Hide placeholder even on error
  }

  onGalleryImageLoad(index: number) {
    if (this.galleryImageLoaded[this.activeCategory]) {
      this.galleryImageLoaded[this.activeCategory][index] = true;
    }
  }

  onGalleryImageError(index: number) {
    console.warn(`Failed to load gallery image ${index} in category ${this.activeCategory}`);
    if (this.galleryImageLoaded[this.activeCategory]) {
      this.galleryImageLoaded[this.activeCategory][index] = true; // Hide placeholder
    }
  }

  onLightboxImageLoad() {
    this.lightboxImageLoaded = true;
  }

  onLightboxImageError() {
    console.warn('Failed to load lightbox image');
    this.lightboxImageLoaded = true; // Hide placeholder
  }

  // Track by function for better performance
  trackByImage(index: number, image: string): string {
    return image;
  }

  // Get current image name for lightbox
  getCurrentImageName(): string {
    const images = this.getCategoryImages();
    return images[this.currentImageIndex] || '';
  }

  startAutoplay() {
    if (this.isAutoplayActive) {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  toggleAutoplay() {
    this.isAutoplayActive = !this.isAutoplayActive;
    if (this.isAutoplayActive) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.showcaseImages.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.showcaseImages.length - 1;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
    this.currentImageIndex = 0;
    this.lightboxImageLoaded = false;
  }

  getCategoryImages(category?: string): string[] {
    const targetCategory = category || this.activeCategory;
    const categoryImages: { [key: string]: string[] } = {
      frezebi: [
        'IMG_8035.JPG',
        'IMG_8037.JPG',
        'IMG_8040.JPG',
        'IMG_8047.JPG',
        'IMG_8076.JPG',
        'IMG_8077.JPG',
        'almas.jpg',
        'almas patara.jpg',
        'mwvane.jpg',
        'oval.jpg',
        'pirebi.jpg',
        'sam piriani.jpg',
        'samk shtamp.jpg',
        'shtampi.jpg',
        'sul patara almas.jpg',
        'yviteli.jpg'
      ],
      cirkuli: [
        '369421033_989795648754152_5942018697328113652_n.jpg',
        '397943109_3648447392099634_2870897858034374988_n.jpg',
        '399925681_236709735906756_9167162424002679429_n.jpg',
        '399945711_3451246038354560_3658791609130255930_n.jpg',
        '400693450_653873343617285_8109933589587951763_n.jpg',
        'cirkul.jpg',
        'IMG_9085.JPG'
      ],
      lenturi: [
        '399846244_358388080061629_8178238030818943176_n.jpg',
        '7777.JPG',
        'axali 10.jpg',
        'lent.jpg'
      ],
      fuganebi: [
        '20230304_093527.jpg',
        '397094430_1023519958973654_2715802772958299837_n.jpg',
        '403397993_1105942323740318_2929485730047593812_n.jpg',
        'figani.jpg',
        'fugan.jpg',
        'fugani12.jpg',
        'fugani124.jpg',
        'good.jpg',
        'IMG_7969.JPG'
      ]
    };
    
    return categoryImages[targetCategory] || [];
  }

  getCurrentCategoryImages(): string[] {
    return this.getCategoryImages();
  }

  getImageTitle(filename: string): string {
    return filename.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
  }

  getCurrentImageTitle(): string {
    const images = this.getCategoryImages();
    if (images[this.currentImageIndex]) {
      return this.getImageTitle(images[this.currentImageIndex]);
    }
    return '';
  }

  getCurrentImageCategory(): string {
    const categoryNames: { [key: string]: string } = {
      frezebi: 'ფრეზები',
      cirkuli: 'ცირკული ხერხები',
      lenturi: 'ლენტური ხერხები',
      fuganebi: 'ფუგანები'
    };
    return categoryNames[this.activeCategory] || '';
  }

  openLightbox(index: number) {
    this.currentImageIndex = index;
    const images = this.getCategoryImages();
    this.currentLightboxImage = `${this.activeCategory}/${images[index]}`;
    this.lightboxOpen = true;
    this.lightboxImageLoaded = false;
    this.stopAutoplay();
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.startAutoplay();
  }

  nextImage() {
    const images = this.getCategoryImages();
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.currentLightboxImage = `${this.activeCategory}/${images[this.currentImageIndex]}`;
    this.lightboxImageLoaded = false;
  }

  previousImage() {
    const images = this.getCategoryImages();
    this.currentImageIndex = this.currentImageIndex === 0 ? images.length - 1 : this.currentImageIndex - 1;
    this.currentLightboxImage = `${this.activeCategory}/${images[this.currentImageIndex]}`;
    this.lightboxImageLoaded = false;
  }

  goToImage(index: number) {
    this.currentImageIndex = index;
    const images = this.getCategoryImages();
    this.currentLightboxImage = `${this.activeCategory}/${images[index]}`;
    this.lightboxImageLoaded = false;
  }

  generateRandomShowcase() {
    const allImages: { image: string; category: string }[] = [];
    
    // Collect all images from all categories
    this.categories.forEach(category => {
      const categoryImages = this.getCategoryImages(category.key);
      categoryImages.forEach(image => {
        allImages.push({ image, category: category.key });
      });
    });
    
    // Shuffle the array and take first 6 images
    const shuffled = this.shuffleArray(allImages);
    const selected = shuffled.slice(0, 6);
    
    this.showcaseImages = selected.map(item => item.image);
    this.showcaseCategories = selected.map(item => item.category);
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getCategoryName(categoryKey: string): string {
    const category = this.categories.find(cat => cat.key === categoryKey);
    return category ? category.name : '';
  }

  openShowcaseLightbox(index: number) {
    this.currentImageIndex = index;
    const category = this.showcaseCategories[index];
    const image = this.showcaseImages[index];
    this.currentLightboxImage = `${category}/${image}`;
    this.lightboxOpen = true;
    this.lightboxImageLoaded = false;
    this.stopAutoplay();
  }

  // Touch/Swipe methods
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onTouchMove(event: TouchEvent) {
    // Don't prevent default scrolling on mobile
    // Only prevent if it's a horizontal swipe for carousel
    const touch = event.changedTouches[0];
    const deltaX = Math.abs(touch.screenX - this.touchStartX);
    const deltaY = Math.abs(touch.screenY - this.touchStartY);
    
    // Only prevent default if it's clearly a horizontal swipe
    if (deltaX > deltaY && deltaX > 20) {
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipe();
  }

  handleSwipe() {
    const distanceX = this.touchStartX - this.touchEndX;
    const distanceY = this.touchStartY - this.touchEndY;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe && Math.abs(distanceX) > this.minSwipeDistance) {
      if (distanceX > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.previousSlide();
      }
    }
  }

  // Lightbox touch methods
  onLightboxTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onLightboxTouchMove(event: TouchEvent) {
    // Allow scrolling within the lightbox content
    event.stopPropagation();
    // Don't prevent default to allow normal scrolling
  }

  onLightboxTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleLightboxSwipe();
  }

  handleLightboxSwipe() {
    const distanceX = this.touchStartX - this.touchEndX;
    const distanceY = this.touchStartY - this.touchEndY;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe && Math.abs(distanceX) > this.minSwipeDistance) {
      if (distanceX > 0) {
        // Swipe left - next image
        this.nextImage();
      } else {
        // Swipe right - previous image
        this.previousImage();
      }
    }
  }
}
