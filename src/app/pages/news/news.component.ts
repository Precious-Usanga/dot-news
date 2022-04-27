import { Component, OnInit } from '@angular/core';
import { INewsArticle } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news!: INewsArticle;

  pageSize!: number;
  page!: number;

  constructor(
    private newsService: NewsService,
    private sharedNewsService: ShareDataViaRouteService
  ) { }

  ngOnInit(): void {
    this.getNews();
    // this.getHeadlines({ pageSize: 10, page: 1 });
  }

  getNews() {
    this.sharedNewsService.sharedData.subscribe(
      {
        next: (response) => {
          console.log(response);
          this.news = response;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  // getHeadlines(params: { pageSize: number, page: number }) {
  //   this.newsService.getNewsHeadlines(params).subscribe(
  //     {
  //       next: (response) => {
  //         console.log(response);
  //         this.news = response;
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       }
  //     }
  //   );
  // }

}
