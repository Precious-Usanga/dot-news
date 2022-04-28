import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCategoryCardComponent } from './app-category-card.component';

describe('AppCategoryCardComponent', () => {
  let component: AppCategoryCardComponent;
  let fixture: ComponentFixture<AppCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCategoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
