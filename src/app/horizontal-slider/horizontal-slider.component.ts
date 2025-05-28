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
    { image: 'cirkuli/369421033_989795648754152_5942018697328113652_n.jpg', },
    { image: 'lenturi/7777.JPG', },
    { image: 'fuganebi/403397993_1105942323740318_2929485730047593812_n.jpg',  },
    { image: 'fuganebi/fugani12.jpg',  },
    { image: 'frezebi/IMG_8077.JPG', },
    { image: 'frezebi/20230308_164308.jpg',},
    { image: 'frezebi/399740263_265233852798849_1083589954715007024_n.jpg',  },
    { image: 'frezebi/400679265_321543283969880_5055470704605339268_n.jpg', },
    { image: 'frezebi/IMG_8037.JPG',},
    { image: 'frezebi/IMG_8035.JPG',},
    { image: 'frezebi/mwvane.jpg',},
    { image: 'cirkuli/399925681_236709735906756_9167162424002679429_n.jpg',},
    { image: 'cirkuli/399945711_3451246038354560_3658791609130255930_n.jpg',},
    { image: 'frezebi/almas patara.jpg',},
    { image: 'frezebi/almas.jpg',},
        { image: 'frezebi/oval.jpg',},
    { image: 'frezebi/pirebi.jpg',},
    { image: 'frezebi/sam piriani.jpg',},
    { image: 'frezebi/samk shtamp.jpg',},
    { image: 'frezebi/shtampi.jpg',},
    { image: 'frezebi/sul patara almas.jpg',},
    { image: 'frezebi/yviteli.jpg',},
        { image: 'fuganebi/good.jpg',},
    { image: 'lenturi/salesi qva.jpg',},
  ];

  duplicatedItems = [...this.items, ...this.items,...this.items,];
  translateX = 0;
  speed = 1.1;
  private animationId: number = 0;
  private itemWidth = 220; // 200px width + 20px margin
  private totalWidth = 0;
  private isHovered: boolean = false; // დაამატეთ ეს ცვლადი

  ngAfterViewInit(): void {
    this.totalWidth = this.itemWidth * this.items.length;
    this.translateX = -this.totalWidth;
    this.animate();
  }

  private animate() {
    if (!this.isHovered) { // მხოლოდ მაშინ ვიანიმირებთ, თუ არ ხდება hover
      this.translateX -= this.speed;

      if (Math.abs(this.translateX) >= this.totalWidth * 2) {
        this.translateX = -this.totalWidth;
      }
    }
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }
}
