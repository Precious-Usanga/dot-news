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
import { SecondaryToolbarModule } from './secondary-toolbar/secondary-toolbar.module';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProgressBarModule,
    SideNavModule,
    ToolbarModule,
    FooterModule,
    MaterialModule,
    FlexLayoutModule,
    SecondaryToolbarModule,
    IconModule,
    BreadcrumbsModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
