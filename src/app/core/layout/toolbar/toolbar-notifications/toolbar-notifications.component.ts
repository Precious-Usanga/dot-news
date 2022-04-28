import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToolbarNotificationsDropdownComponent } from './toolbar-notifications-dropdown/toolbar-notifications-dropdown.component';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import { PopoverParams, PopoverService } from 'src/app/core/shared/popover/popover.service';

@Component({
  selector: 'app-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit {

  @ViewChild('originRef', { static: true, read: ElementRef }) originRef!: ElementRef;

  dropdownOpen!: boolean;
  icBookmarks = icBookmarks;

  // bookmarkPopover = {
  //   content: ToolbarNotificationsDropdownComponent,
  //   origin: this.originRef,
  //   offsetY: 12,
  //   position: [
  //     {
  //       originX: 'center',
  //       originY: 'top',
  //       overlayX: 'center',
  //       overlayY: 'bottom'
  //     },
  //     {
  //       originX: 'end',
  //       originY: 'bottom',
  //       overlayX: 'end',
  //       overlayY: 'top',
  //     },
  //   ]
  // }

  // @Output() openPopover = new EventEmitter<PopoverParams<any>>();

  constructor(
    private popover: PopoverService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  // showPopover(options: PopoverParams<any>) {
  //   this.openPopover.emit(options);
  // }

  showPopover() {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarNotificationsDropdownComponent,
      origin: this.originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
