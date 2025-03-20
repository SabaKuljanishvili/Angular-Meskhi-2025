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
  @ViewChild('animatedDiv') animatedDiv!: ElementRef;

  ngAfterViewInit(): void {
    this.onScroll(); // თავიდანვე ვამოწმებთ, ჩანს თუ არა ეკრანზე
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.animatedDiv) return; // დაცვა შეცდომისგან
    const element = this.animatedDiv.nativeElement;
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100; // 100px ზღვარი

    if (isVisible) {
      element.classList.add('scrolled-in');
    }
  }
}

