import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTicketsComponent } from './patient-tickets.component';

describe('PatientTicketsComponent', () => {
  let component: PatientTicketsComponent;
  let fixture: ComponentFixture<PatientTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
