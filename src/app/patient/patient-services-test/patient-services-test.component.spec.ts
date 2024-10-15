import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientServicesTestComponent } from './patient-services-test.component';

describe('PatientServicesTestComponent', () => {
  let component: PatientServicesTestComponent;
  let fixture: ComponentFixture<PatientServicesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientServicesTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientServicesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
