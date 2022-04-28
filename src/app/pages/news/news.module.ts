import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    data: { breadcrumb: 'News' }
  }
];

@NgModule({
  declarations: [NewsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NewsModule { }
