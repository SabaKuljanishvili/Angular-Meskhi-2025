import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  animateElements: boolean[] = [];

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          this.animateElements[index] = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const elements = document.querySelectorAll('.animate-element');
    elements.forEach((element, index) => {
      observer.observe(element);
    });
  }
}

