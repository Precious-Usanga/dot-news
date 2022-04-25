import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarSearchModule } from './toolbar-search/toolbar-search.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,
    ToolbarSearchModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
