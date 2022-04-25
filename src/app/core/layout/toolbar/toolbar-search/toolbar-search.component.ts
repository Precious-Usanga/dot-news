import { Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/round-search';
@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss']
})
export class ToolbarSearchComponent implements OnInit {

  icSearch = icSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
