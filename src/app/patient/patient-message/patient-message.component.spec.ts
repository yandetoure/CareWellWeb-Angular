import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMessageComponent } from './patient-message.component';

describe('PatientMessageComponent', () => {
  let component: PatientMessageComponent;
  let fixture: ComponentFixture<PatientMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
