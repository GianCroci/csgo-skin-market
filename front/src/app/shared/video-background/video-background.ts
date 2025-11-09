import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-video-background',
  standalone: true,
  templateUrl: './video-background.html',
  styleUrls: ['./video-background.css']
})
export class VideoBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('bgVideo', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    const video = this.videoElement.nativeElement;
    
    video.addEventListener('ended', () => {
      video.style.transition = 'opacity 0.5s ease';
      video.style.opacity = '0';
      
      setTimeout(() => {
        video.currentTime = 0;
        video.style.opacity = '1';
        video.play();
      }, 500);
    });
  }

  ngOnDestroy() {}
}