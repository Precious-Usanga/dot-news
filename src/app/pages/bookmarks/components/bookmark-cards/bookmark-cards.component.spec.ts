import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCardsComponent } from './bookmark-cards.component';

describe('BookmarkCardsComponent', () => {
  let component: BookmarkCardsComponent;
  let fixture: ComponentFixture<BookmarkCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
