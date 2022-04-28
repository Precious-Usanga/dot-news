import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

export class FilterBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string | boolean }[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string | boolean }[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
};

@Injectable({
  providedIn: 'root'
})

export class FilterControlService {

  constructor() { }

  toFormGroup(filters: FilterBase<string>[]) {
    const group: any = {};

    filters.forEach(filter => {
      if (filter.controlType === 'date_range') {
        group[filter.key] = filter.required ? new FormGroup({
          from: new FormControl(filter.value || '', Validators.required),
          to: new FormControl(filter.value || '', Validators.required)
        }) : new FormGroup({
          from: new FormControl(filter.value || ''),
          to: new FormControl(filter.value || '')
        });
      } else {
        group[filter.key] = filter.required ? new FormControl(filter.value || '', Validators.required)
          : new FormControl(filter.value || '');
      }
    });
    return new FormGroup(group);
  }

  addFormControl(filter: FilterBase<string>, form: FormGroup) {
    if (filter.controlType === 'date_range') {
      form.addControl(filter.key, filter.required ? new FormGroup({
        from: new FormControl(filter.value || '', Validators.required),
        to: new FormControl(filter.value || '', Validators.required)
      }) : new FormGroup({
        from: new FormControl(filter.value || ''),
        to: new FormControl(filter.value || '')
      }));
      return form;
    } else {
      form.addControl(filter.key, filter.required ? new FormControl(filter.value || '', Validators.required)
        : new FormControl(filter.value || ''));
      return form;
    }
  }

  removeFormControl(filter: FilterBase<string>, form: FormGroup) {
    form.removeControl(filter.key);
    return form;
  }
}

export class FilterService {

  getFilters(filterBy: FilterBase<string>[]) {
    const filters: FilterBase<string>[] = filterBy;

    return of(filters.sort((a, b) => a.order - b.order));
  }
}
