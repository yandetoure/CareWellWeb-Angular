import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantArticlesComponent } from './accountant-articles.component';

describe('AccountantArticlesComponent', () => {
  let component: AccountantArticlesComponent;
  let fixture: ComponentFixture<AccountantArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
