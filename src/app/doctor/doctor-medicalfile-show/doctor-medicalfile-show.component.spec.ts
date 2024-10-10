import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalfileShowComponent } from './doctor-medicalfile-show.component';

describe('DoctorMedicalfileShowComponent', () => {
  let component: DoctorMedicalfileShowComponent;
  let fixture: ComponentFixture<DoctorMedicalfileShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorMedicalfileShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalfileShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
