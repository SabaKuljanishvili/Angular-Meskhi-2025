import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    HeroComponent,
    ServicesComponent,
    GalleryComponent,
    ContactSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  @ViewChild('servicesSection', { static: false }) servicesSection!: ElementRef;

  // Footer text content
  footerData = {
    company: {
      name: 'Meskhi 2000',
      description: 'უმაღლესი ხარისხის მომსახურეობა თქვენი ბიზნესისთვის',
      slogan: 'ხარისხიანი ხერხები და ხელსაწყოები'
    },
    services: {
      title: 'სერვისები',
      items: [
        { name: 'დამზადება', link: '#services' },
        { name: 'ალესვები', link: '#services' },
        { name: 'გამოჩარხვა', link: '#services' },
        { name: 'გრავირება', link: '#services' }
      ]
    },
    contact: {
      title: 'კონტაქტი',
      phone: '(+995)598-014-014',
      email: 'Meskhi.2000.f@gmail.com',
      address: '7 იარაჯულია1 ჩიხი, Tbilisi 0137'
    },
    workingHours: {
      title: 'სამუშაო საათები',
      weekdays: 'ორშაბათი - შაბათი: 9:30 - 17:00',
      sunday: 'კვირა: დაკეტილია'
    },
    social: {
      facebook: 'https://www.facebook.com/lenturi.xerxebi',
      instagram: 'https://instagram.com/meskhi2000',
      linkedin: 'https://linkedin.com/company/meskhi2000'
    },
    copyright: '© 2025 Meskhi 2000. ყველა უფლება დაცულია.'
  };

  ngOnInit() {
    // Initialize component
  }

  ngAfterViewInit() {
    this.setupScrollAnimations();
  }

  private setupScrollAnimations() {
    // Create intersection observer for smooth transitions
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add fade-in class when section comes into view
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe services section
    if (this.servicesSection) {
      observer.observe(this.servicesSection.nativeElement);
    }

    // Add scroll event listener for hero fade effect
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  private handleScroll() {
    const scrollY = window.scrollY;
    const heroElement = this.heroSection?.nativeElement;
    const servicesElement = this.servicesSection?.nativeElement;

    if (heroElement && servicesElement) {
      const heroHeight = heroElement.offsetHeight;
      const servicesTop = servicesElement.offsetTop;
      
      // Calculate fade effect based on scroll position
      if (scrollY > heroHeight * 0.3) {
        heroElement.classList.add('hero-fading');
      } else {
        heroElement.classList.remove('hero-fading');
      }

      // Trigger services animation when approaching
      if (scrollY > servicesTop - window.innerHeight * 0.8) {
        servicesElement.classList.add('services-approaching');
      }
    }
  }
}