import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ჩვენი სერვისები</h2>
          <p class="section-subtitle">უმაღლესი ხარისხის მომსახურეობა თქვენი ბიზნესისთვის</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" *ngFor="let service of services; let i = index">
            <div class="service-icon">
              <i [class]="service.icon"></i>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <div class="service-features">
              <span class="feature" *ngFor="let feature of service.features">{{ feature }}</span>
            </div>
            <button class="learn-more-btn" (click)="openServiceDetails(service)">
              გაიგეთ მეტი
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      padding: 100px 0;
      background: linear-gradient(135deg, #f7f5f0 0%, #efe9db 100%);
      position: relative;
    }

    .services::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(to bottom, #1a2a3a, transparent);
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
      color: #1a2a3a;
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
      color: #666;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      margin-top: 60px;
    }

    .service-card {
      background: white;
      border-radius: 20px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, 0.1);
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #d4af37, #b8860b);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    .service-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(212, 175, 55, 0.3);
    }

    .service-card:hover::before {
      transform: scaleX(1);
    }

    .service-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d4af37, #b8860b);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 25px;
      transition: all 0.4s ease;
    }

    .service-card:hover .service-icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
    }

    .service-icon i {
      font-size: 35px;
      color: white;
    }

    .service-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a2a3a;
      margin-bottom: 15px;
    }

    .service-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
      font-size: 0.95rem;
    }

    .service-features {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 25px;
    }

    .feature {
      background: rgba(212, 175, 55, 0.1);
      color: #b8860b;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid rgba(212, 175, 55, 0.2);
    }

    .learn-more-btn {
      background: linear-gradient(135deg, #d4af37, #b8860b);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .learn-more-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .learn-more-btn:hover::before {
      left: 100%;
    }

    .learn-more-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
    }

    @media (max-width: 768px) {
      .services {
        padding: 60px 0;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
      
      .services-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .service-card {
        padding: 30px 20px;
      }
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      title: 'დამზადება',
      description: 'ვამზადეთ უმაღლესო ხარისხის საჭრისებ, ფრეზებს, ნებისმიერი კონფიგურაციის და მომსახურებოას ვეწევით ცირკული, ლენტური ხერხების, ფრეზების და PCD (ალმასის) ფრეზების გალესვაზე.',
      icon: 'fa-solid fa-industry',
      features: ['საჭრისები', 'ფრეზები', 'PCD ფრეზები', 'ლენტური ხერხები']
    },
    {
      title: 'ჩვენი პროდუქტი',
      description: 'ვამზადებთ ფრეზებს ნებისმიერ კომფიგურაციაზე. როგორც HSS ასევე "პაბედიტით".',
      icon: 'fa-solid fa-boxes-stacked',
      features: ['HSS ფრეზები', 'პაბედიტი', 'კონფიგურაცია', 'ხარისხი']
    },
    {
      title: 'ინოვაცია',
      description: 'ლამასი ხერხებისა და ფრეზების გალესვა.',
      icon: 'fa-solid fa-clock',
      features: ['ლამასი ხერხები', 'გალესვა', 'ინოვაცია', 'ტექნოლოგია']
    },
    {
      title: 'ალესვები',
      description: 'ფრეზის პირების, ინოვაციური სიახლე. PCD (ალმასის) ფრეზების, ლენტური ხერების შედუღება და ალესვა, სტამბის დანების ფუგანების პირების, "კოპირი" ფრეზების ალესვა, ცირკული ხერხის პირების, ფუგანის პირების, ალუმინის, მეტალის და ხის დასამუშავებელი ცირკული ხერხები',
      icon: 'fas fa-hands-helping',
      features: ['PCD ფრეზები', 'შედუღება', 'ალესვა', 'სტამბის დანები']
    },
    {
      title: 'გამოჩარხვა',
      description: 'ვჩარავთ ნებისმიერი ფრეზს და დანებს უმაღლეს ხარისხში საუკეთესო დანადგარებით.',
      icon: 'fas fa-cogs',
      features: ['გამოჩარხვა', 'დანები', 'დანადგარები', 'ხარისხი']
    },
    {
      title: 'გრავირება',
      description: 'ვაკეთებთ გრავირებას უმაღლესი ხარისხით უახლესი აპარატურით.',
      icon: 'fas fa-drafting-compass',
      features: ['გრავირება', 'აპარატურა', 'ხარისხი', 'ტექნიკა']
    }
  ];

  openServiceDetails(service: any) {
    // This could open a modal or navigate to a detailed page
    console.log('Opening service details for:', service.title);
    // You can implement modal or navigation logic here
  }
}
