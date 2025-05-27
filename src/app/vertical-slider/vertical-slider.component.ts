import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vertical-slider',
  imports: [CommonModule],
  templateUrl: './vertical-slider.component.html',
  styleUrl: './vertical-slider.component.scss'
})
export class VerticalSliderComponent {
@ViewChild('scrollWrapper', { static: false }) wrapper!: ElementRef;

items = [
  { text: '<img src="cirkuli/1.jpg">', style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } },
  { text: '<img src="cirkuli/2.jpg">', style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' } },
  { text: '<img src="cirkuli/3.jpg">', style: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' } },
  { text: '<img src="cirkuli/4.jpg">', style: { background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' } },
  { text: '<img src="cirkuli/5.jpg">', style: { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' } },
  { text: '<img src="cirkuli/6.jpg">', style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' } }
];

duplicatedItems = [...this.items, ...this.items, ...this.items];

translateY = 0;
speed = 1;
private animationId: number = 0;
private totalHeight = 0;
private startOffset = 0;

ngAfterViewInit(): void {
  setTimeout(() => {
    const itemHeight = 250 + 20; // 250px height + 20px margin
    this.totalHeight = itemHeight * this.items.length;
    this.startOffset = -this.totalHeight;
    this.translateY = this.startOffset;
    this.animate();
  });
}

animate() {
  this.translateY -= this.speed;

  if (Math.abs(this.translateY) >= this.totalHeight * 2) {
    this.translateY = this.startOffset;
  }

  this.animationId = requestAnimationFrame(() => this.animate());
}

ngOnDestroy(): void {
  cancelAnimationFrame(this.animationId);
}

}
