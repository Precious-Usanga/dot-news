import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/core/shared/constants';
import icMoreHoriz from '@iconify/icons-ic/round-more-horiz';
import { IApiResponse } from 'src/app/core/models/IApiResponse.model';
import { INewsArticle } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';
import { Router } from '@angular/router';
import { ShareDataViaRouteService } from 'src/app/core/services/share-data-via-route.service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import { AddBookmarkModalComponent } from 'src/app/core/shared/modals/add-bookmark-modal/add-bookmark-modal.component';
import { MatChip, MatChipList, MatChipSelectionChange } from '@angular/material/chips';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent implements OnInit {

  @ViewChild('chipList') chipList!: MatChipList;

  icMoreHoriz = icMoreHoriz;
  news!: IApiResponse<INewsArticle>;

  leadNews!: INewsArticle | undefined;

  pageSize = 20;
  page = 1;

  topStoriesFilter = Object.entries(Constants.PARAM_VARIABLES.CATEGORY).map(entry => {
    return {
      filter: entry[0],
      value: entry[1],
      selected: false
    }
  });

  addBookmarkModal = AddBookmarkModalComponent;
  modal!: MatDialogRef<TemplateRef<any> | ComponentType<any>>;
  selected_category!: string;


  constructor(
    private newsService: NewsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private readNewsService: ShareDataViaRouteService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
    this.setDefaultFilter();
    this.getHeadlines({ pageSize: this.pageSize, page: this.page });
  }

  setDefaultFilter() {
    this.topStoriesFilter[0].selected = true;
  }

  chipClick(filterValue: string) {
    this.topStoriesFilter.forEach(
      filter => {
        if (filter.selected && filter.value === filterValue) {
          filter.selected = false;
          return;
        }

        if (filter.selected && filter.value !== filterValue) {
          filter.selected = false;
          return;
        }

        if (!filter.selected && filter.value === filterValue) {
          filter.selected = true;
          return;
        }
      }
    );
  }

  filterNewsHeadlines(chip: MatChipSelectionChange, filter: string) {
    if (chip.selected) {
      this.selected_category = filter;
      this.getHeadlines({ category: this.selected_category, page: this.page, pageSize: this.pageSize});
    } else {
      this.selected_category = '';
      this.getHeadlines({ page: this.page, pageSize: this.pageSize });
    }

  }

  getHeadlines(params: { category?: string, pageSize: number, page: number }) {
    this.newsService.getNewsHeadlines(params).subscribe(
      {
        next: (response) => {
          this.news = response;
          this.leadNews = this.news.articles.shift();
          this.cd.markForCheck();
        },
        error: (error) => {
          this.snackBar.open(error.message, 'X');
        }
      }
    );
  }

  openDialog(options: IModalDialogData) {
    let dialog!: TemplateRef<any> | ComponentType < any >;
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
      this.getHeadlines({ pageSize: this.pageSize, page: this.page });
    }
  }

}
