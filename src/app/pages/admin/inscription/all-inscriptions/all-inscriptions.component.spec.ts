import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInscriptionsComponent } from './all-inscriptions.component';

describe('AllInscriptionsComponent', () => {
  let component: AllInscriptionsComponent;
  let fixture: ComponentFixture<AllInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllInscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
