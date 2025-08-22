import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">დაგვიკავშირდით</h2>
          <p class="section-subtitle">ჩვენ ვმზად ვართ პასუხი გავცეთ თქვენს კითხვებს</p>
        </div>
        
        <div class="contact-content">
          <div class="contact-info">
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-content">
                <h3>მისამართი</h3>
                <p>თბილისი, საქართველო</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="info-content">
                <h3>ტელეფონი</h3>
                <p>+995 XXX XXX XXX</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-content">
                <h3>ელ-ფოსტა</h3>
                <p>info&#64;meskhi2000.ge</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="info-content">
                <h3>სამუშაო საათები</h3>
                <p>ორშაბათი - პარასკევი: 9:00 - 18:00</p>
                <p>შაბათი: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group">
                <input 
                  type="text" 
                  name="name" 
                  [(ngModel)]="formData.name"
                  placeholder="თქვენი სახელი"
                  required>
              </div>
              
              <div class="form-group">
                <input 
                  type="email" 
                  name="email" 
                  [(ngModel)]="formData.email"
                  placeholder="ელ-ფოსტა"
                  required>
              </div>
              
              <div class="form-group">
                <input 
                  type="tel" 
                  name="phone" 
                  [(ngModel)]="formData.phone"
                  placeholder="ტელეფონი">
              </div>
              
              <div class="form-group">
                <select name="subject" [(ngModel)]="formData.subject" required>
                  <option value="">აირჩიეთ თემა</option>
                  <option value="service">სერვისის შეკვეთა</option>
                  <option value="quote">ფასის შეთავაზება</option>
                  <option value="consultation">კონსულტაცია</option>
                  <option value="other">სხვა</option>
                </select>
              </div>
              
              <div class="form-group">
                <textarea 
                  name="message" 
                  [(ngModel)]="formData.message"
                  placeholder="თქვენი შეტყობინება"
                  rows="5"
                  required></textarea>
              </div>
              
              <button type="submit" class="submit-btn" [disabled]="!contactForm.valid">
                <span *ngIf="!isSubmitting">გაგზავნა</span>
                <span *ngIf="isSubmitting">იგზავნება...</span>
              </button>
            </form>
          </div>
        </div>
        
        <!-- Map or Additional Info -->
        <div class="map-section">
          <div class="map-placeholder">
            <i class="fas fa-map"></i>
            <p>აქ იქნება რუკა ან დამატებითი ინფორმაცია</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 100px 0;
      background: linear-gradient(135deg, #f7f5f0 0%, #efe9db 100%);
      position: relative;
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

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-bottom: 80px;
    }

    /* Contact Info */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      padding: 25px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }

    .info-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      border-left-color: #d4af37;
    }

    .info-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d4af37, #b8860b);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-icon i {
      color: white;
      font-size: 1.2rem;
    }

    .info-content h3 {
      color: #1a2a3a;
      font-size: 1.2rem;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .info-content p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    /* Contact Form */
    .contact-form {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fafafa;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #d4af37;
      background: white;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      padding: 15px 30px;
      background: linear-gradient(135deg, #d4af37, #b8860b);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .submit-btn:hover::before {
      left: 100%;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Map Section */
    .map-section {
      margin-top: 60px;
    }

    .map-placeholder {
      background: linear-gradient(135deg, #1a2a3a, #2d4a6b);
      border-radius: 20px;
      padding: 80px 40px;
      text-align: center;
      color: white;
    }

    .map-placeholder i {
      font-size: 4rem;
      color: #d4af37;
      margin-bottom: 20px;
    }

    .map-placeholder p {
      font-size: 1.2rem;
      margin: 0;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .contact-form {
        padding: 30px 20px;
      }
      
      .section-title {
        font-size: 2.5rem;
      }
    }
  `]
})
export class ContactSectionComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      
      // Show success message (you can implement a toast or alert)
      alert('თქვენი შეტყობინება წარმატებით გაიგზავნა!');
    }, 2000);
  }
}
