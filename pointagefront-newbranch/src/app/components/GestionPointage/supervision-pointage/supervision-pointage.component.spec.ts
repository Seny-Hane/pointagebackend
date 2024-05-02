import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionPointageComponent } from './supervision-pointage.component';

describe('SupervisionPointageComponent', () => {
  let component: SupervisionPointageComponent;
  let fixture: ComponentFixture<SupervisionPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
