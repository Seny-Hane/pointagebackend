import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RattrapageComponent } from './rattrapage.component';

describe('RattrapageComponent', () => {
  let component: RattrapageComponent;
  let fixture: ComponentFixture<RattrapageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RattrapageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RattrapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
