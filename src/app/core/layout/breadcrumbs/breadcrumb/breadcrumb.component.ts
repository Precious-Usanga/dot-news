import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
      <ng-content></ng-content>
  `,
  styles: [],
  host: {
    class: 'app-breadcrumb body-2 text-hint leading-none hover:text-primary no-underline trans-ease-out ltr:mr-2 rtl:ml-2'
  }
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
