import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import { NavigationDropdown, NavigationItem, NavigationLink } from 'src/app/core/interfaces/navigation-item.interface';
import { NavigationService } from 'src/app/core/shared/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavItemComponent implements OnInit, OnChanges {

  @Input() item!: NavigationItem;
  @Input() level!: number;

  isOpen!: boolean;
  isActive!: boolean;
  icKeyboardArrowRight = icKeyboardArrowRight;

  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter(() => this.isDropdown(this.item)),
      untilDestroyed(this)
    ).subscribe(() => this.onRouteChange());

    this.navigationService.openChange$.pipe(
      filter(() => this.isDropdown(this.item)),
      untilDestroyed(this)
    ).subscribe(item => this.onOpenChange(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('item') && this.isDropdown(this.item)) {
      this.onRouteChange();
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
    this.cd.markForCheck();
  }

  onOpenChange(item: NavigationDropdown) {
    if (this.isChildrenOf(this.item as NavigationDropdown, item)) {
      return;
    }

    if (this.hasActiveChilds(this.item as NavigationDropdown)) {
      return;
    }

    if (this.item !== item) {
      this.isOpen = false;
      this.cd.markForCheck();
    }
  }

  onRouteChange() {
    if (this.hasActiveChilds(this.item as NavigationDropdown)) {
      this.isActive = true;
      this.isOpen = true;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
      this.cd.markForCheck();
    } else {
      this.isActive = false;
      this.isOpen = false;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
      this.cd.markForCheck();
    }
  }

  isChildrenOf(parent: NavigationDropdown, item: NavigationDropdown): any {
    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    return parent.children
      .filter(child => this.isDropdown(child))
      .some(child => this.isChildrenOf(child as NavigationDropdown, item));
  }

  hasActiveChilds(parent: NavigationDropdown): any {
    return parent.children.some(child => {
      if (this.isDropdown(child)) {
        return this.hasActiveChilds(child);
      }

      if (this.isLink(child) && !this.isFunction(child.route)) {
        return this.router.isActive(child.route as string, false);
      }
    });
  }

  isFunction(prop: NavigationLink['route']) {
    return prop instanceof Function;
  }

}
