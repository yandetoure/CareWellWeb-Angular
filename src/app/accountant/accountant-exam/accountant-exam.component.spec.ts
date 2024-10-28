import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantExamComponent } from './accountant-exam.component';

describe('AccountantExamComponent', () => {
  let component: AccountantExamComponent;
  let fixture: ComponentFixture<AccountantExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
