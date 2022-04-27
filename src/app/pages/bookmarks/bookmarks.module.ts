import { NgModule } from '@angular/core';
import { BookmarkCardsComponent } from './components/bookmark-cards/bookmark-cards.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { BookmarksComponent } from './bookmarks.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BookmarksComponent,
    data: { breadcrumb: 'Bookmarks' }
  }
];

@NgModule({
  declarations: [
    BookmarksComponent,
    BookmarkCardsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BookmarksModule { }
