import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Swiper, SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
register(); 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  @ViewChild('scrollWrapper', { static: false }) wrapper!: ElementRef;

  items = [
    { text: '   <img src="cirkuli/369421033_989795648754152_5942018697328113652_n.jpg" alt="Slider Image 1">', style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } },
    { text: '    <img src="cirkuli/397943109_3648447392099634_2870897858034374988_n.jpg" alt="Slider Image 2">', style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' } },
    { text: '   <img src="cirkuli/399925681_236709735906756_9167162424002679429_n.jpg" alt="Slider Image 3">', style: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' } },
    { text: '   <img src="cirkuli/399945711_3451246038354560_3658791609130255930_n.jpg" alt="Slider Image 4">', style: { background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' } },
    { text: '    <img src="cirkuli/400693450_653873343617285_8109933589587951763_n.jpg" alt="Slider Image 2">', style: { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' } },
    { text: '    <img src="cirkuli/cirkul.jpg" alt="Slider Image 3">', style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' } }
  ];

  duplicatedItems = [...this.items, ...this.items, ...this.items, ...this.items]; 
  translateX = 0;
  speed = 1;
  private animationId: number = 0;
  private totalWidth = 0;
  private startOffset = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const itemWidth = 200 + 20;
      this.totalWidth = itemWidth * this.items.length;
      this.startOffset = -this.totalWidth; 
      this.translateX = this.startOffset;

      this.animate();
    });
  }

  animate() {
    this.translateX -= this.speed;

    if (Math.abs(this.translateX) >= this.totalWidth * 2) {
      this.translateX = this.startOffset;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }


  
}