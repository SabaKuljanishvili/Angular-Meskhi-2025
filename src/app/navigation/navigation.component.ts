import { Component } from '@angular/core';
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
        <ul class="nav-links">
          <li><a href="#hero" (click)="scrollToSection('hero')">Home</a></li>
          <li><a href="#services" (click)="scrollToSection('services')">Services</a></li>
          <li><a href="#gallery" (click)="scrollToSection('gallery')">Gallery</a></li>
          <li><a href="#about" (click)="scrollToSection('about')">About</a></li>
          <li><a href="#contact" (click)="scrollToSection('contact')">Contact</a></li>
        </ul>
        <div class="nav-toggle">
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
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
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
    }

    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: #d4af37;
      transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .nav-toggle {
        display: flex;
      }
    }
  `]
})
export class NavigationComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
