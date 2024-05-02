import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionRoleComponent } from './attribution-role.component';

describe('AttributionRoleComponent', () => {
  let component: AttributionRoleComponent;
  let fixture: ComponentFixture<AttributionRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
