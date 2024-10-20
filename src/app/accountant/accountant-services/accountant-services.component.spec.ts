import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantServicesComponent } from './accountant-services.component';

describe('AccountantServicesComponent', () => {
  let component: AccountantServicesComponent;
  let fixture: ComponentFixture<AccountantServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
