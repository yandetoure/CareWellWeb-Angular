import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantPrescriptionsComponent } from './accountant-prescriptions.component';

describe('AccountantPrescriptionsComponent', () => {
  let component: AccountantPrescriptionsComponent;
  let fixture: ComponentFixture<AccountantPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantPrescriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
