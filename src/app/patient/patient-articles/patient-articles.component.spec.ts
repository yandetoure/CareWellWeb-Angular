import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientArticlesComponent } from './patient-articles.component';

describe('PatientArticlesComponent', () => {
  let component: PatientArticlesComponent;
  let fixture: ComponentFixture<PatientArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
