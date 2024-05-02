import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbsenceParAgentComponent } from './list-absence-par-agent.component';

describe('ListAbsenceParAgentComponent', () => {
  let component: ListAbsenceParAgentComponent;
  let fixture: ComponentFixture<ListAbsenceParAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAbsenceParAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbsenceParAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
