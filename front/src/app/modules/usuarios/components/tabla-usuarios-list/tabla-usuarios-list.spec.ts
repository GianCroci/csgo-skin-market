import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaUsuariosList } from './tabla-usuarios-list';

describe('TablaUsuariosList', () => {
  let component: TablaUsuariosList;
  let fixture: ComponentFixture<TablaUsuariosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaUsuariosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaUsuariosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
