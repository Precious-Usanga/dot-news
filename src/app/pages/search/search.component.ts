import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/models/IApiResponse.model';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { FilterService, FilterBase } from 'src/app/core/services/filter-control.service';
import { NewsService } from 'src/app/core/services/news.service';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { Constants } from 'src/app/core/shared/constants';
import { AddBookmarkModalComponent } from 'src/app/core/shared/modals/add-bookmark-modal/add-bookmark-modal.component';
import Countries from 'src/assets/json/countries.json';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [FilterService]
})
export class SearchComponent implements OnInit {

  searchResult!: INewsArticle[];

  filters$!: Observable<FilterBase<any>[]>;
  filterBy: any = [
    {
      key: 'country', label: 'country', order: 1,
      required: true, controlType: 'dropdown',
      options: Countries.map(country => {
        return {
          value: country.code.toLocaleLowerCase(),
          key: country.name
        }
      })
    },
    {
      key: 'category', label: 'category', order: 2,
      required: true, controlType: 'dropdown',
      options: Object.entries(Constants.PARAM_VARIABLES.CATEGORY).map(entry => {
        return {
          key: entry[0],
          value: entry[1]
        }
      })
    },
    {
      key: 'sort_by', label: 'sort by', order: 3,
      required: true, controlType: 'dropdown',
      options: Object.entries(Constants.PARAM_VARIABLES.SORT_BY).map(entry => {
        return {
          key: entry[0],
          value: entry[1],
        }
      })
    },
    {
      key: 'date_range', label: 'date range', order: 4,
      type: 'date', required: true, controlType: 'date_range'
    },
    {
      key: 'search', label: 'Search term', order: 5,
      type: 'text', required: true, controlType: 'textbox'
    },
  ];

  addBookmarkModal = AddBookmarkModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;

  pageSize = 20;;
  page = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readNewsService: ShareDataViaRouteService,
    filterService: FilterService
  ) {
    this.filters$ = filterService.getFilters(this.filterBy);
   }

  ngOnInit(): void {
    this.getSearchTermFromRoute();
  }

  getSearchTermFromRoute() {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        const searchTerm = params.get('q');
        if (searchTerm) {
          this.searchArticles({ q: searchTerm, page: this.page, pageSize: this.pageSize });
        } else {
          this.getHeadlines({ pageSize: this.pageSize, page: this.page });
        }
      }
    );
  }

  onFilterSubmit(event: any) {
    if (event !== null) {
      let payload: { [key: string]: any } = {};
      for (const key in event) {
        switch(key) {
          case 'search':
            payload['q'] = event[key];
            break;
          case 'sort_by':
            payload['sortBy'] = event[key];
            break;
          case 'category':
            payload['q'] = `${payload['q'] ? payload['q'] + '+' + event[key] : event[key]}`;
            break;
          default:
            payload[key] = event[key];
            break;
        }
      }
      this.searchArticles({ ...payload, page: this.page, pageSize: this.pageSize });
    } else if (event === null) {
      this.searchArticles({ page: this.page, pageSize: this.pageSize });
    }
  }

  searchArticles(params: { q?: string, page: number, pageSize: number, country?: string, category?: string, sortBy?: string, from?: string, to?: string }) {
    this.newsService.getAllNews(params).subscribe(
      {
        next: (data: IApiResponse<INewsArticle>) => {
          this.searchResult = data.articles;
        },
        error: (error: any) => {
          this.snackBar.open(error.message, 'X');
        }
      }
    );
  }

  getHeadlines(params: { pageSize: number, page: number }) {
    this.newsService.getNewsHeadlines(params).subscribe(
      {
        next: (response) => {
          this.searchResult = response.articles;
        },
        error: (error) => {
          this.snackBar.open(error.message, 'X');
        }
      }
    );
  }

  openDialog(options: IModalDialogData) {
    let dialog!: TemplateRef<any> | ComponentType<any>;
    let width;
    if (options.modal === "addBookmarkModal") {
      width = "600px";
      dialog = this.addBookmarkModal;
      this.modal = this.dialog.open(dialog, { data: options, disableClose: true, width: width });
    }

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

  readNews(news: INewsArticle) {
    this.readNewsService.updateSharedData(news);
    this.router.navigate(['/news/view-news']);
  }

  refreshComponent(refresh: boolean) {
    if (refresh) {
      this.getSearchTermFromRoute();
    }
  }

}
