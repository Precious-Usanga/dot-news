import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalDialogData, IModalResult } from 'src/app/core/models/modal.model';
import icClose from '@iconify/icons-ic/twotone-close';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewsArticle } from 'src/app/core/models/news.model';
import { IBookmark } from 'src/app/core/models/IBookmark.model';
import { BookmarksService } from 'src/app/core/services/bookmarks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-bookmark-modal',
  templateUrl: './add-bookmark-modal.component.html',
  styleUrls: ['./add-bookmark-modal.component.scss']
})

export class AddBookmarkModalComponent implements OnInit {

  icClose = icClose;

  addToBookmarkForm!: FormGroup;
  addingToBookmark: boolean = false;

  news!: INewsArticle;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private bookmarkService: BookmarksService,
    private modal: MatDialogRef<AddBookmarkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalDialogData,
  ) { }

  ngOnInit(): void {
    this.news = this.data.extraData as INewsArticle;
    this.initForm();
  }

  initForm() {
    this.addToBookmarkForm = this.fb.group({
      title: [this.news?.title, Validators.required],
      description: [this.news?.description],
      url: [this.news.url, Validators.required],
      bookmark: [this.news, Validators.required]
    });
  }

  get addToBookmarkFormData() {
    return this.addToBookmarkForm.controls;
  }

  onSubmit(formPayload: { [key: string]: AbstractControl }) {
    const payload: IBookmark = {
      title: formPayload['title'].value,
      description: formPayload['description'].value,
      url: formPayload['url'].value,
      bookmark: formPayload['bookmark'].value,
      bookmarkedAt: new Date()
    };

    this.addNewsToBookmark(payload);
  }

  addNewsToBookmark(payload: IBookmark) {
    this.addingToBookmark = true;

    const itemIndex = this.bookmarkService.checkIfBookmarkExist(payload.bookmark);

    if (itemIndex !== -1) {
      this.snackbar.open('Ooops... Bookmark already exists', 'X');
      this.addingToBookmark = false;
      return;
    }

    const bookmarks = this.bookmarkService.updateBookmarks(payload);

    this.bookmarkService.updateBookmarkStorage(bookmarks);

    this.addingToBookmark = false;
    this.clearForm(this.addToBookmarkForm);
    this.closeModal(
      {
        result: { data: payload, status: 'closed', message: 'News Article Bookmarked Successfully' }
      }
    );
  }

  clearForm(form: FormGroup) {
    form.reset();
  }

  closeModal(data?: IModalResult) {
    if (data) {
      this.modal.close(data);
    } else {
      this.modal.close();
    }
  }

}
