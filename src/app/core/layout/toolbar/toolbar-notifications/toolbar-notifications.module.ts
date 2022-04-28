import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarNotificationsComponent } from './toolbar-notifications.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { PopoverModule } from 'src/app/core/shared/popover/popover.module';


@NgModule({
  declarations: [ToolbarNotificationsComponent, ToolbarNotificationsDropdownComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IconModule,
    FlexLayoutModule,
    PopoverModule,
  ],
  exports: [ToolbarNotificationsComponent],
  entryComponents: [ToolbarNotificationsDropdownComponent]
})
export class ToolbarNotificationsModule {
}
