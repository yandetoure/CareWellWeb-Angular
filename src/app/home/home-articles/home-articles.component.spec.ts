import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArticlesComponent } from './home-articles.component';

describe('HomeArticlesComponent', () => {
  let component: HomeArticlesComponent;
  let fixture: ComponentFixture<HomeArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
