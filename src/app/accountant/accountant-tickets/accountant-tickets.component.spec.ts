import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantTicketsComponent } from './accountant-tickets.component';

describe('AccountantTicketsComponent', () => {
  let component: AccountantTicketsComponent;
  let fixture: ComponentFixture<AccountantTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
