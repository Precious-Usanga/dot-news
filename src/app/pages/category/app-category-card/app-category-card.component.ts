import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import icAddBookmark from '@iconify/icons-ic/round-bookmark-add';
import icShare from '@iconify/icons-ic/round-share';
import icUnfavorite from '@iconify/icons-ic/round-favorite-border';
import icFavorite from '@iconify/icons-ic/round-favorite';
import icLink from '@iconify/icons-ic/round-link';

@Component({
  selector: 'app-category-card',
  templateUrl: './app-category-card.component.html',
  styleUrls: ['./app-category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input() article!: INewsArticle;

  icAddBookmark = icAddBookmark;
  icShare = icShare;
  icLink = icLink;
  icUnfavorite = icUnfavorite;
  icFavorite = icFavorite;

  @Output() openModal: EventEmitter<IModalDialogData> = new EventEmitter<IModalDialogData>();
  @Output() readANews: EventEmitter<INewsArticle> = new EventEmitter<INewsArticle>();

  isFavorite: boolean = false;

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
