import { NgModule } from '@angular/core';
import { SecondaryToolbarComponent } from './secondary-toolbar.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [SecondaryToolbarComponent],
  imports: [
    SharedModule
  ],
  exports: [SecondaryToolbarComponent]
})
export class SecondaryToolbarModule { }
