import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAddBookmark } from '../models/IBookmark.model';
import { INewsArticle } from '../models/news.model';
import { Constants } from '../shared/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarkSource = new BehaviorSubject<INewsArticle[]>(JSON.parse(this.storageService.get(Constants.STORAGE_VARIABLES.BOOKMARKS) as string));
  bookmark = this.bookmarkSource.asObservable();

  get bookmarkData () {
    return this.bookmarkSource.value;
  }

  constructor(
    private storageService: StorageService
  ) { }

  checkIfBookmarkExist(item: INewsArticle): number {
    const itemAlreadyExist = this.bookmarkData ? this.bookmarkData?.findIndex(article => article.url === item.url ) : null;
    return itemAlreadyExist ? itemAlreadyExist : -1;
  }

  updateBookmarks(itemIndex: number, item: IAddBookmark): INewsArticle[] {
    let bookmarks = this.bookmarkData;
    if (itemIndex !== -1) {
      console.log('News already Bookmarked');
    } else if (itemIndex === -1) {
      bookmarks !== null ? bookmarks.push(item.bookmark) : bookmarks = [item.bookmark];
    }
    return bookmarks;
  }

  updateBookmarkStorage(bookmarks: INewsArticle[]) {
    this.storageService.set(Constants.STORAGE_VARIABLES.BOOKMARKS, JSON.stringify(bookmarks));
    this.bookmarkSource.next(bookmarks);
  }

  clearBookmarks() {
    this.storageService.clear(Constants.STORAGE_VARIABLES.BOOKMARKS);
    this.bookmarkSource.next([]);
  }

}
