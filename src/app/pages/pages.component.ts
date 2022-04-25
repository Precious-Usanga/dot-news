import { Component, OnInit } from '@angular/core';
import { NavigationList } from '../core/shared/navigation';
import { NavigationService } from '../core/shared/navigation.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
  ) {
    this.navigationService.items = NavigationList;
   }

  ngOnInit(): void {
  }

}
