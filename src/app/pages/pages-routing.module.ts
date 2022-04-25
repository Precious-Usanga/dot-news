import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CategoryComponent } from './category/category.component';
import { NewsComponent } from './news/news.component';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'top-stories',
        loadChildren: () => import('./top-stories/top-stories.module').then(m => m.TopStoriesModule),
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent
      },
      {
        path: '',
        redirectTo: 'top-stories',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
