import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultComponent } from './add-result.component';

describe('AddResultComponent', () => {
  let component: AddResultComponent;
  let fixture: ComponentFixture<AddResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
