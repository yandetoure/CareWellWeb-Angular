import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFilesComponent } from './medical-files.component';

describe('MedicalFilesComponent', () => {
  let component: MedicalFilesComponent;
  let fixture: ComponentFixture<MedicalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
