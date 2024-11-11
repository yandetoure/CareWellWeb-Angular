import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorExamsComponent } from './doctor-exams.component';

describe('DoctorExamsComponent', () => {
  let component: DoctorExamsComponent;
  let fixture: ComponentFixture<DoctorExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorExamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
