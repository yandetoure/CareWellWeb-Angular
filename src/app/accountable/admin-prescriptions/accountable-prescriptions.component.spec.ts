import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountablePrescriptionsComponent } from './accountable-prescriptions.component';

describe('AdminPrescriptionsComponent', () => {
  let component: AccountablePrescriptionsComponent;
  let fixture: ComponentFixture<AccountablePrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountablePrescriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountablePrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
