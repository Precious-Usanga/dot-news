import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'top-stories',
        loadChildren: () => import('./top-stories/top-stories.module').then(m => m.TopStoriesModule),
        data: { breadcrumb: 'Top Stories' }

      },
      {
        path: 'view-news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        data: { breadcrumb: 'News' }
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
        data: { breadcrumb: 'Category' }
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        data: { breadcrumb: 'News Search' }
      },
      {
        path: 'bookmarks',
        loadChildren: () => import('./bookmarks/bookmarks.module').then(m => m.BookmarksModule),
        data: { breadcrumb: 'Bookmarks' }
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
