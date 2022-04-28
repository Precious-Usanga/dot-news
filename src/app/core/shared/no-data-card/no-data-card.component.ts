import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icRestorePage from '@iconify/icons-ic/twotone-restore-page';
@Component({
  selector: 'app-no-data-card',
  templateUrl: './no-data-card.component.html',
  styleUrls: ['./no-data-card.component.scss']
})
export class NoDataCardComponent implements OnInit {

  icRestorePage = icRestorePage;

  @Input() data!: string;

  @Output() refreshComponent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  refresh(event: boolean) {
    this.refreshComponent.emit(event);
  }

}
