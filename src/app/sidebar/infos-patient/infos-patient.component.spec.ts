import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPatientComponent } from './infos-patient.component';

describe('InfosPatientComponent', () => {
  let component: InfosPatientComponent;
  let fixture: ComponentFixture<InfosPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
