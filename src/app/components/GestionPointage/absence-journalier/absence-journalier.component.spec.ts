import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceJournalierComponent } from './absence-journalier.component';

describe('AbsenceJournalierComponent', () => {
  let component: AbsenceJournalierComponent;
  let fixture: ComponentFixture<AbsenceJournalierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceJournalierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceJournalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
