import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { NewsEntriesComponent } from './components/news-entries/news-entries.component';
import { TopStoriesComponent } from './top-stories.component';

const routes: Routes = [
  {
    path: '',
    component: TopStoriesComponent,
    data: { breadcrumb: 'Top Stories' }
  }
];

@NgModule({
  declarations: [
    TopStoriesComponent,
    NewsEntriesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TopStoriesModule { }
