import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase } from 'src/app/core/services/filter-control.service';

@Component({
  selector: 'app-dynamic-filter-form',
  templateUrl: './dynamic-filter-form.component.html',
  styleUrls: ['./dynamic-filter-form.component.scss']
})
export class DynamicFilterFormComponent implements OnInit {

  @Input() filter!: FilterBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.filter.key].valid; }
  maxDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
