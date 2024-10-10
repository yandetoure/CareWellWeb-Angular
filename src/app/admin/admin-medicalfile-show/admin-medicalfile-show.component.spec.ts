import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedicalfileShowComponent } from './admin-medicalfile-show.component';

describe('AdminMedicalfileShowComponent', () => {
  let component: AdminMedicalfileShowComponent;
  let fixture: ComponentFixture<AdminMedicalfileShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMedicalfileShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMedicalfileShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
