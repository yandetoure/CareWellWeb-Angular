import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordAdminComponent } from './dashbaord-admin.component';

describe('DashbaordAdminComponent', () => {
  let component: DashbaordAdminComponent;
  let fixture: ComponentFixture<DashbaordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbaordAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbaordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
