import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import icAddBookmark from '@iconify/icons-ic/round-bookmark-add';
import icLink from '@iconify/icons-ic/round-link';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Input() article!: INewsArticle;

  icAddBookmark = icAddBookmark;
  icLink = icLink;

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
