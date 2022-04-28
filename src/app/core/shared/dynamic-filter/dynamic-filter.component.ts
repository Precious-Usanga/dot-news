import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterBase, FilterControlService } from '../../services/filter-control.service';
import icFilterAlt from '@iconify/icons-ic/round-filter-alt';
import icReplay from '@iconify/icons-ic/round-replay'
import { DatePipe } from '@angular/common';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  providers: [FilterControlService],
})
export class DynamicFilterComponent implements OnInit, OnChanges {

  icFilterAlt = icFilterAlt;
  icReplay = icReplay;

  @Input() filters: FilterBase<string>[] | null = [];
  form!: FormGroup;
  payload!: { [key: string]: string };

  @Output() formDataEmitter: EventEmitter<{ [key: string]: string }> = new EventEmitter<{[key: string]: string}>();

  selectedFilters: FilterBase<string>[] | null = [];
  filterBy: any[] = [];

  isMobile = this.layoutService.isMobile();
  isDesktop$ = this.layoutService.isDesktop$;

  constructor(
    private filterControlService: FilterControlService,
    private datePipe: DatePipe,
    private layoutService: LayoutService,
  ) {
   }

  ngOnInit(): void {
    this.filterBy = this.filters?.length ? this.filters.map(filter => { return {checked: false, ...filter}; } ) : [];

    // initiallize form with empty control. this is because i want to add/remove a control on user demand
    this.form = this.filterControlService.toFormGroup([] as FilterBase<string>[]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterBy = this.filters ? this.filters.map(filter => { return {checked: false, ...filter}; }) : [];

    this.form = this.filterControlService.toFormGroup([] as FilterBase<string>[]);
  }

  onSubmit() {
    let params: {[key: string]: any} = {};

    for (const key in this.form.value) {
      if (key === 'date_range') {
        params['from'] = this.datePipe.transform(this.form.value[key].from, 'YYYY-MM-dd');
        params['to'] = this.datePipe.transform(this.form.value[key].to, 'YYYY-MM-dd');
      } else {
        params[key] = this.form.value[key];
      }
    }
    this.payload = params;
    this.formDataEmitter.emit(this.payload);
  }

  selectFilter(selected: any, selectedFilter: any) {
    selectedFilter.checked = selected.checked;
    if (selected.checked) {
      this.selectedFilters?.push(selectedFilter);
      this.form = this.filterControlService.addFormControl(selectedFilter as FilterBase<string>, this.form)
    } else {
      this.form = this.filterControlService.removeFormControl(selectedFilter as FilterBase<string>, this.form)
      const filterIndex = this.selectedFilters?.findIndex(filter => filter === selectedFilter);
      this.selectedFilters?.splice(filterIndex ? filterIndex : 0, 1);
    }
  }

  preventMatMenuFromClosing(event: Event) {
    event.stopPropagation();
  }

  resetFilter() {
    this.form.reset();
    this.selectedFilters = [];
    this.filterBy.forEach(filter => {
      filter.checked = false;
    });
    this.formDataEmitter.emit({});
  }

}
