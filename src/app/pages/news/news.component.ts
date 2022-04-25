import { Component, OnInit } from '@angular/core';
import { IApiResponse } from 'src/app/core/models/IApiResponse.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news!: IApiResponse<INewsArticle>;

  pageSize!: number;
  page!: number;

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    // this.getHeadlines({ pageSize: 10, page: 1 });
  }

  getHeadlines(params: { pageSize: number, page: number }) {
    this.newsService.getNewsHeadlines(params).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.news = response;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

}
