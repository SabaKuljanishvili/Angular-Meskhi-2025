import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Swiper, SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';
import { HorizontalSliderComponent } from "../horizontal-slider/horizontal-slider.component";
import { VerticalSliderComponent } from "../vertical-slider/vertical-slider.component";
register(); 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HorizontalSliderComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
    firstSwiperImages = [
    'https://picsum.photos/id/1001/600/400',
    'https://picsum.photos/id/1002/600/400',
    'https://picsum.photos/id/1003/600/400'
  ];

  secondSwiperImages = [
    'https://picsum.photos/id/1011/600/400',
    'https://picsum.photos/id/1012/600/400',
    'https://picsum.photos/id/1013/600/400'
  ];

  thirdSwiperImages = [
    'https://picsum.photos/id/1021/600/400',
    'https://picsum.photos/id/1022/600/400',
    'https://picsum.photos/id/1023/600/400'
  ];
}