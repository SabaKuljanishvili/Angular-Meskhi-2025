import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;
  
  public showPlayButton = false;

  ngAfterViewInit(): void {

    if (this.videoElement && this.videoElement.nativeElement) {

      const video = this.videoElement.nativeElement;
      video.autoplay = true;
      video.muted = true;
      video.loop = false;
      video.controls = false;
      
      let playPromise = video.play();
      
    
    }
  }





}
