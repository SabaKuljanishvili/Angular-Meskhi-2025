import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navigation">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-text">Meskhi 2000</span>
        </div>
        
        <ul class="nav-links" [class.active]="isMenuOpen">
          <li><a href="#hero" (click)="scrollToSection('hero'); closeMenu()">Home</a></li>
          <li><a href="#services" (click)="scrollToSection('services'); closeMenu()">Services</a></li>
          <li><a href="#gallery" (click)="scrollToSection('gallery'); closeMenu()">Gallery</a></li>
          <!-- <li><a href="#about" (click)="scrollToSection('about'); closeMenu()">About</a></li> -->
          <li><a href="#contact" (click)="scrollToSection('contact'); closeMenu()">Contact</a></li>
        </ul>
        
        <div class="nav-toggle" [class.active]="isMenuOpen" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(26, 42, 58, 0.95);
      backdrop-filter: blur(10px);
      z-index: 1000;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      max-width: 1400px;
      margin: 20px auto;
      border-radius: 20px;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      position: relative;
    }

    .logo-text {
      font-family: 'Orbitron', sans-serif;
      font-size: 24px;
      font-weight: bold;
      background: linear-gradient(135deg, #d4af37, #e4dcc0);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    }

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 30px;
    }

    .nav-links a {
      color: #efe9db;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      padding: 8px 0;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #d4af37, #e4dcc0);
      transition: width 0.3s ease;
    }

    .nav-links a:hover {
      color: #d4af37;
    }

    .nav-links a:hover::after {
      width: 100%;
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      z-index: 1001;
    }

    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: #d4af37;
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 768px) {
      .navigation {
        margin: 10px auto;
        border-radius: 15px;
      }

      .nav-container {
        padding: 0 15px;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(26, 42, 58, 0.98);
        backdrop-filter: blur(15px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        gap: 1rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
        max-height: 290px;
      }

      .nav-links li {
        width: 100%;
        text-align: center;
      }

      .nav-links a {
        display: block;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      }

      .nav-links a:hover {
        background-color: rgba(212, 175, 55, 0.1);
        transform: translateX(10px);
      }

      .nav-links a::after {
        display: none;
      }

      .nav-toggle {
        display: flex;
      }
    }

    @media (max-width: 480px) {
      .logo-text {
        font-size: 20px;
      }

      .nav-container {
        padding: 0 10px;
      }
    }
  `]
})
export class NavigationComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const window = event.target as Window;
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-container')) {
      this.closeMenu();
    }
  }
}
