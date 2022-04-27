import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { IBookmark } from '../models/IBookmark.model';
import { INewsArticle } from '../models/news.model';
import { Constants } from '../shared/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarkSource = new BehaviorSubject<IBookmark[]>(JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.BOOKMARKS) as string));
  bookmark = this.bookmarkSource.asObservable();

  get bookmarkData () {
    return this.bookmarkSource.value;
  }

  constructor(
    private storageService: StorageService,
    // private snackBar: MatSnackBar
  ) { }

  getBookmarks(): IBookmark[] | null  {
    let existing_bookmarks: IBookmark[] | null = null;
    this.bookmark.subscribe({
      next: (response) => {
        if (response) {
          existing_bookmarks = response;
        } else {
          existing_bookmarks = null;
        }
      },
      error: (error) => {
        // this.snackBar.open(error, 'ERROR');
      }
    });
    return existing_bookmarks;
  }

  checkIfBookmarkExist(item: INewsArticle): number {
    const existing_bookmarks = this.getBookmarks();

    let itemAlreadyExist = existing_bookmarks !== null ? existing_bookmarks.findIndex(b_mark => b_mark.url === item.url) : -1;

    return itemAlreadyExist;
  }

  updateBookmarks(item: IBookmark): IBookmark[] {
    let existing_bookmarks = this.getBookmarks();

    existing_bookmarks !== null ? existing_bookmarks.push(item) : existing_bookmarks = [item];

    return existing_bookmarks;
  }

  updateBookmarkStorage(bookmarks: IBookmark[]) {
    this.storageService.set(Constants.STORAGE_VARIABLES.BOOKMARKS, JSON.stringify(bookmarks));
    this.bookmarkSource.next(bookmarks);
  }

  removeABookmark(bookmark: IBookmark): IBookmark[] | null {
    const existing_bookmarks = this.getBookmarks();
    if (existing_bookmarks) {
      const bookmark_index = existing_bookmarks?.findIndex(bm => bm.url === bookmark.url)

      existing_bookmarks?.splice(bookmark_index, 1);

      return existing_bookmarks;
    }
    return null;
  }

  clearBookmarks() {
    this.storageService.clear(Constants.STORAGE_VARIABLES.BOOKMARKS);
    this.bookmarkSource.next([]);
  }

}
