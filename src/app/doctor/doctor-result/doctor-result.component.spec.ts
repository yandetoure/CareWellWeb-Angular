import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorResultComponent } from './doctor-result.component';

describe('DoctorResultComponent', () => {
  let component: DoctorResultComponent;
  let fixture: ComponentFixture<DoctorResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
