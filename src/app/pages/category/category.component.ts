import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/core/models/IApiResponse.model';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { FilterBase, FilterService } from 'src/app/core/services/filter-control.service';
import { NewsService } from 'src/app/core/services/news.service';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { AddBookmarkModalComponent } from 'src/app/core/shared/modals/add-bookmark-modal/add-bookmark-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [FilterService]
})
export class CategoryComponent implements OnInit {
  category!: string;
  categoryArticles$!: Observable<IApiResponse<INewsArticle>>;

  filters$!: Observable<FilterBase<any>[]>;
  filterBy: any = [
    {
      key: 'country', label: 'country', order: 1,
      required: true, controlType: 'dropdown',
      options: []
    },
    {
      key: 'search', label: 'Search term', order: 2,
      type: 'text', required: true, controlType: 'textbox'
    },
  ];

  pageSize = 20;;
  page = 1;

  addBookmarkModal = AddBookmarkModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;

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
    this.getCategoryFromRoute();
  }

  getCategoryFromRoute() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const categoryName = params.get('categoryName');
        if ( categoryName) {
          this.category = categoryName;
          this.fetchCategoryArticles({ category: this.category, page: this.page, pageSize: this.pageSize });
        }
      }
    );
  }

  fetchCategoryArticles(params: {q?: string, category: string, country?: string,  page: number, pageSize: number}) {
    this.categoryArticles$ = this.newsService.getNewsHeadlines(params);
  }

  onFilterSubmit(event: any) {
    if (event !== null) {
      let payload: {[key: string]: any} = {};
      for (const key in event) {
        if (event[key] === 'search') {
          payload['q'] = event[key];
        } else {
          payload[key] = event[key];
        }
      }
      this.fetchCategoryArticles({ ...payload, category: this.category, page: this.page, pageSize: this.pageSize });
    } else if (event === null) {
      this.fetchCategoryArticles({ category: this.category, page: this.page, pageSize: this.pageSize });
    }
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
      this.getCategoryFromRoute();
    }
  }

}
