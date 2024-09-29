import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordPatientComponent } from './dashbaord-patient.component';

describe('DashbaordPatientComponent', () => {
  let component: DashbaordPatientComponent;
  let fixture: ComponentFixture<DashbaordPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbaordPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbaordPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
