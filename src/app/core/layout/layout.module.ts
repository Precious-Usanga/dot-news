import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { SideNavModule } from './side-nav/side-nav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarModule,
    SideNavModule,
    ToolbarModule,
    FooterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
