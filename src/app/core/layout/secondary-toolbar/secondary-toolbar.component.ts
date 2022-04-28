import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ConfigService } from '../../shared/config.service';

@Component({
  selector: 'app-secondary-toolbar',
  templateUrl: './secondary-toolbar.component.html',
  styleUrls: ['./secondary-toolbar.component.scss']
})
export class SecondaryToolbarComponent implements OnInit {

  @Input() current!: string;

  fixed$ = this.configService.config$.pipe(
    map(config => config.toolbar.fixed)
  );

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

}
