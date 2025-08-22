import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero">
      <div class="hero-background">
        <div class="geometric-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>
        <div class="gradient-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="container">
          <h1 class="hero-title">
            <span class="title-line">Meskhi</span>
            <span class="title-line">2000</span>
          </h1>
          <p class="hero-subtitle">
            ჩვენ ვართ კონცენტრირებული მხოლოდ მომხმარებლის კეთილგანწყობაზე, 
            ამიტომაც ჩვენ გთავაზობთ უმაღლესი ხარისხის მომსახურეობას
          </p>
          <div class="hero-buttons">
            <button class="btn btn-primary" (click)="scrollToSection('services')">
              ჩვენი სერვისები
            </button>
            <button class="btn btn-secondary" (click)="scrollToSection('gallery')">
              გალერეა
            </button>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
        <span class="scroll-text">გადაახვიეთ ქვემოთ</span>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(135deg, #1a2a3a 0%, #2d4a6b 50%, #1a2a3a 100%);
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .geometric-shapes {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(228, 220, 192, 0.05));
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 300px;
      height: 300px;
      top: 10%;
      left: 5%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 200px;
      height: 200px;
      top: 20%;
      right: 10%;
      animation-delay: 1s;
    }

    .shape-3 {
      width: 150px;
      height: 150px;
      bottom: 20%;
      left: 15%;
      animation-delay: 2s;
    }

    .shape-4 {
      width: 250px;
      height: 250px;
      bottom: 10%;
      right: 5%;
      animation-delay: 3s;
    }

    .shape-5 {
      width: 100px;
      height: 100px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.3;
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.6;
      }
    }

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, transparent 0%, rgba(26, 42, 58, 0.8) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      padding: 0 20px;
    }

    .hero-title {
      margin-bottom: 30px;
    }

    .title-line {
      display: block;
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 900;
      background: linear-gradient(135deg, #d4af37, #e4dcc0, #b8860b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
      animation: titleGlow 3s ease-in-out infinite alternate;
    }

    .title-line:last-child {
      animation-delay: 0.5s;
    }

    @keyframes titleGlow {
      0% {
        filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
      }
      100% {
        filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.6));
      }
    }

    .hero-subtitle {
      font-size: clamp(1.1rem, 3vw, 1.5rem);
      color: #efe9db;
      line-height: 1.6;
      margin-bottom: 40px;
      font-weight: 300;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 15px 30px;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      overflow: hidden;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #d4af37, #b8860b);
      color: #1a2a3a;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
    }

    .btn-secondary {
      background: transparent;
      color: #d4af37;
      border: 2px solid #d4af37;
    }

    .btn-secondary:hover {
      background: #d4af37;
      color: #1a2a3a;
      transform: translateY(-3px);
    }

    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      text-align: center;
      animation: bounce 2s infinite;
    }

    .scroll-arrow {
      width: 20px;
      height: 20px;
      border-right: 2px solid #d4af37;
      border-bottom: 2px solid #d4af37;
      transform: rotate(45deg);
      margin: 0 auto 10px;
    }

    .scroll-text {
      color: #d4af37;
      font-size: 0.9rem;
      font-weight: 500;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }

    @media (max-width: 768px) {
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 250px;
      }
    }
  `]
})
export class HeroComponent {
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
