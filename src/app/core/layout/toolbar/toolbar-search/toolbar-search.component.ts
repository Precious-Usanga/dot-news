import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import icSearch from '@iconify/icons-ic/round-search';
@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss']
})
export class ToolbarSearchComponent implements OnInit {

  icSearch = icSearch;

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }

  get searchFormData () {
    return this.searchForm.controls;
  }

  onSubmit(formPayload: {[key: string]: AbstractControl}) {
    const payload = {
      q: formPayload['search'].value
    };
    this.gotoSearchComponent(payload.q);
  }

  gotoSearchComponent(searchTerm: string) {
    if (searchTerm.length) {
      this.router.navigate(['/news/search'], { queryParams: { q: searchTerm } });
    }
  }

}
