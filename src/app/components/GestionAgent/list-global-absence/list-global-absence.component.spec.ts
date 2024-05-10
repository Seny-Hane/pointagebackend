import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGlobalAbsenceComponent } from './list-global-absence.component';

describe('ListGlobalAbsenceComponent', () => {
  let component: ListGlobalAbsenceComponent;
  let fixture: ComponentFixture<ListGlobalAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGlobalAbsenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGlobalAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
