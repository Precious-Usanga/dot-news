import { Component, Input, OnInit } from '@angular/core';
import icHome from '@iconify/icons-ic/twotone-home';
import { BreadcrumbDefinition } from 'xng-breadcrumb';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {

  @Input() crumbs!: BreadcrumbDefinition[];

  icHome = icHome;

  constructor() {
  }

  ngOnInit() {}

}
