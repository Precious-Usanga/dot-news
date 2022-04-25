import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutModule } from '../core/layout/layout.module';
import { CategoryComponent } from './category/category.component';
import { NewsComponent } from './news/news.component';
import { SearchComponent } from './search/search.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CommonModule } from '@angular/common';
import { TopStoriesModule } from './top-stories/top-stories.module';



@NgModule({
  declarations: [
    PagesComponent,
    CategoryComponent,
    NewsComponent,
    SearchComponent,
    BookmarksComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    TopStoriesModule
  ]
})
export class PagesModule { }
