import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SearchCardComponent } from './search-card/search-card.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: { breadcrumb: 'News Search' }
  }
]

@NgModule({
  declarations: [
    SearchComponent,
    SearchCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
