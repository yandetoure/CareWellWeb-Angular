import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListUserComponent } from './patient-list-user.component';

describe('PatientListUserComponent', () => {
  let component: PatientListUserComponent;
  let fixture: ComponentFixture<PatientListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
