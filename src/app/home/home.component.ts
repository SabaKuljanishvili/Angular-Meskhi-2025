// import { CommonModule } from '@angular/common';
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule,],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class HomeComponent {

// }


import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { Swiper, SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';

register(); 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,Swiper],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  config: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    freeMode: {
      enabled: true,
      momentum: false
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 8000,
  };

  slides: string[] = [
    'Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5',
    'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9',
    'Slide 1', 'Slide 2' // smoother looping
  ];
}

