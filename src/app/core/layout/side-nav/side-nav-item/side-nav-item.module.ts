import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SideNavItemComponent } from './side-nav-item.component';



@NgModule({
  declarations: [SideNavItemComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [SideNavItemComponent]
})
export class SideNavItemModule { }
