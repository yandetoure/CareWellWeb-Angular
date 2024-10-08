import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedicalfilesComponent } from './admin-medicalfiles.component';

describe('AdminMedicalfilesComponent', () => {
  let component: AdminMedicalfilesComponent;
  let fixture: ComponentFixture<AdminMedicalfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMedicalfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMedicalfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
