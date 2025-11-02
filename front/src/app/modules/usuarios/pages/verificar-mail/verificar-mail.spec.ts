import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarMail } from './verificar-mail';

describe('VerificarMail', () => {
  let component: VerificarMail;
  let fixture: ComponentFixture<VerificarMail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarMail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarMail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
