import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalfileComponent } from './doctor-medicalfile.component';

describe('DoctorMedicalfileComponent', () => {
  let component: DoctorMedicalfileComponent;
  let fixture: ComponentFixture<DoctorMedicalfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorMedicalfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
