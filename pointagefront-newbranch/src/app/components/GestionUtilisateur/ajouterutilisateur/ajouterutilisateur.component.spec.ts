import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterutilisateurComponent } from './ajouterutilisateur.component';

describe('AjouterutilisateurComponent', () => {
  let component: AjouterutilisateurComponent;
  let fixture: ComponentFixture<AjouterutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterutilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
