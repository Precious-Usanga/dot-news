import { Component, Input, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';
import { Config } from '../../models/config.model';
import { ConfigService } from '../../shared/config.service';
import { LayoutService } from '../../shared/layout.service';
import { NavigationService } from '../../shared/navigation.service';
import { trackByRoute } from '../../utils/track-by';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() collapsed!: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map((config: Config) => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map((config: Config) => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map((config: Config) => config.sidenav.showCollapsePin));


  items!: NavigationItem[];
  trackByRoute = trackByRoute;

  constructor(
    private layoutService: LayoutService,
    private navigationService: NavigationService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.items = this.navigationService.items
  }

  onMouseEnter() {
    this.layoutService.collapseOpenSidenav();
  }

  onMouseLeave() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }

}
