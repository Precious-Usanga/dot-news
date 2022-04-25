import { NgModule } from '@angular/core';
import { SideNavComponent } from './side-nav.component';
import { SharedModule } from '../../shared/shared.module';
import { SideNavItemModule } from './side-nav-item/side-nav-item.module';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    SharedModule,
    SideNavItemModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule { }
