import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icDeleteForever from '@iconify/icons-ic/round-delete-forever';
import icLink from '@iconify/icons-ic/round-link';
import icUnfavorite from '@iconify/icons-ic/round-favorite-border';
import icFavorite from '@iconify/icons-ic/round-favorite';
import icVisibility from '@iconify/icons-ic/round-visibility';
import { IBookmark } from 'src/app/core/models/IBookmark.model';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';

@Component({
  selector: 'app-bookmark-cards',
  templateUrl: './bookmark-cards.component.html',
  styleUrls: ['./bookmark-cards.component.scss']
})
export class BookmarkCardsComponent implements OnInit {

  @Input() bookmark!: IBookmark;
  @Output() openModal: EventEmitter<IModalDialogData> = new EventEmitter<IModalDialogData>();
  @Output() readANews: EventEmitter<INewsArticle> = new EventEmitter<INewsArticle>();

  icDeleteForever = icDeleteForever;
  icLink = icLink;
  icVisibility = icVisibility;
  icUnfavorite = icUnfavorite;
  icFavorite = icFavorite;

  isFavorite: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  openAModal(options: IModalDialogData) {
    this.openModal.emit(options);
  }

  readNews(options: INewsArticle) {
    this.readANews.emit(options);
  }

}
