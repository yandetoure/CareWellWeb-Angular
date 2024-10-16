import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientArticleDetailsComponent } from './patient-article-details.component';

describe('PatientArticleDetailsComponent', () => {
  let component: PatientArticleDetailsComponent;
  let fixture: ComponentFixture<PatientArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientArticleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
