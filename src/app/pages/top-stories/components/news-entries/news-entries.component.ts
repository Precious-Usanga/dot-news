import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import icAddBookmark from '@iconify/icons-ic/round-bookmark-add';
import icShare from '@iconify/icons-ic/round-share';
import { INewsArticle } from 'src/app/core/models/news.model';
import { ComponentType } from '@angular/cdk/portal';
import { AddBookmarkModalComponent } from 'src/app/core/shared/modals/add-bookmark-modal/add-bookmark-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-entries',
  templateUrl: './news-entries.component.html',
  styleUrls: ['./news-entries.component.scss']
})
export class NewsEntriesComponent implements OnInit {

  @Input() cardType!: string;
  @Input() news!: INewsArticle;

  icAddBookmark = icAddBookmark;
  icShare = icShare;

  addBookmarkModal = AddBookmarkModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addToBookmarks(news: INewsArticle) {
    console.log(news);
  }

  openDialog(dialog: TemplateRef<any> | ComponentType<any>, options: IModalDialogData) {
    let width;
    if (options.modal === "addBookmarkModal") {
      width = "600px";
    }

    this.modal = this.dialog.open(dialog, { data: options, disableClose: true, width: width });

    if (options.modal === 'addBookmarkModal') {
      this.modal.afterClosed().subscribe(
        data => {
          if (data.result.data) {
            this.openSnackBar(data.result.message);
          }
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X');
  }

}
