import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  trackByCardType(index: number, card: { type: string }): string {
  return card.type;
}
    contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  private successTimeout?: ReturnType<typeof setTimeout>;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      setTimeout(() => {
        this.showSuccessMessage = true;
        this.isSubmitting = false;
        this.contactForm.reset();
        
        this.successTimeout = setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'ეს ველი სავალდებულოა';
      }
      if (field.errors['email']) {
        return 'შეიყვანეთ სწორი ელ. ფოსტის მისამართი';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `მინიმუმ ${requiredLength} სიმბოლო`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  private initializeAnimations(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      setTimeout(() => {
        const elements = document.querySelectorAll('.card, .contact-form, .map-container1');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

  contactCards = [
    {
      type: 'red',
      title: 'Gmail',
      info: 'Meskhi.2000.f@gmail.com'
    },
    {
      type: 'blue',
      title: 'ოფისი',
      info: '(+995)598-014-014'
    },
    {
      type: 'green',
      title: 'WhatsApp',
      info: '(+995)597-922-922'
    },
    {
      type: 'black',
      title: 'WeChat',
      info: '(+995)597-922-922'
    }
  ];

  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.4451372253293!2d44.894502!3d41.6691668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d23fa041859%3A0xf2ef2beb03bae82e!2sMeskhi-2000!5e1!3m2!1sen!2sge!4v1711039514647!5m2!1sen!2sge';
}
