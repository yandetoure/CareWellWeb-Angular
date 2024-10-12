import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalfileComponent } from './medicalfile.component';

describe('MedicalfileComponent', () => {
  let component: MedicalfileComponent;
  let fixture: ComponentFixture<MedicalfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
