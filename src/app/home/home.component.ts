import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChildren('scrollAnimate') animatedElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.onScroll(); // თავიდანვე შეამოწმოს ელემენტები
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const windowHeight = window.innerHeight;

    this.animatedElements.forEach((elementRef: ElementRef) => {
      const element = elementRef.nativeElement;
      const position = element.getBoundingClientRect().top;

      if (position < windowHeight - 100) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
}

