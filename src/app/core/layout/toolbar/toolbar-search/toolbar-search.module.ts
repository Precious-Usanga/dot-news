import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarSearchComponent } from './toolbar-search.component';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ToolbarSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule
  ],
  exports: [ToolbarSearchComponent]
})
export class ToolbarSearchModule { }
