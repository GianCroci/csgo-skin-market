import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPerfil } from './carousel-perfil';

describe('CarouselPerfil', () => {
  let component: CarouselPerfil;
  let fixture: ComponentFixture<CarouselPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
