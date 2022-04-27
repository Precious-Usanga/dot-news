import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CategoryComponent } from './category.component';
import { CategoryCardComponent } from './app-category-card/app-category-card.component';

const routes: Routes = [
  {
    path: ':categoryName',
    component: CategoryComponent,
    data: { breadcrumb: (resolveId: string) => resolveId.charAt(0).toUpperCase() + resolveId.slice(1) }
  }
]

@NgModule({
  declarations: [CategoryComponent, CategoryCardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule { }
