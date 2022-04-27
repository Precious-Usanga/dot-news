import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icAddBookmark from '@iconify/icons-ic/round-bookmark-add';
import icShare from '@iconify/icons-ic/round-share';
import icVisibility from '@iconify/icons-ic/round-visibility';
import { INewsArticle } from 'src/app/core/models/news.model';
import { IModalDialogData } from 'src/app/core/models/modal.model';

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
  icVisibility = icVisibility;

  @Output() openModal: EventEmitter<IModalDialogData> = new EventEmitter<IModalDialogData>();
  @Output() readANews: EventEmitter<INewsArticle> = new EventEmitter<INewsArticle>();

  constructor() { }

  ngOnInit(): void {
  }

  openAModal(options: IModalDialogData) {
    this.openModal.emit(options);
  }

  readNews(options: INewsArticle) {
    this.readANews.emit(options);
  }

}
