import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBackground } from './video-background';

describe('VideoBackground', () => {
  let component: VideoBackground;
  let fixture: ComponentFixture<VideoBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoBackground);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
