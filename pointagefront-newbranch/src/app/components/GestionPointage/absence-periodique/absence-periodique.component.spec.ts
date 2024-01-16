import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencePeriodiqueComponent } from './absence-periodique.component';

describe('AbsencePeriodiqueComponent', () => {
  let component: AbsencePeriodiqueComponent;
  let fixture: ComponentFixture<AbsencePeriodiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencePeriodiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencePeriodiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
