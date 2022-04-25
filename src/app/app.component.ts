import { Component } from '@angular/core';
import { ConfigService } from './core/shared/config.service';
import { StyleService } from './core/shared/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private configService: ConfigService,
    private styleService: StyleService
  ) {

  }
}
