// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, HostListener, ViewChildren, } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, ],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent {

// }

// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, HostListener, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent implements AfterViewInit {
//   // Query all elements that should be animated
//   @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  
//   // Track which elements have already been animated
//   private animatedIds: Set<number> = new Set();
  
//   constructor() {}
  
//   ngAfterViewInit() {
//     // Initial check for elements in viewport on page load
//     setTimeout(() => {
//       this.checkElementsInViewport();
//     }, 100);
//   }
  
//   // Listen for scroll events
//   @HostListener('window:scroll', ['$event'])
//   onScroll() {
//     this.checkElementsInViewport();
//   }
  
//   // Check if elements are in viewport and should be animated
//   private checkElementsInViewport() {
//     if (!this.animatedElements) return;
    
//     this.animatedElements.forEach((element, index) => {
//       // Skip already animated elements
//       if (this.animatedIds.has(index)) return;
      
//       const elementPosition = element.nativeElement.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       // If element is in viewport (with some offset for better effect)
//       if (elementPosition.top < windowHeight - 100) {
//         // Add the visible class to trigger animation
//         element.nativeElement.classList.add('visible');
//         // Mark this element as already animated
//         this.animatedIds.add(index);
//       }
//     });
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  // Query all elements that should be animated
  @ViewChildren('animateOnScroll') animatedElements!: QueryList<ElementRef>;
  
  // Track which elements have already been animated
  private animatedIds: Set<number> = new Set();
  
  // Flag to indicate if JS is running
  isJsWorking = false;
  
  constructor() {}
  
  ngAfterViewInit() {
    // Set JS working flag to true
    this.isJsWorking = true;
    
    // Apply the js-working class to the body to trigger CSS
    document.body.classList.add('js-working');
    
    // Initial check for elements in viewport on page load
    setTimeout(() => {
      this.checkElementsInViewport();
    }, 100);
  }
  
  // Listen for scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkElementsInViewport();
  }
  
  // Check if elements are in viewport and should be animated
  private checkElementsInViewport() {
    if (!this.animatedElements) return;
    
    this.animatedElements.forEach((element, index) => {
      // Skip already animated elements
      if (this.animatedIds.has(index)) return;
      
      const elementPosition = element.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If element is in viewport (with some offset for better effect)
      if (elementPosition.top < windowHeight - 100) {
        // Add the visible class to trigger animation
        element.nativeElement.classList.add('visible');
        // Mark this element as already animated
        this.animatedIds.add(index);
      }
    });
  }
}