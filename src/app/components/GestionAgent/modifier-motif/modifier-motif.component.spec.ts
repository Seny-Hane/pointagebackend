import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMotifComponent } from './modifier-motif.component';

describe('ModifierMotifComponent', () => {
  let component: ModifierMotifComponent;
  let fixture: ComponentFixture<ModifierMotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
