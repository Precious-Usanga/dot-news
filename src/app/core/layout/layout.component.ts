import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {filter, withLatestFrom, map } from 'rxjs';
import { Config } from '../models/config.model';
import { ConfigService } from '../shared/config.service';
import { LayoutService } from '../shared/layout.service';
import icNavigateBefore from '@iconify/icons-ic/baseline-navigate-before';
import icNavigateNext from '@iconify/icons-ic/baseline-navigate-next';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BreadcrumbDefinition, BreadcrumbService } from 'xng-breadcrumb';

import faFacebook from '@iconify/icons-logos/facebook';
import faTwitter from '@iconify/icons-logos/twitter';
import faInstagram from '@iconify/icons-logos/instagram-icon';
import faPinterest from '@iconify/icons-logos/pinterest';
import faGithub from '@iconify/icons-logos/github-icon';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class LayoutComponent implements OnInit {

  isLayoutVertical$ = this.configService.config$.pipe(map((config: Config) => config.layout === 'vertical'));
  isBoxed$ = this.configService.config$.pipe(map(config => config.boxed));
  isToolbarFixed$ = this.configService.config$.pipe(map(config => config.toolbar.fixed));
  isFooterFixed$ = this.configService.config$.pipe(map(config => config.footer.fixed));
  isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isDesktop$ = this.layoutService.isDesktop$;

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer!: MatSidenavContainer;

  currentRoute!: string;
  icNavigateBefore = icNavigateBefore;
  icNavigateNext = icNavigateNext;
  breadcrumbs!: BreadcrumbDefinition[];

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faPinterest = faPinterest;
  faGithub = faGithub;
  icMail = icMail;
  icMyLocation = icMyLocation;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    private router: Router,
    private location: Location,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    /**
    * Expand Sidenav when we switch from mobile to desktop view
    */
    this.isDesktop$.pipe(
      filter(matches => !matches),
      untilDestroyed(this)
    ).subscribe(() => this.layoutService.expandSidenav());

    /**
     * Open/Close Sidenav through LayoutService
     */
    this.layoutService.sidenavOpen$.pipe(
      untilDestroyed(this)
    ).subscribe(open => open ? this.sidenav.open() : this.sidenav.close());

    /**
     * Mobile only:
     * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
     */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      withLatestFrom(this.isDesktop$),
      filter(([event, matches]) => !matches),
      untilDestroyed(this)
    ).subscribe(() => this.sidenav.close());

    /**
     * get route data for breadcrumbs
     */
    this.breadcrumbService.breadcrumbs$.subscribe({
      next: (breadcrumbs: BreadcrumbDefinition[]) => {
        this.breadcrumbs = breadcrumbs;
        console.log(this.breadcrumbs);
        if (typeof breadcrumbs[breadcrumbs.length - 1]?.label === 'string') {
          this.currentRoute = <string>breadcrumbs[breadcrumbs.length - 1]?.label;
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

}
