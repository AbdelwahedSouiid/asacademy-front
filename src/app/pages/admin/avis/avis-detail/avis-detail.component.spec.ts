import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisDetailComponent } from './avis-detail.component';

describe('AvisDetailComponent', () => {
  let component: AvisDetailComponent;
  let fixture: ComponentFixture<AvisDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
