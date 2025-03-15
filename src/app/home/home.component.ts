import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    title = 'meskhi-2000';
    currentSlide = 0;
    maxSlide = 4;
    slides = [
      { imageUrl: '/api/placeholder/1000/400', alt: 'Meskhi 2000 Product 1' },
      { imageUrl: '/api/placeholder/1000/400', alt: 'Meskhi 2000 Product 2' },
      { imageUrl: '/api/placeholder/1000/400', alt: 'Meskhi 2000 Product 3' },
      { imageUrl: '/api/placeholder/1000/400', alt: 'Meskhi 2000 Product 4' },
      { imageUrl: '/api/placeholder/1000/400', alt: 'Meskhi 2000 Product 5' }
    ];
    
    // Automatic slide timer reference
    private slideInterval: any;
  
    ngOnInit(): void {
      // Start automatic slider
      this.startAutoSlide();
    }
  
    ngOnDestroy(): void {
      // Clear the interval when component is destroyed
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
    }
  
    nextSlide(): void {
      if (this.currentSlide === this.maxSlide) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
    }
  
    prevSlide(): void {
      if (this.currentSlide === 0) {
        this.currentSlide = this.maxSlide;
      } else {
        this.currentSlide--;
      }
    }
  
    setCurrentSlide(index: number): void {
      this.currentSlide = index;
    }
  
    startAutoSlide(): void {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  
    resetAutoSlideTimer(): void {
      // Reset the timer when user interacts with the slider
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
      this.startAutoSlide();
    }
}
