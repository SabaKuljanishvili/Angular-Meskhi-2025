import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-slider',
  imports: [CommonModule],
  templateUrl: './horizontal-slider.component.html',
  styleUrl: './horizontal-slider.component.scss'
  
})
export class HorizontalSliderComponent {
 @ViewChild('scrollWrapper', { static: false }) wrapper!: ElementRef;

  items = [
    { image: 'cirkuli/369421033_989795648754152_5942018697328113652_n.jpg', style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } },
    { image: 'cirkuli/397943109_3648447392099634_2870897858034374988_n.jpg', style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' } },
    { image: 'cirkuli/399925681_236709735906756_9167162424002679429_n.jpg', style: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' } },
    { image: 'cirkuli/399945711_3451246038354560_3658791609130255930_n.jpg', style: { background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' } },
    { image: 'cirkuli/400693450_653873343617285_8109933589587951763_n.jpg', style: { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' } },
    { image: 'cirkuli/cirkul.jpg', style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' } }
  ];

  duplicatedItems = [...this.items, ...this.items, ...this.items,...this.items];
  translateX = 0;
  speed = 1.5;
  private animationId: number = 0;
  private itemWidth = 220; // 200px width + 20px margin
  private totalWidth = 0;

  ngAfterViewInit(): void {
    this.totalWidth = this.itemWidth * this.items.length;
    this.translateX = -this.totalWidth;
    this.animate();
  }

  private animate() {
    this.translateX -= this.speed;

    if (Math.abs(this.translateX) >= this.totalWidth * 2) {
      this.translateX = -this.totalWidth;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }
}
