import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { AddBookmarkModalComponent } from './modals/add-bookmark-modal/add-bookmark-modal.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CallToActionModalComponent } from './modals/call-to-action-modal/call-to-action-modal.component';
import { DynamicFilterModule } from './dynamic-filter/dynamic-filter.module';
import { ReplaceUnderscoreWithSpacePipe } from '../pipes/replace-underscore-with-space.pipe';
import { NoDataCardComponent } from './no-data-card/no-data-card.component';


@NgModule({
  declarations: [
    AddBookmarkModalComponent,
    CallToActionModalComponent,
    NoDataCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,

    DynamicFilterModule,

    NoDataCardComponent
  ],
  providers: [
    DatePipe,
    ReplaceUnderscoreWithSpacePipe,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
      }
    }
  ]
})
export class SharedModule { }
