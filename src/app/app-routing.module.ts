import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'news',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '404-page',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
