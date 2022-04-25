import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProgressBarComponent } from './progress-bar.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';



@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    SharedModule,
    LoadingBarHttpClientModule
  ],
  exports: [ProgressBarComponent]
})
export class ProgressBarModule { }
