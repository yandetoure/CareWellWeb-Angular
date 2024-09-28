import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordAccountantComponent } from './dashbaord-accountant.component';

describe('DashbaordAccountantComponent', () => {
  let component: DashbaordAccountantComponent;
  let fixture: ComponentFixture<DashbaordAccountantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbaordAccountantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbaordAccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
