import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPointageComponent } from './rapport-pointage.component';

describe('RapportPointageComponent', () => {
  let component: RapportPointageComponent;
  let fixture: ComponentFixture<RapportPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
