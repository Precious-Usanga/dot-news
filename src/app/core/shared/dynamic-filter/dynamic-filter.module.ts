import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterFormComponent } from './dynamic-filter-form/dynamic-filter-form.component';
import { DynamicFilterComponent } from './dynamic-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { MaterialModule } from '../material.module';
import { ReplaceUnderscoreWithSpacePipe } from '../../pipes/replace-underscore-with-space.pipe';



@NgModule({
  declarations: [
    DynamicFilterComponent,
    DynamicFilterFormComponent,
    ReplaceUnderscoreWithSpacePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule
  ],
  exports: [DynamicFilterComponent, ReplaceUnderscoreWithSpacePipe]
})
export class DynamicFilterModule { }
