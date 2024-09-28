import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordDoctorComponent } from './dashbaord-doctor.component';

describe('DashbaordDoctorComponent', () => {
  let component: DashbaordDoctorComponent;
  let fixture: ComponentFixture<DashbaordDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbaordDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbaordDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
