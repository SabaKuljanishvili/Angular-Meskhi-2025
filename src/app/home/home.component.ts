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
  imports: [CommonModule, HorizontalSliderComponent, VerticalSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  
}