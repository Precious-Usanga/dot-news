import { Component, OnInit } from '@angular/core';
import { trackById } from '../../../../utils/track-by';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import { IBookmark } from 'src/app/core/models/IBookmark.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-notifications-dropdown',
  templateUrl: './toolbar-notifications-dropdown.component.html',
  styleUrls: ['./toolbar-notifications-dropdown.component.scss']
})
export class ToolbarNotificationsDropdownComponent implements OnInit {

  bookmarks!: IBookmark[];

  icChevronRight = icChevronRight;
  icNotificationsOff = icNotificationsOff;
  trackById = trackById;

  constructor(
    private readNewsService: ShareDataViaRouteService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  readNews(news: INewsArticle) {
    this.readNewsService.updateSharedData(news);
    this.router.navigate(['/news/view-news']);
  }

}
