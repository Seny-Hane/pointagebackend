import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPosteComponent } from './services-poste.component';

describe('ServicesPosteComponent', () => {
  let component: ServicesPosteComponent;
  let fixture: ComponentFixture<ServicesPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesPosteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
