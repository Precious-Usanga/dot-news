import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { IModalDialogData } from 'src/app/core/models/modal.model';
import icUserClock from '@iconify/icons-ic/round-timer';

@Component({
  selector: 'vex-call-to-action-modal',
  templateUrl: './call-to-action-modal.component.html',
  styleUrls: ['./call-to-action-modal.component.scss']
})
export class CallToActionModalComponent implements OnInit {

  icClose = icClose;
  icUserClock = icUserClock;
  callToActionLoading: boolean = false;

  @Output() modalDataEmitter = new EventEmitter<IModalDialogData>();

  constructor(
    private modal: MatDialogRef<CallToActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalDialogData
  ) { }

  ngOnInit(): void {
  }

  submitDialogAction(data: IModalDialogData) {
    this.modalDataEmitter.emit(data);
  }

  closeModal(data?: IModalDialogData) {
    if (data) {
      this.modal.close(data);
    } else {
      this.modal.close();
    }
  }

}
