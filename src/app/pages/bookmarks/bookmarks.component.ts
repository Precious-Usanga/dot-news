import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IBookmark } from 'src/app/core/models/IBookmark.model';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { BookmarksService } from 'src/app/core/services/bookmarks.service';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { CallToActionModalComponent } from 'src/app/core/shared/modals/call-to-action-modal/call-to-action-modal.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks!: IBookmark[] | null;

  callToActionModal = CallToActionModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;

  constructor(
    private dialog: MatDialog,
    private bookmarksService: BookmarksService,
    private readNewsService: ShareDataViaRouteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBookmarks();
  }

  getBookmarks() {
    this.bookmarks = this.bookmarksService.getBookmarks();
  }

  removeBookmark(data: IModalDialogData) {
    const remaining_bookmarks = this.bookmarksService.removeABookmark(data.extraData);

    remaining_bookmarks ? this.bookmarksService.updateBookmarkStorage(remaining_bookmarks) : null;
    this.snackBar.open('Bookmark removed!', 'X');
  }

  openDialog(options: IModalDialogData) {
    let dialog!: TemplateRef<any> | ComponentType <any>;
    let width;
    if (options.modal === 'callToActionModal') {
      width = '400px';
      switch (options.action) {
        case 'remove':
          options.question = `Are you sure you want to ${options.action} this article?`;
          options.color = 'warn';
          break;
        default:
          break;
      }
      dialog = this.callToActionModal;
      this.modal = this.dialog.open(dialog, { data: options, disableClose: true, width: width });
    }

    if (options.modal === 'callToActionModal') {
      let callToActionModalRef: MatDialogRef<CallToActionModalComponent> = this.modal as any;
      callToActionModalRef.componentInstance.modalDataEmitter.subscribe(
        data => {
          callToActionModalRef.componentInstance.callToActionLoading = true;
          if (data.action && data.action === 'remove') {
            this.removeBookmark(data);
            callToActionModalRef.componentInstance.callToActionLoading = false;
            callToActionModalRef.componentInstance.closeModal();
            this.getBookmarks();
          }
        }
      )
      callToActionModalRef.afterClosed().subscribe(() => callToActionModalRef.componentInstance.modalDataEmitter.unsubscribe());
    }
  }

  readNews(news: INewsArticle) {
    this.readNewsService.updateSharedData(news);
    this.router.navigate(['/news/view-news']);
  }

  refreshComponent(refresh: boolean) {
    if (refresh) {
      this.getBookmarks();
    }
  }

}
