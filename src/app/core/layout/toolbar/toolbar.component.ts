import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { map, of } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { Constants } from '../../shared/constants';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { LayoutService } from '../../shared/layout.service';
import emojioneUS from '@iconify/icons-emojione/flag-for-flag-united-states';
import emojioneDE from '@iconify/icons-emojione/flag-for-flag-germany';
import emojioneFR from '@iconify/icons-emojione/flag-for-flag-france';
import emojioneSP from '@iconify/icons-emojione/flag-for-flag-spain';
import emojioneCN from '@iconify/icons-emojione/flag-for-flag-china';
import emojioneJP from '@iconify/icons-emojione/flag-for-flag-japan';
import { Icon } from '@visurel/iconify-angular';
import { ConfigService } from '../../shared/config.service';
import { Config } from '../../models/config.model';
import { PopoverParams, PopoverService } from '../../shared/popover/popover.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isHorizontalLayout$ = this.configService.config$.pipe(map((config: Config) => config.layout === 'horizontal'));
  isVerticalLayout$ = this.configService.config$.pipe(map((config: Config) => config.layout === 'vertical'));
  isNavbarInToolbar$ = this.configService.config$.pipe(map((config: Config) => config.navbar.position === 'in-toolbar'));
  isNavbarBelowToolbar$ = this.configService.config$.pipe(map((config: Config) => config.navbar.position === 'below-toolbar'));
  title$ = this.configService.config$.pipe(map((config: Config) => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map((config: Config) => config.sidenav.imageUrl));

  @Input() mobileQuery!: boolean;
  icMenu = icMenu;


  languages: Language[] = [
    {
      code: "en",
      language: "English",
      icon: emojioneUS,
      selected: false
    },
    {
      code: "gb",
      language: "German",
      icon: emojioneDE,
      selected: false
    },
    {
      code: "fr",
      language: "Francais",
      icon: emojioneFR,
      selected: false
    },
    {
      code: "sp",
      language: "Spain",
      icon: emojioneSP,
      selected: false
    },
    {
    code: "cn",
    language: "Chinese",
    icon: emojioneCN,
    selected: false
    },
    {
      code: "jp",
      language: "Japan",
      icon: emojioneJP,
      selected: false
    }
  ]
  dropdownOpen!: boolean;

  constructor(
    private storageService: StorageService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,

    private popover: PopoverService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  openSidenav() {
    this.layoutService.openSidenav();
  }

  selectLanguage(language: Language) {
    this.languages.forEach(lang => {
      if (lang.selected === true && lang.code !== language.code) {
        lang.selected = false;
      }
    });
    language.selected = true;
    this.storageService.set(Constants.STORAGE_VARIABLES.LANGUAGE, language.code);
    // this.reloadCurrentComponent();
  }

  getSelectedLanguage() {
    const language = this.storageService.get(Constants.STORAGE_VARIABLES.LANGUAGE);
    if (language) {
      const selectedLanguage = this.languages.find(lang => lang.code === language );
      selectedLanguage ? this.selectLanguage(selectedLanguage) : null;
    } else {
      this.selectLanguage(this.languages[0]);
    }
  }

  // showPopover(options: any) {
  //   this.dropdownOpen = true;
  //   this.cd.markForCheck();

  //   const popoverRef = this.popover.open(options);

  //   popoverRef.afterClosed$.subscribe(() => {
  //     this.dropdownOpen = false;
  //     this.cd.markForCheck();
  //   });
  // }

  reloadCurrentComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}

interface Language {
  language: string;
  code: string;
  icon: Icon;
  selected: boolean;
}
