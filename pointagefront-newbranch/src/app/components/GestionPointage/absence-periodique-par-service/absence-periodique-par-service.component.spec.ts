import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencePeriodiqueParServiceComponent } from './absence-periodique-par-service.component';

describe('AbsencePeriodiqueParServiceComponent', () => {
  let component: AbsencePeriodiqueParServiceComponent;
  let fixture: ComponentFixture<AbsencePeriodiqueParServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencePeriodiqueParServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencePeriodiqueParServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
